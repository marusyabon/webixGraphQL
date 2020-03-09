import {URL} from '../consts';

class OrdersModel {
	constructor() {
		this._url = `${URL}/orders/`;
	}
	
	getItems(userId) {
		return webix.ajax().get(`${this._url}${userId}`);	
	}

	addItem(order) {
		return webix.ajax().post(this._url, order);
	}

	removeUserOrders(ordersToRemove, userId) {
		webix.ajax().put(this._url, {remove: ordersToRemove, userId: userId});
	}

	removeItem(id) {
		return webix.ajax().del(`${this._url}${id}`);
	}
}

export default new OrdersModel();