// these are your defaults
let defaultFolder        = "home"
let defaultSlug          = "index"
let mainContentContainer = "main.container"

// setup markdown-it
let md = window.markdownit()
                .set({ 
                  html: true, 
                  // breaks: true 
                })

// @todo this should probably be on htmx load, not on window load
window.onload = async () => {

  // convert markdown to html
  document.body.addEventListener('htmx:beforeSwap', function(evt) {
    let content = evt.detail.serverResponse

    if(evt.detail.xhr.status === 404){
      evt.detail.shouldSwap = true
      let place = evt.detail.pathInfo.requestPath.split("/")[1]
      content = `# 404\n_looks like there's nothing in my ${place}_`
    }

    content = md.render(content)

    evt.detail.serverResponse = content
  })

  // setup request before sending it
  document.body.addEventListener('htmx:configRequest', function(evt) {
    let reqPath = evt.detail.path
    let [folder, slug] = parseUrl(reqPath) // this is necessary, but ends up running twice if hard nav, hmmmm

    let endPath = `/${folder}/${slug}.md` // the only place where we tell it we want a .md file
    evt.detail.path = endPath
  })

  // default to home
  if (!window.location.href.includes("/#")) {
    folder = defaultFolder
    slug   = defaultSlug
  } else {
    [folder, slug] = parseUrl(window.location.hash)
  }

  // run request (runs the configRequest above)
  htmx.ajax("GET", `/#${folder}/${slug}`, mainContentContainer)
  htmx.addClass(htmx.find(`[hx-get*=${folder}]`), 'nav-active')

}

// take in a URL and spit out an array of [folder, file (slug)] 
function parseUrl(str) {

  let folder = defaultFolder
  let slug   = defaultSlug

  // /path/foo
  if (str.match(/(\#[^\/]*\/.*)/)) {
    folder = str.match(/(?<=\/?#).*(?=\/)/)[0]
    slug   = str.match(/(?<=\/?#(.*)\/).*/)[0]

  } else
  // /path
  if (str.match(/(\/?#[^\/]*[^\/]*)/)) {
    folder = str.match(/[^\/?#]+/)[0]
    
  } else
  // foo
  //@todo this doesn't work yet, needs done. 
  if (str.match(/^.*/)) {
    slug   = 'index'
    
  } else {
    // go home, something's borked
    folder = defaultFolder
    slug   = defaultSlug
  }

  return [folder, slug]
}
