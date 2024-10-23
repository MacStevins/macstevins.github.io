if(window.location.href.lastIndexOf("index.html") > -1)
	window.history.replaceState({}, "", window.location.href.replace("index.html", ""))

if(!window.location.href.endsWith("/") && !window.location.href.endsWith(window.location.origin))
	window.location.href += "/"