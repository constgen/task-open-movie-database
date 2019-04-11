import http from './http.service';

const API_KEY = '338f9a63';
const API_URL = `https://www.omdbapi.com`;

function getItems ({ body }) {
	if (body.Error) {
		throw new Error(body.Error);
	}
	return body.Search;
}

export default {
	search (text, page = 1) {
		return http.get(API_URL, {
			apikey: API_KEY,
			s: text,
			r: 'json',
			page
		}).then(getItems);
	}
};
