import BaseView from "./BaseView";
import mediator from "./mediator";

export default class LogOutView extends BaseView {
    constructor(el) {
        super(el)
    }
    show() {
        mediator.emit('user-logout')
    }
}