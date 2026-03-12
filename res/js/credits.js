// TODO: Commented `A`s mean for future 'View More' feature
function toCapitalize(s) {
	return s.charAt(0).toUpperCase() + s.slice(1)
}

async function initCredits() {
	let c = document.querySelectorAll('cred').item(0), h = location.hash.substring(1).split('=')
	c.textContent = ''
	
	if(!db)
		db = await fetch('/credits/data/db.json')
			.then(r => r.json())
	
	if(h[0])
		return c.insertAdjacentHTML('beforeend', `<item><iframe src='https://youtube.com/embed/${h[1]}' title='Youtube video player'></iframe><h3>${db[h[0]][h[1]]}</h3><sep h></sep>${await fetch('/credits/data/' + h[0] + '/' + h[1] + '.json')
			.then(r => r.json())
			.then(r => Object.entries(r).reduce((a, i) => {
					a += `<h3>${toCapitalize(i[0])}/s</h3>`
					
					switch(i[0]) {
						case 'tool':
							return a += i[1].reduce((b, o) => {
								let v = o.split(':'), d = v[0].split('.').reduce((d, t) => d && d[t], db['tool'])
								return b += `<a href='${d[1]}'>${d[0]}${(v[1] ? ` ${v[1]}` : '')}${(v[2] ? ` (${toCapitalize(v[2])})` : '')}</a>`
							}, '')
						case 'audio':
						case 'music':
						case 'video':
							return a += Object.entries(i[1]).reduce((b, o) => b + `<a href='${o[1]}'>${o[0]}</a>`, '')
						default:
							console.error(`Wrong data tag: ${i[0]}`)
							return a = a.slice(0, a.lastIndexOf('<h3>'))
					}
				}, '')
			)
		}`)
	
	Object.entries(db).forEach(t => {
		if(t[0] == 'tool')
			return
		
		// A let tL = Object.keys(t[1]).length
		Object.entries(t[1]).forEach(i => {
			c.insertAdjacentHTML('beforeend', `<a href='#${t[0]}=${i[0]}'><img src='credits/data/${t[0]}/${i[0]}.jpg'><div>${i[1]}`)
			
			// A tL--
		})
		
		// A if(tL != 0)
		// A	c.insertAdjacentHTML('beforeend', `<a href='#more=${t[0]}'>View More`)
	})
}

let db
initFunc.push(initCredits)

window.addEventListener('hashchange', initCredits)
