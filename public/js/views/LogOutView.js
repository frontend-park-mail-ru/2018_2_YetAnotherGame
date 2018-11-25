import BaseView from "./BaseView.js"
import mediator from "../scripts/mediator.js"

export default class LogOutView extends BaseView {
    show() {
        mediator.emit("logout")
    }
}
