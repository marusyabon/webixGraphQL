import {JetView} from 'webix-jet';
import BookCard from './bookCard';

export default class Library extends JetView {
	config() {
		const header = {
			type: 'header',
			template: '<i class="fas fa-book"></i> List of books',
			css: 'center page_header'
		};

		const dtable = {
			view: 'datatable',
			id: 'dt_library',
			select: true,
			columns: [
				{
					id: 'id',
					hidden: true,
				},
				{
					id: 'book_title',
					sort: 'text',
					fillspace: 1,
					header: ['Title', {content: 'textFilter'}]
				},
				{
					id: 'author_name',
					sort: 'text',
					fillspace: 1,
					header: ['Author', {content: 'textFilter'}]
				},
				{
					id: 'genres',
					sort: 'text',
					width: 80,
					css: 'center',
					header: ['Genres', {content: 'selectFilter'}]
				},
				// {
				// 	id: 'country_of_publication',
				// 	sort: 'text',
				// 	width: 80,
				// 	css: 'center',
				// 	header: ['Country', {content: 'selectFilter'}]
				// },
				{
					id: 'year_of_publication',
					sort: 'date',
					width: 80,
					css: 'center',
					format: webix.Date.dateToStr("%Y"),
					header: ['Year', {content: 'dateRangeFilter'}]
				},
				// {
				// 	id: 'available_copies',
				// 	width: 80,
				// 	css: 'center',
				// 	header: 'Available'
				// },
				// {
				// 	id: 'ebook',
				// 	header: ['eBook', {content:"selectFilter"}],
				// 	width: 70,
				// 	template: (obj) => {
				// 		return obj.ebook==='yes' ? '<i class="fas fa-check"></i>' : ''
				// 	}					
				// },
				{
					id: 'viewCol',
					header: 'View',
					css: 'center',
					width: 50,
					template: '<i class="fas fa-eye"></i>'
				}
			],
			onClick: {
				'fa-eye': (e, id) => {
					this.showBookCard(id);
				},
				'fa-edit': (e, id) => {
					this.showBookCard(id);
				},
				'fa-trash': (e, id) => {
					this.removeBook(id);
				}
			}
		};

		return {
			rows: [header, dtable]
		};
	}

	async init() {
		this.grid = $$('dt_library');
		await this.getData();
		await this.getFiles();
		this.checkFiles();		

		this.grid.parse(this.booksArr);
		this._bookCard = this.ui(BookCard);
	}

	async getData() {		
		const dbData = await booksModel.getDataFromServer();
		let booksArr = dbData.json();

		booksArr = booksArr.map((el) => {
			el.year_of_publication = new Date(el.year_of_publication);
			return el;
		});
		this.booksArr = booksArr;
	}

	async getFiles() {
		const dbData = await filesModel.getDataFromServer();
		this.filesArr = dbData.json();						
	}

	checkFiles() {
		this.booksArr.forEach((book, i) => {
			const isFiles = this.filesArr.find((el) => el.book_id === book.id);
			
			if(isFiles) {
				this.booksArr[i].ebook = 'yes';
			}
			else {
				this.booksArr[i].ebook = 'no';
			}
		});
	}

	showBookCard(id) {
		const book = this.booksArr.find(el => el.id == id);
		this._bookCard.showPopup(book);
	}
}