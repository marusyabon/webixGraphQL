class BooksModel {
	constructor() {
		this._data = [];
	}

	async getDataFromServer() {
		var query = `query {
			getBooks {
				_id
				coverPhoto,
				bookTitle,
				numberOfPages,
				authorName,
				publishingHouse,
				countryOfPublication,
				genres,
				availableCopies,
				yearOfPublication,
				isFiles,
				viewedTimes,
				orderedTimes
			}
		}`;

		const data = await fetch('http://localhost:3000/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				query
			})
		});
		return data.json();
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