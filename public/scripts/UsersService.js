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
};
