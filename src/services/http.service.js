import formatUrlQuery from '../utils/format-url-query';

export function request ({ method = 'GET', url, params = {}, body = null }) {
	let xhr = new XMLHttpRequest();
	let requestUrl = url + formatUrlQuery(params);

	xhr.open(method, requestUrl, true);
	xhr.responseType = 'text';

	return new Promise(function (resolve, reject) {
		xhr.onreadystatechange = function () {
			if (this.readyState !== this.DONE) return;

			if (
				(this.status >= 200 && this.status < 300)
				|| (this.status === 0 && this.responseText) // local
			) {
				resolve({ body: this.responseText });
			}
			else if (this.status === 304) {
				resolve({ body: undefined });
			}
			else {
				reject(new Error(this.statusText));
			}
			this.onreadystatechange = null;
			xhr = undefined;
		};

		try {
			xhr.send(body);
		}
		catch (err) { // crossdomain
			reject(err);
		}
	}).then(function (response) {
		response.body = response.body ? JSON.parse(response.body) : undefined;
		return response;
	});
}

export default {
	get (url, params) {
		return request({ method: 'GET', url, params });
	},

	post () {

	}
};