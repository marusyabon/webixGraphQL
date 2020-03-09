import {JetView} from 'webix-jet';
import likesModel from '../models/likes';
import {toggleElement} from '../scripts'; 
import {DUMMYCOVER} from '../consts'; 
import booksModel from '../models/books';
import filesModel from '../models/files';
import ordersModel from '../models/orders';

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
			localId: 'bookCardReader',			
			view: 'form',
			elements: [
				{ view: 'text', label: 'Title', labelWidth: 130, width: 310, labelAlign: 'right', name: 'bookTitle', readonly: true },
				{ view: 'text', label: 'Author', labelWidth: 130, width: 310, labelAlign: 'right', name: 'authorName', readonly: true },
				{ view: 'text', label: 'Genres', labelWidth: 130, width: 310, labelAlign: 'right', name: 'genres', readonly: true },
				{ view: 'text', label: 'Country', labelWidth: 130, width: 310, labelAlign: 'right', name: 'countryOfPublication', readonly: true },
				{ view: 'text', label: 'Publishing house', labelWidth: 130, width: 310, labelAlign: 'right', name: 'publishingHouse', readonly: true },
				{ view: 'text', label: 'Available copies', labelWidth: 130, width: 310, labelAlign: 'right', name: 'availableCopies', readonly: true },
				{ view: 'text', label: 'Pages', labelWidth: 130, width: 310, labelAlign: 'right', name: 'numberOfPages', readonly: true }
			]			
		};

		const availableTextFiles = {
			view: 'activeList',
			localId: 'availableTextFiles',
			template: '#name#<span class="list_button"><i class = "fas fa-download"></i></span>',
			on: {
				onItemClick: (id) => {
					const bookName = this.$$('availableTextFiles').getItem(id).name;

					filesModel.downloadItem(id).then((res) => {
						webix.html.download(res, bookName);
					});
				}
			}
		};

		const availableAudioFiles = {
			view: 'activeList',
			localId: 'availableAudioFiles',
			type:{
				height:100
			},
			template: "#name#<audio controls preload='metadata'><source src='http://localhost:3000/audio/#id#' type='audio/mpeg'></audio>"
		};

		const orderBook = {
			view: 'button',
			localId: 'orderBook',
			type: 'htmlbutton',
			label: '<i class="far fa-hand-paper"></i> Order',
			width: 100,
			click: () => { 
				this.orderBook();
			}
		};

		const downloadBook = {
			view: 'button',
			localId: 'downloadBook',
			type: 'icon',
			icon: 'fas fa-download',
			width: 60,
			click: () => { 
				this.orderBook();
			}
		};

		const likeBook = {
			view: 'button',
			localId: 'likeButton',
			css: 'like_button',
			type: 'icon', 
			icon: 'far fa-heart',
			width: 45,
			click: () => { 
				this.likeBook();
			}
		};

		return {
			view: 'popup',
			position:'center',
			maxHeight: 550,
			body:{
				view: 'scrollview',
				body: {
					rows: [
						bookCover, bookCard, availableTextFiles, availableAudioFiles,
						{
							paddingY: 10,
							paddingX: 15,
							margin: 10,
							cols: [
								orderBook, downloadBook, {}, likeBook
							]
						}
					] 
				}
			}
		};
	}
	
	showPopup(id) {
		this.likeButton = this.$$('likeButton');
		this.form = this.$$('bookCardReader');
		this.filesList = this.$$('availableTextFiles');
		this.audiosList = this.$$('availableAudioFiles');
		this.orderBtn = this.$$('orderBook');
		this.userId = this.getParam('id', true);
		this.bookCover = this.$$('bookCover');

		booksModel.getBook(id).then((bookData) => {
			const book = bookData.json();

			this.book = book;
			this.bookId = book.id;

			this.clearForm();

			this.form.setValues(book);
			this.bookCover.setValues(book.coverPhoto || DUMMYCOVER);
			this.likeButton.define('badge', book.count_likes || '0');

			const filesArr = book.files;
			const textFiles = [];
			const audioFiles = [];

			filesArr.forEach((file) => {
				switch(file.dataType) {
					case 'text': 
						textFiles.push(file);
						break;
					case 'audio': 
						audioFiles.push(file);
						break;
				}
			});
			this.filesList.parse(textFiles);
			this.audiosList.parse(audioFiles);

			toggleElement(textFiles.length, this.$$('downloadBook'));
			toggleElement(book.availableCopies, this.$$('orderBook'));
			
			this.toggleLike(book.userId == this.userId);
			this.toggleOrder(book.orderDate);
	
			this.getRoot().show();			
			
			let audioRecords = document.getElementsByTagName('audio');
			audioRecords = Array.from(audioRecords);

			audioRecords.forEach((el) => {
				el.addEventListener('seeked', function() {
					log(this.currentTime);
				});
			});
		});
	}

	orderBook() {
		const order = {
			userId: this.userId,
			bookId: this.bookId,
			orderDate: new Date()
		};

		ordersModel.addItem(order).then(() => {
			this.setOrderedVal();
		});
	}

	setOrderedVal() {
		this.orderBtn.define('label', 'Ordered'); 
		this.orderBtn.refresh();
		this.orderBtn.disable();
	}

	unsetOrderedVal() {
		this.orderBtn.define('label', '<i class="far fa-hand-paper"></i> Order');  
		this.orderBtn.refresh();
		this.orderBtn.enable();
	}

	toggleOrder(ordered) {
		if(ordered) {
			this.setOrderedVal();
		}
		else {
			this.unsetOrderedVal();
		}
	}

	likeBook() {
		if(this.book.userId == this.userId) {
			likesModel.removeLike(this.userId, this.bookId).then(() => {
				this.unsetLike();
			});
		}
		else {
			likesModel.addLike(this.userId, this.bookId).then(() => {
				this.setLike();
			});
		}	
	}	

	toggleLike(condition) {
		if(condition) {
			this.setLike();
		}
		else {
			this.unsetLike();
		}
	}

	setLike() {
		this.likeButton.define('icon', 'fas fa-heart');
		this.likeButton.refresh();
	}

	unsetLike() {
		this.likeButton.define('icon', 'far fa-heart');
		this.likeButton.refresh();
	}

	clearForm() {
		this.form.clear();
		this.filesList.clearAll();
		this.$$('availableTextFiles').clearAll();
		this.$$('availableAudioFiles').clearAll();
	}
}