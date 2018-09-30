'use strict';

const Block = window.Block;

export class Scoreboard {
    constructor ({el = document.body} = {}) {
        // const _el = document.createElement('div');
        // const _el = el;
        // super(_el);
        this._el = el;
    }

    get data () {
        this._data;
    }

    set data (data = []) {
        this._data = data;
    }

    render () {
        if (!this._data) {
            return;
        }
        this._renderTMPL();
    }

    _renderTMPL() {
        console.log(window.fest['js/blocks/scoreboard/scoreboard.tmpl']);
        const template = window.fest['js/blocks/scoreboard/scoreboard.tmpl'](this._data);
        this._el.setInner(template)
    }
}