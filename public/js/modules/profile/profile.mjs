"use strict"

export class Profile {
	constructor ({el = document.body} = {}) {
		this._el = el
	}
	
	get data () {
		this._data
	}

	set data (data = []) {
		this._data = data
	}

	render () {
		if (!this._data) {
			return
		}
		this._renderTMPL()
	}

	_renderTMPL() {
		console.log(this._data)
		const template = window.fest["js/modules/profile/profile.tmpl"](this._data)
		this._el.setInner(template)
	}
}
