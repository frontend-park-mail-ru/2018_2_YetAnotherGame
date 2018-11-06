import Block from "../js/components/block/block.mjs";
import BaseView from "./BaseView.js"
import mediator from "./mediator.js";

const templateFunc = window.fest[ 'js/components/profile/profile.tmpl' ]

export default class ProfileView extends BaseView {
	constructor (el) {
		super(el);

		this.profile = null;

		mediator.on('profile-loaded', this.setProfile.bind(this))
	}

	setProfile(profile) {
		this.profile = profile
		this.render()
	}

	show() {
		super.show();

		this.fetchProfile();
	}

	fetchProfile() {
		mediator.emit('fetch-profile')
	}

	render() {
        this.el.clear();

		if (!this.profile) {
			this.renderLoading();
		} else {
			this.renderProfile();
		}
    }

    renderLoading () {
		const loading = Block.Create('strong', {}, []);
		loading.setText('Loading');
		this.el.append(loading);
	}

	renderProfile () {
		this.el.clear()
		const header = Block.Create('h1', {}, [], 'Profile')
		const profile = Block.Create("div", {}, [])
		profile.setInner(templateFunc(this.profile))
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")

		const profileSection = Block.Create("div", {}, [])
		profileSection		
			.append(header)
			.append(menuLink)
			.append(profile)

		this.el.append(profileSection);
	}
}