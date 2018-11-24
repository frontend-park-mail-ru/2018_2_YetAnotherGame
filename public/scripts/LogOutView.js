import BaseView from "./BaseView.js";
import mediator from "./mediator.js";

export default class LogOutView extends BaseView {
    show() {
        mediator.emit('logout')
    }
}