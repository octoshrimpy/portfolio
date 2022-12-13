
<div class="colors grid">
  <button id="guess_prev">
    <div class="icon"><i class="nf-fa-plus"></i></div>
  </button>
  <div class="colorbox grid"></div>
  <button id="guess_next">
    <div class="icon"><i class="nf-fa-plus"></i></div>
  </button>
</div>
<div class="grid">
  <input type="color" name="color" id="color">
  <button id="add">add</button>
  <button id="clear">clear</button>
</div>


<style>
  .colorbox .color {
    /* aspect-ratio: 1 / 1; */
    /* padding: 1rem; */
    border-radius: var(--border-radius);
    border: 5px solid rgba(0,0,0,0.25);
    min-width: 3rem;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }

  .colorbox .color:hover::before {
    content: "remove";
    display: flex;
    position: absolute;
    height: 100%;
    width: 100%;
    color: white;
    background: rgba(0,0,0,0.5);
    align-items: center;
    justify-content: center;
  }


  .colorbox {
    margin-bottom: var(--spacing);
  }
</style>
    
<script>
  document.querySelector("#add")
    .addEventListener("click", addColor)
  
  document.querySelector("#guess_prev")
    .addEventListener("click", guessPrev)
  
  document.querySelector("#guess_next")
    .addEventListener("click", guessNext)

  document.querySelector("*")
    .addEventListener("click", remove)
  
  document.querySelector("#clear")
    .addEventListener("click", clear)
  
  let colorbox = document.querySelector(".colorbox")

  function remove(evt) {
    if (!evt.target.classList.contains("color")) { return }

    evt.target.parentNode.removeChild(evt.target)
  }
  function clear() {
    colorbox.innerHTML = ""
  }

  function addColor(evt, color = null, before = null) {
    let rgb

    if(color != null) {
      rgb = color
    } else {
      let colorElm = document.querySelector("#color")
      rgb = hex2rgb(colorElm.value)
    }

    let newColor = document.createElement("div")
    newColor.style.background = `rgb(${rgb.r},${rgb.g},${rgb.b})`
    newColor.classList.add("color")

    if (!!before) {
      colorbox.prependChild(newColor)
    } else {
      colorbox.appendChild(newColor)
    }
  }


  function guessPrev() {}

  function guessNext(evt) {
    let colorElm1 = colorbox.querySelector(".color:nth-last-child(2)")
    let colorElm2 = colorbox.querySelector(".color:nth-last-child(1)")

    let color1 = rgb2obj(colorElm1.style.background)
    let color2 = rgb2obj(colorElm2.style.background)

    let nextColor = getNextColor(color1, color2)
    
    // console.log("next", nextColor)
    addColor(this, nextColor)
  }

  function getNextColor(color1, color2) {
    let nextColor = {r:0,g:0,b:0}

    nextColor.r = color2.r - color1.r
    nextColor.g = color2.g - color1.g
    nextColor.b = color2.b - color1.b

    console.log("color1:", color1)
    console.log("color2:", color2)
    console.log("difference of:", nextColor)
    console.log("=================")
    
    // console.log("2", color2)
    // console.log("n", nextColor)
    
    nextColor.r += parseFloat(color2.r)
    nextColor.g += parseFloat(color2.g)
    nextColor.b += parseFloat(color2.b)

    // console.log("2", color2)
    // console.log("n", nextColor)

    return nextColor

  }

  function rgb2obj(rgb) {
    var m = rgb.match(/([0-9]{1,3}(?=[,)]))/g)
    let obj = {r: m[0], g: m[1], b:m[2]}
    return obj
  }

  // src: https://stackoverflow.com/a/30970691
  function hex2rgb(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}
</script>