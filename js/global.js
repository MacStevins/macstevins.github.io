let adrBar = window.location

if(adrBar.href.lastIndexOf("index.html"))
	window.history.replaceState({}, "", adrBar.href.replace("index.html", ""))

if(!adrBar.href.endsWith("/") && !adrBar.href.endsWith(adrBar.origin))
	adrBar.href += "/"