import AjaxModule from '../js/modules/ajax.mjs'

export default class UsersService {
	static FetchUsers (pageNumber = 0) {
		return AjaxModule
			.doGet({
				path: `/leaders`
			})
			.then((res) => res.text())
			.then(res => {
				return JSON.parse(res)
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
//	createProfile();
})
	.catch(error => {
		console.error(error);
	});
}
};
