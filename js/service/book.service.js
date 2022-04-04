'use strict'

const STORAGE_KEY = 'bookDB'

var gIdx = 0

function getBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)
    return gBooks;
}

function deleteBook(bookId) {
    const bookIdx = getBookIndexById(+bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.push(book);
    _saveBooksToStorage();
    return book;
}

function updateBook(bookId, price) {
    var bookIdx = getBookIndexById(+bookId)
    gBooks[bookIdx].price = price
    _saveBooksToStorage();
    return gBooks[bookIdx]
}

function updateRate(num, bookId) {
    var bookIdx = getBookIndexById(bookId)
    var rate = gBooks[bookIdx].rate + num;
    if (rate < 0 || rate > 10) return rate - num;
    gBooks[bookIdx].rate = rate
    _saveBooksToStorage();
    return rate
}

function getBookIndexById(bookId) {
    return gBooks.findIndex(book => bookId === book.id)
}

function _createBook(name, price) {
    return {
        id: ++gIdx,
        name: name,
        price: price,
        rate: 0
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = [];
        books.push(_createBook('Harry Potter', 20))
        books.push(_createBook('Beni Goren', 10))
        books.push(_createBook('Pokemon', 100))
        books.push(_createBook('Dragon Ball', 50))
        books.push(_createBook('Bible', 70))
    }
    gBooks = books;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}