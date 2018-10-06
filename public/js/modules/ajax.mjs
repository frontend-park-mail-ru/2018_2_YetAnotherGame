const noop = () => null;

// const baseURL = "http://127.0.0.1:8000/api"

export class AjaxModule {
    _ajax({callback = noop, method = 'GET', path = '/', body} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, path, true);
        xhr.withCredentials = true;

        if (body) {
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            callback(xhr);
        };

        if (body) {
            xhr.send(JSON.stringify(body));
        } else {
            xhr.send();
        }
    }

    // static get baseURL() {
    //     return baseURL
    // }

    doGet (params = {}) {
        this._ajax({...params, method: 'GET'});
    }

    doPost (params = {}) {
        this._ajax({...params, method: 'POST'});
    }

    doDelete(params = {}) {
        this._ajax({...params, method: 'DELETE'});
    }
}
