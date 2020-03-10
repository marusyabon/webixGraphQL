import {Schema} from 'mongoose';
import {GraphQLScalarType} from 'graphql';
import {Kind} from 'graphql/language';
import Book from '../models/books';

const resolvers = {
    getAllBooks: async () => {
        const books = await Book.find({}).lean();
        return books;
    },

    getBook: async (bookID) => {
        const result = await Book.find({id: Schema.ObjectId(bookID)}).lean();
        return result[0];
    },

    addBook: ({input}) => {
        const book = new Book(input);
        book.save();
        return book;
    },

    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    })
};

export default resolvers;
