import AjaxModule from '../js/modules/ajax.mjs'

export default class UsersService {
	static FetchUsers (pageNumber) {
		return AjaxModule
			.doGet({
				path: '/leaders?page={pageNumber}'
			})
			.then((res) => res.text())
			.then(res => {
				return JSON.parse(res)
			})
	}
};
