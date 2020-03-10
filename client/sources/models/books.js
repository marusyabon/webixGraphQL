class BooksModel {
	constructor() {
		this._data = [];
	}

	async getDataFromServer() {
		var query = `query {
			getBooks {
				_id
				bookTitle,
				numberOfPages,
				authorName,
				genres,
				availableCopies
			}
		}`;

		await fetch('http://localhost:3000/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query
			})
		})
		.then(r => r.json())
		.then(data => console.log('data returned:', data));

		// return webix.proxy("GraphQL", `query {
		// 	getBooks {
		// 		_id
		// 		bookTitle,
		// 		numberOfPages,
		// 		authorName,
		// 		genres,
		// 		availableCopies
		// 	}
		// }`);
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