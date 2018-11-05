export default class BaseView {
    constructor(el) {
        this.el = el

        this.el.el.dataset.view = this.constructor.name
        this.el.hide()
    }

    get active() {
        return this.el.isActive()
    }

    hide() {
        this.el.hide();
    }

    show() {
        this.el.show();
        this.render();
    }

    render() {

    }
}