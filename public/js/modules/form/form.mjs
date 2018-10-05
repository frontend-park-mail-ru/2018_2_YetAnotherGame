"use strict"

import { Block } from "../block/block.mjs"

export class Form extends Block {
	constructor(fields = []) {
		const el = document.createElement("form")
		super(el)

		fields.forEach(function (field) {
			const f = Block.Create("input", field.attrs || {}, field.classes || [])
			this.append(f)
			this.append(Block.Create("br", {}, []))
		}.bind(this))
	}

	onSubmit(callback) {
		this.el.addEventListener('submit', function (event) {
			event.preventDefault();

			const formdata = {};
			const elements = this.el.elements;
			for (let iter in elements) {
				const name = elements[iter].name;
				formdata[name] = elements[iter];
			}


			callback(formdata)
		}.bind(this))
	}

	reset() {
		this.el.reset()
	}
}
