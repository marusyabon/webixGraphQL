import {URL} from '../consts';

class BooksModel {
	constructor() {
		this._data = [];
		this._url = `${URL}/books/`;
	}

	getDataFromServer(id) {
		const userId = {userId: id};
		fetch('/', {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			  'Accept': 'application/json',
			},
			body: JSON.stringify({query: "{ getBooks }"})
		  })
			.then(r => r.json())
			.then(data => data);
	}

	getBook(bookId) {
		return webix.ajax().get(`${this._url}${bookId}`);
	}

	addItem(data, func) {
		return webix.ajax().post(this._url, data, func);
	}

	updateItem(data) {
		return webix.ajax().put(this._url, data);
	}

	removeItem(id) {
		return webix.ajax().del(`${this._url}${id}`);
	}

	search(req) {
		return webix.ajax().get(`${this._url}search/${req}`);
	}
}

export default new BooksModel();