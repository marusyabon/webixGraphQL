import {JetView} from 'webix-jet';
import booksModel from '../models/books';
import {DUMMYCOVER} from '../consts';
import {toggleElement} from '../scripts'; 

export default class BookCard extends JetView {
	config() {

		const bookCover = {
			localId: 'bookCover',
			width: 120,
			height: 180,
			css: 'book_cover',
			template: (url) => {
				return `<div style="background-image: url(${url})" ></div>`;
			}
		};

		const bookCard = {
			localId: 'bookCardLibrarian',
			view: 'form',
			borderless: true,
			elements: [
				{ view: 'text', label: 'Title', labelWidth: 130, width: 310, labelAlign: 'right', name: 'bookTitle' },
				{ view: 'text', label: 'Author', labelWidth: 130, width: 310, labelAlign: 'right', name: 'authorName' },
				{ view: 'combo', label: 'Genres', labelWidth: 130, value: "111", width: 310, labelAlign: 'right', name: 'genres', options: [
					'', 'Fiction', 'Fantasy', 'Thriller', 'Horror', 'Mystery', 'Historical', 'Westerns', 'Family', 'Dark comedy'
				]},
				{ view: 'text', label: 'Country', labelWidth: 130, width: 310, labelAlign: 'right', name: 'countryOfPublication' },
				{ view: 'text', label: 'Publishing house', labelWidth: 130, width: 310, labelAlign: 'right', name: 'publishingHouse' },
				{ view: 'text', label: 'Available copies', labelWidth: 130, width: 310, labelAlign: 'right', name: 'availableCopies' },
				{ view: 'text', label: 'Pages', labelWidth: 130, width: 310, labelAlign: 'right', name: 'numberOfPages' },
				{ view: 'datepicker', label: 'Year of publication', labelWidth: 130, width: 310, labelAlign: 'right', type: 'year', format: '%Y', name: 'yearOfPublication' },
				{ view: 'text', label: 'Cover photo', labelWidth: 130, width: 310, labelAlign: 'right', name: 'coverPhoto' }
			]
		};

		const addTextFile = {
			view: 'uploader',
			label: '<i class="fas fa-file-upload"></i> Upload text file',
			localId: 'bookFiles',
			type: 'htmlbutton',
			autosend: false,
			width: 150,
			formData: () => ({
				userId: this.userId,
				bookId: this.bookId
			}),
			accept: 'text/plain, application/pdf, .doc, .docx',
			upload: 'http://localhost:3000/files/upload/text',
			link: 'filesList'
		};

		const filesList = {
			view: 'list',
			type: 'uploader',
			id: 'filesList',
			autoheight:true, 
			borderless:true
		};

		const saveBtn = {
			view: 'button',
			type: 'form',
			label: 'Save',
			width: 80,
			click: () => {
				this.saveForm();
			}
		};

		return {
			view: 'popup',
			position: 'center',
			maxHeight: 550,
			body: {
				view: 'scrollview',
				body: {
					rows: [
						bookCover, 
						bookCard,
						{height: 1},
						{
							paddingY: 10,
							paddingX: 15,
							margin: 10,
							borderless: true,
							cols: [{}, saveBtn, {}]
						}
					]
				}				
			}
		};
	}

	init() {
		this.form = this.$$('bookCardLibrarian');
		this.dtLibrary = $$('dtLibrary');
	}

	showPopup(book) {
		this.clearForm();
		this.isNew = book ? false : true;
		this.bookId = book ? book._id : '';
		toggleElement(!this.isNew, this.$$('bookCover'));

		if (!this.isNew) {
			booksModel.getBook(book._id).then((res) => {
				this.form.setValues(res.data.getBook);
				this.$$('bookCover').setValues(book.coverPhoto || DUMMYCOVER);
			});						
		}		

		this.getRoot().show();	
	}

	async saveForm() {
		const data = this.form.getValues();

		data.numberOfPages = Number.parseInt(data.numberOfPages);
		data.availableCopies = Number.parseInt(data.availableCopies);

		if (this.form.validate()) {
			if (this.isNew) {
				const response = await booksModel.addItem(data);
				if (response) {
					this.dtLibrary.clearAll();
					const newData = await booksModel.getDataFromServer();
					this.dtLibrary.parse(newData.data.getAllBooks);
					this.hideWindow();
				}
			}
			else {
				const book = {...data};

				delete book._id;
				delete book.isFiles;
				delete book.viewedTimes;
				delete book.orderedTimes;

				const response = await booksModel.updateItem(data._id, book);
				if (response) {
					const newData = await booksModel.getDataFromServer();
					this.dtLibrary.clearAll();
					this.dtLibrary.parse(newData.data.getAllBooks);
					this.hideWindow();
				}
			}
		}		
	}

	hideWindow() {
		this.clearForm();
		this.getRoot().hide();
	}

	clearForm (){
		this.form.clearValidation();
		this.form.clear();
		this.$$('bookFiles').files.clearAll();
		this.$$('availableTextFiles').clearAll();
	}
}