import Book from '../models/books';

const resolvers = {
    getBooks: async (obj, context, info) => {
        const books = await Book.find({});
        return books;
    },

    addBook: ({input}, context, info) => {
        const book = new Book(input);
        book.save();
        return book;
    }
};

export default resolvers;