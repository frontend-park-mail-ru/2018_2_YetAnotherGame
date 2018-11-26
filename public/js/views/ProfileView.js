import PageView from "./PageView.js"
import Block from "../components/block/block.mjs"
import mediator from "../scripts/mediator.js"

const templateFunc = window.fest["js/components/profile/profile.tmpl"]

export default class ProfileView extends PageView {
	constructor (el) {
		super(el)

		this.profile = null
		mediator.on("profile-loaded", this.setProfile.bind(this))
	}

	setProfile(profile) {
		this.profile = profile
		this.render()
	}

	show() {
		super.show()

		this.fetchProfile()
	}

	fetchProfile() {
		mediator.emit("fetch-profile")
	}

	render() {
        this.el.clear()

		if (!this.profile) {
			this.renderLoading()
		} else {
			this.renderProfile()
		}
    }

    renderLoading () {
		const loading = Block.Create("strong", {}, [])
		loading.setText("Loading")
		this.el.append(loading)
	}

	renderProfile () {
		const ProfileHeader = Block.Create("div", {}, ["headerFont"], "Profile")
		const ProfileBody = Block.Create("div", {}, ["table", "profile__table"])
		const Profile = Block.Create("div", {}, ["profile", "body__profile"])

		const avatar = Block.Create("img", {"src": "../../img/default_avatar.png"}, ["avatar-80"])
		if (this.profile.avatar) {
			avatar.setAttribute({"src": `${this.profile.avatar}`})
		}

		ProfileBody.setInner(templateFunc(this.profile))
		// const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "Back to main menu")
		const menuLink = Block.Create("a", {"href": "menu", "data-href": "menu", "id": "back_button"}, [], "⬅")

		Profile
			.append(ProfileHeader)
			.append(avatar)
			.append(ProfileBody)

		super.render({
			header: [menuLink],
			body: [Profile]
		})

	}
}
