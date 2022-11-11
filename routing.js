function route() {
  console.log("am routing")
  
  // if loading module directly instead of through SPA✔
  // if(!("isRoot" in window && isRoot)) {
  if(!("isRoot" in window) || !isRoot) {
    
    console.log("not in root!")
    // url.com/path/to/place
    let path    = window.location.href
    let origin  = window.location.origin
    let endSlug = (path.replace(origin, "")).replace("/?", "")
    endSlug = endSlug.replace(/\/$/, "")
    
    // url.com/#path/to/place
    let endUrl = `${origin}#~?load=${endSlug}`
    //@todo load into is overly verbose, as this is a routing.
    // also can open up weird bugs and security problems.
    // just pass a "nav=page"  kind of thing
    
    window.location.replace(endUrl)      
  } else  {
    console.log("in root, ignoring")
  }

  console.log("end routing")
}

route()
