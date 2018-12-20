import AjaxModule from "../modules/ajax.mjs"

export default class UsersService {
	static FetchUsers () {
		return AjaxModule
			.doGet({
				path: `/leaders`
			})
			.then((res) => res.json())
			.catch((err) => {
				console.error(err)
				return err
			})
	}

	static FetchProfile () {
		return AjaxModule
			.doGet({
				path: `/users/me`
			})
			.then((res) => res.json())
	}

	static Register (formdata){
        return AjaxModule.doPost({
            path: "/session/new",
            body: {
                email: formdata.email.value,
                password: formdata.password.value,
				username: formdata.username.value,
                first_name: formdata.first_name.value,
                last_name: formdata.last_name.value,
            },
        })
		.then(response => {
			return response
		})
		.catch(error => {
			console.error(error)
		})
    }

	static Login (formdata){
		return AjaxModule.doPost({
			path: "/session",
			body: {
				email: formdata.email.value,
				password: formdata.password.value,
			},
		})
		.then(res => {
			if (res.status >= 300) {
				throw res
			}
			return res
		})
		.catch(error => {
			console.error(error)
			return error
		})
	}

	static LogOut (){
		return AjaxModule.doDelete({
			path: "/session",
		})
		.then(response => {
			return response
		})
		.catch(error => {
			console.error(error)
		})
	}

	static FetchUpdate (formdata) {
		const formData = new FormData()
		const file = formdata.image.files[0]
		if (file) {
			formData.append("image", formdata.image.files[0], formdata.image.files[0].name)
			AjaxModule.doPost({
				path: "/upload",
				body: formData,
			})
			.then((response) => {
				if (response.status >= 300) {
					throw response
				}
				console.log("success")
				// return response
			})
			.catch((error) => {
				console.error(error)
			})
		}
		return AjaxModule.doPost({
				path: "/users/me",
				body: {
					username: formdata.username.value,
					first_name: formdata.first_name.value,
					last_name: formdata.last_name.value,
				},
			})
			.then((response) => {
				if (response.status >= 300) {
					throw response
				}
				return response
			})
			.catch((err) => {
				console.log("error " + err.status)
				return err
			})
	}
}
