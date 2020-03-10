import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Query {
        getBooks: [Book]
    }

    type Book {
        _id: ID
        coverPhoto: String
        bookTitle: String
        numberOfPages: Int
        authorName: String
        publishingHouse: String
	    countryOfPublication: String
        genres: String
        availableCopies: Int
        yearOfPublication: String
        isFiles: Boolean
        viewedTimes: Int
        orderedTimes: Int
    }

    input BookInput {
        coverPhoto: String
        bookTitle: String
        numberOfPages: Int
        authorName: String
        publishingHouse: String
	    countryOfPublication: String
        genres: String
        availableCopies: Int
        yearOfPublication: String
    }

    type Mutation {
        addBook(input: BookInput): Book
    }
`);

export default schema;
