
class Menucontent extends HTMLElement {
  constructor () {
    super()
    this.menuContent = `
    <style>
      .item, .heading {
        background-color: lightblue;
        display: none;
        width: 150px;
        height: 60px;
        align-items:center;
        justify-content:center;
      }
      .item:hover {
        background-color: white;
        cursor: default;
      }
      .heading {
        background-color:#63b4cf;
      }
    </style>
    <div class='heading'>
       Menu
    </div>
    <div class='item'>
       1st item
    </div>
    <div class='item'>
       2nd item
    </div>
    <div class='item'>
       3rd item
    </div>`
  }
}

customElements.define('my-menu-content', Menucontent)
