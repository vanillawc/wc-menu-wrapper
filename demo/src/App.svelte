<script>

  import Highlight from 'svelte-highlight';
  import { xml } from 'svelte-highlight/languages';
  import { javascript } from 'svelte-highlight/languages';
  import { github } from 'svelte-highlight/styles';
  import { css } from 'svelte-highlight/languages';
  import '@vanillawc/wc-menu-wrapper';

  var js_example = `function onClickFunc(elem) {
  elem.dispatchEvent(new CustomEvent('menuClose', {bubbles: true}))
}
`

  var style_example = `.item, .heading {
  background-color: lightblue;
  display: none;
  width: 150px;
  height: 60px;
  align-items:center;
  justify-content:center;
}
item:hover {
  background-color: white;
  cursor: default;
}
.heading {
  background-color:#63b4cf;
}
`

var style_example_2 = `.item, .heading {
  background-color: lightblue;
  display: none;
  width: 150px;
  height: 60px;
  align-items:center;
  justify-content:center;
}
item:hover {
  background-color: white;
  cursor: default;
}
.heading {
  background-color:#63b4cf;
}
.menuopen {
  color:white;
  background-color:black;
}
`

  var example_1 = `<wc-menu-wrapper mode='click'
             position='bottom'
             direction='down'>
  <div class='heading'>Menu</div>
  <div class='item'> 1st item </div>
  <div class='item'> 2nd item </div>
  <div class='item'> 3rd item </div>
</wc-menu-wrapper>
`

  var example_2 = `<wc-menu-wrapper mode='click'
             position='bottom'
             direction='down'>
  <div class='heading'>Menu</div>
  <div class='item'> 1st item </div>
  <div class='item'>
    <wc-menu-wrapper mode='click'
                 position='right'
                 direction='down'>
      <div class='heading'>Submenu</div>
      <div class='item'> 1st item </div>
      <div class='item'> 2nd item </div>
      <div class='item'> 3rd item </div>
    </wc-menu-wrapper>
  </div>
  <div class='item'> 3rd item </div>
</wc-menu-wrapper>
`

var example_3 = `<wc-menu-wrapper mode='hover'
             position='bottom'
             direction='down'>
  <div class='heading'>Menu</div>
  <div class='item'> 1st item </div>
  <div class='item'>
    <wc-menu-wrapper mode='hover'
                 position='right'
                 direction='down'>
      <div class='heading'>Submenu</div>
      <div class='item'> 1st item </div>
      <div class='item'> 2nd item </div>
      <div class='item'> 3rd item </div>
    </wc-menu-wrapper>
  </div>
  <div class='item'> 3rd item </div>
</wc-menu-wrapper>
`

var example_4 = `<wc-menu-wrapper mode='click'
             position='bottom'
             direction='down'>
  <div class='heading'>Menu</div>
  <div class='item'> 1st item </div>
  <div class='item'>
    <wc-menu-wrapper mode='click'
                 position='right'
                 direction='right'>
      <div class='heading'>Submenu</div>
      <div class='item'> 1st item </div>
      <div class='item'> 2nd item </div>
      <div class='item'> 3rd item </div>
    </wc-menu-wrapper>
  </div>
  <div class='item'> 3rd item </div>
</wc-menu-wrapper>
`

var example_5 = `<wc-menu-wrapper mode='click'
           position='bottom'
           direction='down'>
  <div class='heading'>Menu</div>
  <div class='item'> 1st item </div>
  <div class='item'> 2nd item </div>
  <div class='item' onclick='onClickFunc(this)'> Click to close </div>
</wc-menu-wrapper>
`

var example_6 = `<wc-menu-wrapper mode='click'
           position='bottom'
           direction='down'
           heading-class='menuopen'>
  <div class='heading'>Menu</div>
  <div class='item'> 1st item </div>
  <div class='item'> 2nd item </div>
  <div class='item'> 3rd item </div>
</wc-menu-wrapper>
`

  function onClickFunc(e) {
    e.target.dispatchEvent(new CustomEvent('menuClose', {bubbles:true}))
  }

</script>

<svelte:head>
  {@html github}
</svelte:head>

