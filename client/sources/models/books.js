import {getBookQuery, getAllBooksQuery, addBookQuery, updateBookQuery, deleteBookQuery} from '../graphqlQueries';
import {URL} from '../consts';

class BooksModel {
	constructor() {
		this._data = [];
	}

	async getDataFromServer() {
		const data = await fetch(URL, {
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
		const data = await fetch(URL, {
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

	async addItem(input) {
		const data = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: addBookQuery,
				variables: {input}
			})
		});
		return data.json();
	}

	async updateItem(bookID, input) {
		const data = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: updateBookQuery,
				variables: {bookID, input}
			})
		});
		return data.json();
	}

	async removeItem(bookID) {
		const data = await fetch(URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query: deleteBookQuery,
				variables: {bookID}
			})
		});
		return data.json();
	}
}

export default new BooksModel();