import {getBookQuery, getAllBooksQuery} from '../graphqlQueries';

class BooksModel {
	constructor() {
		this._data = [];
	}

	async getDataFromServer() {
		const data = await fetch('http://localhost:3000/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: getAllBooksQuery
			})
		});
		return data.json();
	}

	async getBook(bookID) {
		const data = await fetch('http://localhost:3000/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: getBookQuery,
				variables: {bookID}
			})
		});
		return data.json();
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