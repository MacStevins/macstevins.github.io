//#region Constant Variables
//#region - For Functions
const base = new URL(`${window.location.protocol}//${window.location.host}`)
//#endregion
//#endregion

//#region Functions
/**
 * @author https://nocache.org/p/check-if-an-url-is-internal-or-external-in-javascript-typescript
 * 
 * @param {string} url The URL to test
 * @returns {boolean} If `true`, the `url` is the same as the domain currently loaded, else `false`
 */
function isInternal(url) {
	return url && new URL(url, base).hostname === base.hostname;
}

/**
 * @param {string} str The string to parse
 * @param {boolean} sanitize If `true` it sanitizes the element, else it keeps them from the original
 * @returns {HTMLElement} The element parsed
 */
function parseElement(str, sanitize) {
	if(str) {
		var elm = document.createElement('element')
		elm.innerHTML = str.trim()
		elm = elm.firstChild
		
		if(sanitize)
			elm.querySelectorAll("script, style").forEach(e => {
				var parent = e.parentElement
				e.remove()
				
				if(!parent.childElementCount)
					parent.remove()
			})
		
		return elm
	}
}
//#endregion

//#region Cleaning URL Bar
window.history.replaceState({}, '', window.location.href.replace(/\/(index\.html)?$/, ''))
//#endregion

//#region Event Handling
//#region - Page Loading
document.addEventListener('readystatechange', ev => {
//#region -- Parse External SVG Sources
	if(document.readyState == 'interactive') {
		document.querySelectorAll('svg').forEach(async el => {
			let svgSrc = el.getAttribute('src')
			try {
				if(isInternal(svgSrc)) {
					el.replaceWith(parseElement(await fetch(svgSrc).then(r => r.text()), true))
					el.removeAttribute('xmlns')
				}
				else if(!el.childElementCount)
					throw 'Empty SVG'
			}
			catch (er) {
				el.replaceWith(parseElement('<span>' + (el.getAttribute('alt') || svgSrc || er) + '</span>'))
			}
		})
	}
//#endregion
})
//#endregion

//#region - Page Finished Loading
window.addEventListener('load', ev => {
//#region -- Loading Screen Fade Out
	let loader = document.querySelector('loader')
	loader.addEventListener('transitioncancel', loader.remove) // TODO: Fix Inconsistency Bug in Chromium; Might Keep for Page Transitions
	loader.setAttribute('load-finish', '')
//#endregion
})
//#endregion

// let themeButton = document.querySelector('theme input')

// function changeTheme(themeName) {
// 	localStorage.setItem('theme', themeName)
	
// 	themeButton.setAttribute('src', '/static/img/icon/' + themeName + '.svg')
// 	document.body.setAttribute('darktheme', '')
// }

// changeTheme(localStorage.getItem('theme') || 'light')
// themeButton.addEventListener('click', () => {
// 	document.body.setAttribute('themechange', '')
// 	changeTheme(themeButton.getAttribute('src').lastIndexOf('light.svg') != -1 ? 'dark' : 'light')
// })

// document.body.addEventListener('transitionend', (event) => {
// 	if(event.propertyName == 'background-color')
// 		document.body.removeAttribute('themechange')
// })