import { JetView } from 'webix-jet';
import usersModel from '../models/users';
import {updateItem} from '../scripts'; 


export default class Settings extends JetView {
	config() {
		const button = {
			view: 'button',
			id: 'saveChanges',
			value: 'Save',
			type: 'form',
			inputWidth: 100,
			click: () => {
				this.saveForm();
			}
		};

		const userData = {
			view: 'form',
			localId: 'userDataForm',
			elements: [
				{ view: 'text', name: 'id', localId: 'user_id', hidden: true },
				{ view: 'text', label: 'First name',name: 'user_name', labelWidth: 90, labelAlign: 'right'},
				{ view: 'text', label: 'Last name',name: 'user_surname', labelWidth: 90, labelAlign: 'right'},
				{ view: 'text', label: 'Passport ID',name: 'passport_ID', labelWidth: 90, labelAlign: 'right'},
				{ view: 'datepicker', label: 'Birth date',name: 'birth_date', localId: 'birth_date', labelWidth: 90, labelAlign: 'right'},
				{ view: 'text', label: 'Address',name: 'address', labelWidth: 90, labelAlign: 'right'},
				{ view: 'text', label: 'Phone',name: 'phone_numbers', labelWidth: 90, labelAlign: 'right'},
				{ view: 'text', label: 'Email',name: 'email', labelWidth: 90, labelAlign: 'right'},
				{ view: 'checkbox', labelRight: 'I agree to receive emails', name: 'accept_newsletters', labelWidth: 87 },
				button
			]
		};

		return {
			rows: [userData]
		};
	}

	init() {
		const id = this.getParam('id', true);

		usersModel.getItem(id).then((data) => {
			const userData = data.json();
			userData.birth_date = new Date(userData.birth_date);
			this.$$('userDataForm').setValues(userData);
		});	
	}
	
	successAction() {
		webix.message('New data saved');
	}

	saveForm () {
		const data = this.$$('userDataForm').getValues();
		updateItem(usersModel, data, this.successAction);
	}
}