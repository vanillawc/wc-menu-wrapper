[![minified](https://badgen.net/badge/minified/4.3%20kB/blue)](https://badgen.net/badge/minified/4.3%20kB/blue)
[![minified & compressed](https://badgen.net/badge/minified%20&%20compressed/1.9%20kB/blue)](https://badgen.net/badge/minified%20&%20compressed/1.9%20kB/blue)

# wc-menu-wrapper
A web component that wraps HTML elements and forms a drop-down menu out of them.

Live demo available [here.](http://135.181.40.67/wcmenuwrapper/)

## Features
Wc-menu-wrapper is a standalone vanilla JS web component that does not use shadow DOM.

Component features include:
- content agnostic: menu items should be able to contain any HTML
- nestable: allows creating of versatile menu-submenu structures
- menu "drop" directions: down or right
- initial menu item positions: bottom or right
- menu toggling methods: click or hover

## Usage
- create a menu heading container by assigning a heading class to it
- create menu item containers by assigning item classes to them
- add style to classes
- add content inside the containers
- wrap the containers inside a custom menu component
- dispatch menuClose events from within the menu items if necessary

HTML example:

 ```html
     <wc-menu-wrapper>
        <div class='heading'> Menu </div>
        <div class='item'> 1st item </div>
        <div class='item'> 2nd item </div>
        <div class='item'> 3rd item </div>
     </wc-menu-wrapper>    
 ```

 Style example:

 ```css
   .item, .heading {
    background-color: lightblue;
    display: none;
    width: 150px;
    height: 60px;
    align-items: center;
    justify-content: center;
  }

  .item:hover {
    background: white;
    cursor: default;
  }

  .heading {
    background-color: #63b4cf;
  }
 ```
Value *none* should be assigned as an initial display style for the containers.

Component will change the container display style to *flex* during component initialization.

Container contents should be considered as flex items when styling them.

In the example above, the content is centered as flex items with *align-items* and *justify-content* directives.

## Including the component to an HTML file

1. Import polyfill, this is not needed for modern browsers:

    ```html
    <script src="https://cdnjs.cloudflare.com/ajax/libs/custom-elements/1.4.1/custom-elements.min.js"></script>
    ```

2. Import custom element:

    ```html
    <script defer src='wc-menu-wrapper.min.js'></script>
    ```

3. Start using it!

    ```html
     <wc-menu-wrapper>
        <div class='heading'> Menu </div>
        <div class='item'> 1st item </div>
     </wc-menu-wrapper>    
    ```
## Including the component from NPM

1. Install and import polyfill, this is not needed for modern browsers:

   See https://www.npmjs.com/package/@webcomponents/custom-elements

2. Install wc-menu-wrapper NPM package:

    ```console
    npm i @vanillawc/wc-menu-wrapper
    ```

3. Import custom element:

    ```javascript
    import '@vanillawc/wc-menu-wrapper'
    ```

4. Start using it:

   ```javascript
   var menu = document.createElement('wc-menu-wrapper')
   var heading = document.createElement('div')
   var item = document.createElement('div')
   heading.innerHTML = 'Menu'
   item.innerHTML = 'Item 1'
   heading.classList.add('heading')
   item.classList.add('item')
   menu.appendChild(heading)
   menu.appendChild(item)   
   document.body.appendChild(menu)
   ```


## Attributes

### mode

Defines how the menu can be toggled.

Menu can be toggled by clicking or hovering on it.

Attribute value must be either 'click' or 'hover'.

Default mode is 'click'.

HTML example:

```html
<wc-menu-wrapper mode='hover'>
```

### position

Defines initial menu item position in relation to menu heading.

Attribute value must be either 'bottom' or 'right'.

Default position is 'bottom'.

HTML example:

```html
<wc-menu-wrapper position='right'>
```

### direction

Defines menu opening direction.

Attribute value must be either 'down' or 'right'.

Default direction is 'down'.

HTML example:

```html
<wc-menu-wrapper direction='right'>
```

### init-state-open

If defined, the menu will initially be displayed in open state.

This attribute is a boolean attribute, also known as a valueless attribute.

HTML example:

```html
<wc-menu-wrapper init-state-open>
```

### closing-delay

Defines how many milliseconds the menu will be open after the pointer is not above the menu anymore.

This attribute applies only when the menu is in hover mode.

Default delay is 500 ms.

HTML example:

```html
<wc-menu-wrapper mode='hover' closing-delay='1000'>
```

### close-submenus-on-closing

Defines whether the submenus will be closed when the menu is closed by custom event or by losing focus.

This attribute is a boolean attribute, also known as a valueless attribute.

This attribute applies only when the menu is in click mode.

By default, the component will not close submenus on closing.

HTML example:

```html
<wc-menu-wrapper close-submenus-on-closing>
```

### close-submenus-on-heading-click

Defines whether the submenus will be closed when the menu is closed by heading click.

This attribute is a boolean attribute, also known as a valueless attribute.

This attribute applies only when the menu is in click mode.

By default, the component will not close submenus on heading click.

HTML example:

```html
<wc-menu-wrapper close-submenus-on-heading-click>
```

### heading-class

Defines the name of the class that will be assigned to heading when the menu is opened.

The class will be removed from heading when the menu is closed.

This attribute can be used to change the heading style when the menu is toggled.

This attribute does not have a default value.

CSS example:

 ```css
  .menu-open-heading {
    background-color: #black;
    color:white;
  }
 ```
HTML example:

```html
<wc-menu-wrapper heading-class='menu-open-heading'>
```

### item

Defines new item class name, if the default class name 'item' can not be used.

### heading

Defines new heading class name, if the default class name 'heading' can not be used.

## Closing the menu

Following events cause menu closing:

 * item or its descentant loses focus due to click outside menu area
 * heading loses focus due to click outside menu area (on click mode only)
 * click on the heading (on click mode only)
 * hover outside menu area for longer than closing-delay time (on hover mode only)
 * menuClose or rootMenuClose event is dispatched from menu item or its descentant

#### Dispatching menuClose event

  menuClose event closes the menu that contains the item from within the event originated from.

  Example:

```javascript
  var element = getElementById("elemId")
  element.dispatchEvent(new CustomEvent('menuClose', {bubbles: true}))
```

  In the example above, the element must be a menu item or its descentant.
  Remember to set the 'bubbles:true' object parameter on CustomEvent.

#### Dispatching rootMenuClose event

  rootMenuClose event closes the root menu that contains the submenu that contains the item from within the event originated from.

  rootMenuClose event closes the menu also if it there are no submenus at all.

Example:

```javascript
  var element = getElementById("elemId")
  element.dispatchEvent(new CustomEvent('rootMenuClose'))
```

  In the example above, the element must be a descendant of menu item element. Unlike in the case of menuClose event, there is no need for second parameter on CustomEvent.

## Adding and removing menu items

If component has not been added to DOM, new items can be added with HTML DOM appendChild() method.

If component has been added to DOM, new items must be added with component's addItem() method, see documentation below.

Items can be removed from the component by using HTML DOM ChildNode.remove() method.

You can use document.getElementById() or document.querySelector() methods to get the item element and then remove it with its own remove() method.

If component has been added to DOM, items can be removed also with components deleteItem() method, see documentation below.

## Methods

### addItem( element, index )

Adds new menu item container. The element parameter must be a div element that contains the actual item content. The index parameter defines the place of the new item to be added. Index 0 adds item as first. If index parameter is omitted, item is added as last. Index parameter must be integer.

This method can be used only when the component has been added to DOM.

### deleteItem( param )

Removes menu item container from menu. If param type is string, param is considered to be the id of the item container to be removed. If param type is number, param is considered to be the ordinal index of the item container to be removed.

If param is omitted, the last item container shall be removed.

This method can be used only when the component has been added to DOM.

## Importing menu content as component

Menu content can be imported from a file as a custom element.

Example:

 ```html
     <script src="my-menu-content.js"></script>

     <wc-menu-wrapper>
        <my-menu-content />
     </wc-menu-wrapper>    
 ```

Element name can be freely chosen as long as it adheres to custom element naming rules.

The element must have *menuContent* attribute that shall contain the menu content HTML definition.

See example file *my-menu-content.js* in *menu-content-component* folder.

## Building

Unminified scripts in the dist folder can be used and modified as such, there are no build scripts available for them.

Building is done by executing the minifier script minify.cmd, which is a Linux bash shell script.

Minify.cmd can be found from dist folder.

Building (minifying) requires [terser](https://github.com/terser/terser) command line tool to be installed. It can be installed with following command:
```console
 npm install terser -g
   ```
## Contributing

Questions, suggestions and bug reports are welcome. Safari testing would be nice.

## License

Copyright (c) 2020 Jussi Utunen

Licensed under the MIT License
