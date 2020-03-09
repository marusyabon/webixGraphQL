import Book from '../models/books';

const resolvers = {
    getBooks: async () => {
        const books = await Book.find({});
        return books;
    },

    addBook: ({input}) => {
        const book = new Book(input);
        book.save();
        return book;
    }
};

export default resolvers;