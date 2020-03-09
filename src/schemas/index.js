import mongoose from 'mongoose';
import Book from '../models/books';

import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Query {
        getBooks: [Book]
    }

    type Book {
        _id: ID
        bookTitle: String
        numberOfPages: Int
        authorName: String
        genres: String
        availableCopies: Int
    }

    input BookInput {
        bookTitle: String
        numberOfPages: Int
        authorName: String
        genres: String
        availableCopies: Int
    }

    type Mutation {
        addBook(input: BookInput): Book
    }
`);

export default schema;