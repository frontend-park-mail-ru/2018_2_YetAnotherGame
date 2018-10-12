const noop = () => null;

// const baseURL = "http://127.0.0.1:8000/api"

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

    // static get baseURL() {
    //     return baseURL
    // }

    doGet (params = {}) {
        AjaxModule._ajax({...params, method: 'GET'});
    }

    doPost (params = {}) {
        AjaxModule._ajax({...params, method: 'POST'});
    }

    doDelete (params = {}) {
        AjaxModule._ajax({...params, method: 'DELETE'});
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

    doFetchPost (params = {}) {
        return fetch(params.baseURL + params.path, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(params.body)
		});
    }
}
