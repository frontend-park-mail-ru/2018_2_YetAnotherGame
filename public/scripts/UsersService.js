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
			}).catch(function(){
				return 
			})
	}

	static Register (formdata){
        return AjaxModule.doPost({
            path: '/session/new',
            body: {
                email: formdata.email.value,
                password: formdata.password.value,
				username: formdata.username.value,
                first_name: formdata.first_name.value,
                last_name: formdata.last_name.value,
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
	
    static LogOut () {
		return AjaxModule.doDelete({
			path: '/session'
		})
		
	}
};
