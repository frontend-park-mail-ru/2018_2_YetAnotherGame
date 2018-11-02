import Block from "../js/components/block/block.mjs";
import Profile from "../js/components/profile/profile.mjs"
import BaseView from "./BaseView.js"



export default class ProfileView extends BaseView {
	constructor (el) {
		super(el);
	}

	render () {
		function createProfile(me) {
	const profileSection = Block.Create('section', {'data-section-name': 'profile'}, []);
	const header = Block.Create('h1', {}, [], 'Profile');
	const profileBlock = Block.Create('p', {}, []);

	profileSection
		.append(header)
		.append(createMenuLink())
		.append(profileBlock)


	if (me) {
		const profile = new Profile({el: profileBlock})
		profile.data = me
		profile.render()

		const img = Block.Create('img', {'src': `${me.avatar}`}, [])
		profileSection.append(img)
	} else {
		AJAX.doGet({
			path: '/user/me',
		})
			.then(res => res.text())
			.then(res => {
				if (!res) {
					throw res
				}
				let user = JSON.parse(res);
				game.clear();
				createProfile(user);
			})
			.catch(err => {
				alert("Unauthorized");
				game.clear();
				createMenu();
			});
	}
	game.append(profileSection);
}}}