if(window.location.href.lastIndexOf("index.html"))
	window.history.replaceState({}, "", window.location.href.replace("index.html", ""))

if(window.location.href.endsWith("/") && !window.location.href.endsWith(window.location.origin + "/"))
	window.location.href = window.location.href.slice(0, -1)