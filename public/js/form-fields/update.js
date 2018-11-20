(function () {
	"use strict"

	window.updateFields = [
		{
			attrs: {
				name: "email",
				type: "email",
				placeholder: "Email",
			},
		},
		{
			attrs: {
				name: "username",
				type: "text",
				placeholder: "Username",
			},
		},
		{
			attrs: {
				name: "first_name",
				type: "text",
				placeholder: "First Name",
			},
		},
		{
			attrs: {
				name: "last_name",
				type: "text",
				placeholder: "Last Name",
			},
		},
		{
			attrs: {
				name: "image",
				id: "image",
				type: "file",
				accept: "image/*",
				class: "file-field form__file-field",
			},
		},
		{
			attrs: {
				class: "form__Usubmit",
				name: "submit",
				type: "submit",
			},
		}
	]

})()
