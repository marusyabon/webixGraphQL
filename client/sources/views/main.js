import {JetView} from 'webix-jet';
import ordersModel from './../models/orders';

export default class MainView extends JetView{
	config() {
		const testResults = {
			view: 'datatable',
			localId: 'ordersList',
			select: true,
			columns: [	
				{
					id: 'id',
					hidden: true,
				},				
				{
					id: 'bookTitle',
					header: 'Book',
					fillspace: 1
				},
				{
					id: 'authorName',
					header: 'Author',
					fillspace: 1
				},
				{
					id: 'removeCol',
					header: 'Remove',
					css: 'center',
					width: 70,
					template: '<i class="fas fa-trash"></i>'
				}				
			],
			onClick: {
				'fa-trash': (e, id) => {
					this.removeBook(id);
				}
			}
		};

		const button = {
			view: 'button',
			id: 'addGroup',
			value: 'Add',
			type:'form',
			inputWidth: 100,
			click: () => {}
		};

		return { 
			rows: [testResults, button]
		};
	}

	init() {
		this.grid = this.$$('ordersList');
		this.userId = this.getParam("id", true);
		// this.parseBooks();		
	}

	async parseBooks() {
		await ordersModel.getItems(this.userId).then((dbData) => {
			const ordersArr = dbData.json();

			ordersArr.forEach((el) => {
				el.bookTitle = el.book.bookTitle;
				el.authorName = el.book.authorName;
			});
			
			this.grid.clearAll();
			this.$$('ordersList').parse(ordersArr);
		});
	}

	async removeBook(id) {
		await ordersModel.removeItem(id);
		await this.parseBooks();
	}
}