<main>
  <div id="description">
    wc-menu-wrapper web component is available from <a href="https://github.com/vanillawc/wc-menu-wrapper" target="_blank">GitHub</a> and <a href="https://www.npmjs.com/package/@vanillawc/wc-menu-wrapper" target="_blank">NPM registry</a>
  </div>
  <div id='header'>
    wc-menu-wrapper demo
  </div>
  <div class='container'>
    <div class='description'>
    Click to toggle the menu:
    </div>

    {@html example_1}

    <div class='yspace'></div>

    <div class='buttons_container'>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show HTML</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={xml}>
           {example_1}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show CSS</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={css}>
           {style_example}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
    </div>

  </div>

  <div class='container'>
    <div class='description'>
    Menu with submenu, both toggled by clicking:
    </div>

    {@html example_2}

    <div class='yspace'></div>

    <div class='buttons_container'>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show HTML</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={xml}>
           {example_2}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show CSS</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={css}>
           {style_example}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
    </div>

  </div>

  <div class='container'>
    <div class='description'>
    Menu with submenu, both toggled by hovering:
    </div>

    {@html example_3}

    <div class='yspace'></div>

    <div class='buttons_container'>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show HTML</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={xml}>
           {example_3}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show CSS</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={css}>
           {style_example}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
    </div>

  </div>

  <div class='container'>
    <div class='description'>
    Menu with submenu, toggled by click, submenu direction to right:
    </div>

    {@html example_4}

    <div class='yspace'></div>

    <div class='buttons_container'>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show HTML</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={xml}>
           {example_4}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show CSS</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={css}>
           {style_example}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
    </div>

  </div>

  <div class='container'>
    <div class='description'>
    Closing the menu by dispatching menuClose event:
    </div>

    <wc-menu-wrapper mode='click'
               position='bottom'
               direction='down'>
    <div class='heading'>Main menu</div>
    <div class='item'> 1st item </div>
    <div class='item'> 2nd item </div>
    <div class='item' on:click={onClickFunc}> Click to close </div>
    </wc-menu-wrapper>

    <div class='yspace'></div>

    <div class='buttons_container'>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show HTML</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={xml}>
           {example_5}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show Javascript</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={javascript}>
           {js_example}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show CSS</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={css}>
           {style_example}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
    </div>

  </div>

  <div class='container'>
    <div class='description'>
    Using heading-class to style the heading while the menu is open:
    </div>

    {@html example_6}

    <div class='yspace'></div>

    <div class='buttons_container'>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show HTML</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={xml}>
           {example_6}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
      <wc-menu-wrapper mode='click' position='bottom' direction='down' heading='htmlheading' item='htmlitem'>
        <div class='htmlheading'>Show CSS</div>
        <div class='htmlitem'>
          <div class='code'>
            <Highlight language={css}>
           {style_example_2}
            </Highlight>
          </div>
        </div>
      </wc-menu-wrapper>
    </div>

  </div>

  <div id="footer">
    this page was made with &heartsuit; and  <a href="https://svelte.dev/" target="_blank">Svelte</a>
  </div>
</main>

<style>

 wc-menu-wrapper{
   margin-left:20px;
   margin-right:20px;
 }

.buttons_container {
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom:20px;
}

.yspace {
  height:120px;
}

:global(.item), :global(.heading) {
  color:black;
  background-color: lightblue;
  display: none;
  width: 150px;
  height: 40px;
  align-items:center;
  justify-content:center;
}
:global(.item:hover) {
  color: white;
  background-color: black;
  cursor: default;
}
:global(.heading) {
  background-color:#63b4cf;
}

:global(.menuopen) {
  color:white;
  background-color:black;
}

.htmlitem, .htmlheading {
  background-color: lightgray;
  display: none;
  width: 150px;
  height: 30px;
  align-items:center;
  justify-content:center;
}
.htmlitem:hover {
  background-color: white;
  cursor: default;
}
.htmlheading {
  background-color:lightgray;
}

#cal_button{
  width:25px;
  height: 25px;
  background-color: white;
  margin-left:5px;
  font-size: 24px;
}

#cal_button:hover{
  cursor: pointer;
}

.alternative {
  display:flex;
  align-items:center;
  justify-content:center;
}

.description{
  margin:10px;
}

.code{
  padding:30px 40px;
  margin:0px 5px 10px 5px;
  width:680px;
  background-color: white;
  font-family: "Courier New", Courier, monospace;
  font-size: 14px;
  text-align: left;
}

.code_heading{
  width:716px;
  background-color: white;
  font-family: Arial;
  padding:2px;
  margin:10px 5px 0px 5px;
  color:gray;
  font-style: italic;
  font-size: 14px;
}

.container, #header{
  padding: 10px 20px;
  margin:10px auto;
  width:700px;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color: #ebf6f9;
  flex-direction: column;
  font-family: Arial;
  box-shadow: 4px 4px 4px lightgrey;
}

#header {
  font-size: 20px;
}

#description, #footer {
  width: 800px;
  padding: 10px 20px;
  margin:10px auto;
  font-size: 16px;
  font-style: italic;
  font-family: Arial;
  text-align: center;
}

#footer{
  margin-top:100px;
}

input {
  width:110px;
}

:global(body) {
  background-color: #f2f2f2;
}

</style>
