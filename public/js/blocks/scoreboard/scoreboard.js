(function() {
    'use strict';

    // const Block = window.Block;

    class Scoreboard {
        constructor ({el = document.body} = {}) {
            this._el = el;
            // const el = document.createElement('table');
            // super(el);
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
            this._renderDOM()
        }

        _renderDOM () {
            const table = document.createElement('table');
            const thead = document.createElement('thead');
            thead.innerHTML = `
            <tr>
            <th>Email</th>
            <!--<th>Age</th>-->
            <th>Score</th>
            </th>
            `;
            const tbody = document.createElement('tbody');

            table.appendChild(thead);
            table.appendChild(tbody);
            table.border = 1;
            table.cellSpacing = table.cellPadding = 0;
            //console.log(users)

            this._data.forEach(function (user) {
                const email = user.email;
                const age = user.age;
                const score = user.score;

                const tr = document.createElement('tr');
                const tdEmail = document.createElement('td');
                const tdAge = document.createElement('td');
                const tdScore = document.createElement('td');

                tdEmail.textContent = email;
                tdAge.textContent = age;
                tdScore.textContent = score;

                tr.appendChild(tdEmail);
                tr.appendChild(tdAge);
                tr.appendChild(tdScore);

                tbody.appendChild(tr);

                // leaderboardSection.appendChild(table);
                this._el.appendChild(table);
            }.bind(this));
        }
    }

    window.Scoreboard = Scoreboard;
})();
