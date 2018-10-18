const noop = () => null;

const baseURL = "http://127.0.0.1:8000/api"

export class AjaxModule {
    static _ajax({callback = noop, method = 'GET', path = '/', body, baseURL = ""} = {}) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, baseURL + path, true);
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

    doXHRGet (params = {}) {
        AjaxModule._ajax({...params, method: 'GET'});
    }

    static _send ({method = 'GET', path = '/', body} = {}) {
        const fetchURL = baseURL + path;
        const fetchOptions = {
            method: method,
            mode: 'cors',
            credentials: 'include',
        };
        if (method === 'POST') {
            if (body && body instanceof FormData) {
                fetchOptions.body = body;
            } else {
                fetchOptions.headers = {'Content-Type': 'application/json; charset=utf-8'};
                fetchOptions.body = JSON.stringify(body);
            }
        }

        return fetch(fetchURL, fetchOptions);
    }

    doPromiseGet (params = {}) {
        return new Promise(function (resolve, reject) {

            AjaxModule._ajax({
                ...params,
                method: 'GET',
                callback (xhr) {

                    resolve(xhr);
                }
            });

        });
    }

    doPost (params = {}) {
        return AjaxModule._send({...params, method: 'POST'})
    }

    doGet (params = {}) {
        return AjaxModule._send({...params, method: 'GET'});
    }

    doDelete (params = {}) {
        return AjaxModule._send({...params, method: 'DELETE'});
    }
}

// export default new AjaxModule
