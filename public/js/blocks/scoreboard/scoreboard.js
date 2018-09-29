(function() {
    'use strict';

    const Block = window.Block;

    class Scoreboard {
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
            this._renderDOM();
            // this._renderTMPL();
        }

        _renderTMPL() {
            // console.log(window.fest['js/blocks/scoreboard/scoreboard.tmpl']);
            // const template = window.fest['js/blocks/scoreboard/scoreboard.tmpl'](this._data);
            // this._el.innerHTML = template;
        }

        _renderDOM() {
            const table = Block.Create('table', {'border': '1', 'cellSpacing': '0', 'cellPadding': '0'}, []);
            const thead = Block.Create('thead', {}, []);

            const innerHTML = `
                <tr>
                    <th>Email</th>
                    <!--<th>Age</th>-->
                    <th>Score</th>
                </tr>
            `;
            thead.setInner(innerHTML);

            const tbody = Block.Create('tbody', {}, []);

            table
                .append(thead)
                .append(tbody);

            this._data.forEach(function (user) {
                const email = user.email;
                const score = user.score;

                const tr = Block.Create('tr', {}, [])
                tr
                    .append(Block.Create('td', {}, [], `${email}`))
                    .append(Block.Create('td', {}, []))
                    .append(Block.Create('td', {}, [], `${score}`));

                tbody.append(tr);

                this._el.append(table);
            }.bind(this));
        }
    }

    window.Scoreboard = Scoreboard;
})();
