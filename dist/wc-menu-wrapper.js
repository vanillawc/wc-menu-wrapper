
class Custommenu extends HTMLElement {
  constructor () {
    super()
    this.isInitialized = false
    this.position = 'bottom'
    this.direction = 'down'
    this.mode = 'click' // changing this after init has no effect
    this.closeSubmenusOnClosing = false // event based closing, onblur based closing
    this.closeSubmenusOnHeadingClick = false // heading click based closing
    this.menuIsOpen = false
    this._submenuArray = []
    this.initStateOpen = false
    this.closingDelay = 500
    this.item = 'item'
    this.heading = 'heading'
  }

  static get observedAttributes () {
    return ['position',
      'direction',
      'mode',
      'init-state-open',
      'closing-delay',
      'close-submenus-on-closing',
      'close-submenus-on-heading-click',
      'heading-class',
      'item',
      'heading']
  }

  disconnectedCallback () {
  }

  checkAttributeValue (newValue, validValue_1, validValue_2) {
    if (newValue !== validValue_1 && newValue !== validValue_2) {
      throw `Invalid attribute value: ${newValue}`
    }
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'position') {
      this.checkAttributeValue(newValue, 'bottom', 'right')
      this.position = newValue
    } else if (name === 'direction') {
      this.checkAttributeValue(newValue, 'down', 'right')
      this.direction = newValue
    } else if (name === 'mode') {
      this.checkAttributeValue(newValue, 'click', 'hover')
      this.mode = newValue
    } else if (name === 'init-state-open') {
      this.initStateOpen = true
    } else if (name === 'closing-delay') {
      this.closingDelay = Number(newValue)
    } else if (name === 'close-submenus-on-closing') {
      this.closeSubmenusOnClosing = true
    } else if (name === 'close-submenus-on-heading-click') {
      this.closeSubmenusOnHeadingClick = true
    } else if (name === 'heading-class') {
      this.headingClass = newValue
    } else if (name === 'item') {
      this.item = newValue
    } else if (name === 'heading') {
      this.heading = newValue
    }
  }

  connectedCallback () {
    setTimeout(() => { this._init() }, 0) // https://stackoverflow.com/questions/58676021/accessing-custom-elements-child-element-without-using-slots-shadow-dom
  }

  _addEntry (entry, index) {
    entry.style.display = 'flex'
    entry.tabIndex = 0
    entry.onblur = this._onBlurHandler
    entry.onblur = entry.onblur.bind(this)
    let subentries = entry.querySelectorAll('*').entries()
    let subentry = subentries.next()
    while (subentry.done === false) {
      subentry.value[1].onblur = this._onBlurHandler
      subentry.value[1].onblur = subentry.value[1].onblur.bind(this)
      subentry = subentries.next()
    }
    let menu = entry.querySelector('wc-menu-wrapper')
    if (menu) {
      this._submenuArray.push(menu)
    }
    if (this._number_is_valid(index)) {
      this.itemsContainer.insertBefore(entry, this.itemsContainer.children[index])
    } else {
      this.itemsContainer.appendChild(entry)
    }
  }

  _init (checkRecursion) {
    // is this correct place to check?
    if (this.isInitialized) {
      return
    }

    let entries = this.querySelectorAll('.' + this.item).entries()
    let entry = entries.next()
    if (entry.done === true) {
      let menuContent = this.querySelector('wc-menu-wrapper > *')
      if (menuContent === null) { return }
      if (checkRecursion) { throw 'No valid menu items found!' }
      const template = document.createElement('template')
      template.innerHTML = menuContent.menuContent
      this.appendChild(template.content)
      this._init(true)
      return
    }

    this.isInitialized = true

    this.itemsContainer = this.appendChild(document.createElement('div'))
    this.itemsContainer.style.display = 'none'
    this.itemsContainer.style.position = 'absolute'

    while (entry.done === false) {
      if (entry.value[1].parentElement.isSameNode(this)) {
        this._addEntry(entry.value[1])
      }
      entry = entries.next()
    }

    this.headingElem = this.querySelector('.' + this.heading)
    this.headingElem.tabIndex = 0

    // Q: should this be flex? otherwise element width "overflows"
    // A: if it's flex, position right breaks
    this.headingElem.style.display = 'inline-flex'

    if (this.mode === 'click') {
      this.headingElem.onclick = this._headingOnClickHandler
      this.headingElem.onclick = this.headingElem.onclick.bind(this)
      this.headingElem.onblur = this._onBlurHandler
      this.headingElem.onblur = this.headingElem.onblur.bind(this)
    } else if (this.mode === 'hover') {
      this.headingElem.onmouseenter = this._mouseEnterHandler
      this.headingElem.onmouseenter = this.headingElem.onmouseenter.bind(this)
      this.headingElem.onmouseleave = this._mouseLeaveHandler
      this.headingElem.onmouseleave = this.headingElem.onmouseleave.bind(this)
      this.itemsContainer.onmouseenter = this._mouseEnterHandler
      this.itemsContainer.onmouseenter = this.itemsContainer.onmouseenter.bind(this)
      this.itemsContainer.onmouseleave = this._mouseLeaveHandler
      this.itemsContainer.onmouseleave = this.itemsContainer.onmouseleave.bind(this)
    }
    this.headingElem.onkeydown = this._keyDownEventHandler
    this.headingElem.onkeydown = this.headingElem.onkeydown.bind(this)

    this.appendChild(this.headingElem)
    this.appendChild(this.itemsContainer)
    this.style.display = 'block'
    this.addEventListener('rootMenuClose', this._rootMenuCloseHandler, true)
    this.addEventListener('menuClose', this._menuCloseHandler, false)

    if (this.initStateOpen) {
      this._openMenu()
    }
  }

  _keyDownEventHandler (event) {
    if (event.key === 'Enter') {
      this._headingOnClickHandler()
    }
  }

  _menuCloseHandler (e) {
    e.stopPropagation()
    this._closeMenu(this.closeSubmenusOnClosing)
    this.headingElem.focus()
  }

  _rootMenuCloseHandler (e) {
    let closeSubmenus = true
    if (!this.closeSubmenusOnClosing) {
      e.stopPropagation()
      closeSubmenus = false
    }
    this._closeMenu(closeSubmenus)
  }

  addItem (element, index) {
    if (this.isInitialized) {
      this._addEntry(element, index)
      return true
    }
    return false
  }

  deleteItem (param) {
    if (this.isInitialized) {
      let itemToBeRemoved = null
      if (param === undefined) {
        itemToBeRemoved = this.itemsContainer.childNodes.length > 0 ? this.itemsContainer.childNodes[this.itemsContainer.childNodes.length - 1] : null
      } else if (typeof param === 'string') {
        itemToBeRemoved = this.querySelector('#' + param)
      } else if (typeof param === 'number') {
        itemToBeRemoved = this.itemsContainer.childNodes[param]
      }
      if (itemToBeRemoved !== null) {
        this.itemsContainer.removeChild(itemToBeRemoved)
      }
      return true
    }
    return false
  }

  _onBlurHandler () {
    // focus will be on body unless following (pseudo)delay is introduced:
    setTimeout(() => { checkActiveElement(this) }, 0)
    function checkActiveElement (ctx) {
      let contains = false
      if (ctx._rootMenu) { contains = ctx._rootMenu.contains(document.activeElement) }
      if (!ctx.contains(document.activeElement) && !contains) {
        ctx.dispatchEvent(new CustomEvent('rootMenuClose'))
      }
    }
  }

  _closeMenu (closeSubmenus) {
    if (this.menuIsOpen) {
      this.itemsContainer.style.display = 'none'
      this.menuIsOpen = false
      if (closeSubmenus) {
        this._submenuArray.forEach(x => { x._closeMenu(true) })
      }
      if (this.headingClass) { this.headingElem.classList.remove(this.headingClass) }
    }
  }

  _openMenu () {
    if (!this.menuIsOpen) {
      this.itemsContainer.style.display = this.position === 'bottom' ? 'flex' : 'inline-flex'
      this.menuIsOpen = true
      this._submenuArray.forEach(x => { x._passRootMenu(this._rootMenu === undefined ? this : this._rootMenu) })
      if (this.headingClass) { this.headingElem.classList.add(this.headingClass) }
      this.itemsContainer.style.flexDirection = this.direction === 'right' ? 'row' : 'column'
    }
  }

  _passRootMenu (parent) {
    this._rootMenu = parent
  }

  _headingOnClickHandler () {
    if (!this.menuIsOpen) {
      this._openMenu()
    } else {
      this._closeMenu(this.closeSubmenusOnHeadingClick)
    }
  }

  _mouseEnterHandler () {
    clearTimeout(this._timerId)
    this._openMenu()
  }

  _mouseLeaveHandler () {
    this._timerId = setTimeout(() => { this._closeMenu() }, this.closingDelay)
  }

  _number_is_valid (n) {
    if (isNaN(n) || typeof n !== 'number' || n < 0) {
      return false
    }
    return true
  }
}

customElements.define('wc-menu-wrapper', Custommenu)
