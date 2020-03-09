import {URL} from '../consts';

class UsersModel {
	constructor() {
		this._url = `${URL}/users/`;
	}

	getDataFromServer() {
		return webix.ajax().get(this._url);
	}

	getReaders() {
		return webix.ajax().get(`${this._url}/readers`);
	}
	
	getItem(id) {
		return webix.ajax().get(`${this._url}${id}`);	
	}

	addItem(data) {
		return webix.ajax().post(this._url, data);
	}

	updateItem(data) {
		return webix.ajax().put(this._url, data);
	}
}

export default new UsersModel();