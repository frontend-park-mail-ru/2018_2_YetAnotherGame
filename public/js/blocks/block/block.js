(function () {
	"use strict"

	class Block {
		constructor(el) {
			this.el = el
		}

		static Create(tagName = "div", attrs = {}, classes = [], text = null) {
			const el = document.createElement(tagName)

			classes.forEach(function (className) {
				el.classList.add(className)
			})
			for (let name in attrs) {
				el.setAttribute(name, attrs[name])
			}
			if (text) {
				el.textContent = text
			}

			return new Block(el)
		}

		setText(text) {
			this.el.textContent = text
		}

		setAttribute(attrs = {}) {
			for (let name in attrs) {
				this.el.setAttribute(name, attrs[name])
			}
		}

		setInner(str = "") {
			this.el.innerHTML = str
		}

		clear() {
			this.el.innerHTML = ""
		}

		append(block) {
			this.el.appendChild(block.el)
			return this
		}

		on(event, callback) {
			this.el.addEventListener(event, callback)
			return function () {
				this.el.removeEventListener(event, callback)
			}.bind(this)
		}
	}

	window.Block = Block
})()
