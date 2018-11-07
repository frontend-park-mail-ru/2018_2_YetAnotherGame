import AjaxModule from '../js/modules/ajax.mjs'

export default class UsersService {
	static FetchUsers () {
		return AjaxModule
			.doGet({
				path: `/leaders`
			})
			.then((res) => res.text())
			.then(res => {
				return JSON.parse(res)
			})
	}

	static FetchProfile () {
		return AjaxModule
			.doGet({
				path: `/user/me`
			})
			.then((res) => res.text())
			.then(res => {
				return JSON.parse(res)
			})
	}

	static FetchUpdate (formdata) {
		const formData = new FormData(document.forms.myForm);
		return AJAX.doPost({
			path: '/upload',
			body: formData,
		})
			.then((response) => {
				if (response.status >= 300) {
					throw response;
				}
				console.log("success");
			})
			.then(() => {
				AJAX.doPost({
					path: '/user/me',
					body: {
						email: formdata.email.value,
						username: formdata.username.value,
						first_name: formdata.first_name.value,
						last_name: formdata.last_name.value,
					},
				})
					.then((response) => {
						if (response.status >= 300) {
							throw response;
						}
						this.el.clear();
						// createProfile();
					})
					.catch((error) => {
						console.error(error);
					});
			})
			.catch((err) => {
				console.log("error " + err.status);
			})
	}

	static Login (formdata){
		return AjaxModule.doPost({
			path: '/session',
			body: {
				email: formdata.email.value,
				password: formdata.password.value,
			},
		})
		.then(response => {

			return response;

			//game.clear();
			//createProfile();
		})
		.catch(error => {
			console.error(error);
		});
	}
};
