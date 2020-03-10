const bookData = `
    _id
    coverPhoto,
    bookTitle,
    numberOfPages,
    authorName,
    publishingHouse,
    countryOfPublication,
    genres,
    availableCopies,
    yearOfPublication,
    isFiles,
    viewedTimes,
    orderedTimes
`;

const getBookQuery = `query($bookID: ID!) {
    getBook(bookID: $bookID) {
        ${bookData}
    }
}`;

const getAllBooksQuery = `query {
    getAllBooks {
        ${bookData}
    }
}`;

export {getBookQuery, getAllBooksQuery};
