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
        // _renderDOM() {
        //     const table = document.createElement('table');
        //     const thead = document.createElement('thead');
        //     thead.innerHTML = `
        //     <tr>
        //     <th>Email</th>
        //     <!--<th>Age</th>-->
        //     <th>Score</th>
        //     </th>
        //     `;
        //     const tbody = document.createElement('tbody');
        //
        //     table.appendChild(thead);
        //     table.appendChild(tbody);
        //     table.border = 1;
        //     table.cellSpacing = table.cellPadding = 0;
        //     //console.log(users)
        //
        //     this._data.forEach(function (user) {
        //         const email = user.email;
        //         const age = user.age;
        //         const score = user.score;
        //
        //         const tr = document.createElement('tr');
        //         const tdEmail = document.createElement('td');
        //         const tdAge = document.createElement('td');
        //         const tdScore = document.createElement('td');
        //
        //         tdEmail.textContent = email;
        //         tdAge.textContent = age;
        //         tdScore.textContent = score;
        //
        //         tr.appendChild(tdEmail);
        //         tr.appendChild(tdAge);
        //         tr.appendChild(tdScore);
        //
        //         tbody.appendChild(tr);
        //
        //         // leaderboardSection.appendChild(table);
        //         this._el.appendChild(table);
        //
        //     }.bind(this));
        //     // this._el.append(Block.Create('div', {}, [], 'SJDGJSGDJBHSD'));
        // }
    }

    window.Scoreboard = Scoreboard;
})();
