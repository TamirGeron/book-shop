'use strict'

var gBooks;

function onInit() {
    _createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(book => `
    <tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}</td>   
    <td><button onClick="onReadBook('${book.id}')">Read</button></td>
    <td><button onClick="onUpdateBook('${book.id}')">Update</button></td>
    <td><button onClick="onRemoveBook('${book.id}')">Delete</button></td>    
    </tr>
    `)
    document.querySelector('.books-container').innerHTML = strHtmls.join('');
}

function onAddBook(ev) {
    // var name = prompt('Enter book name');
    // var price = prompt('Enter price');

    const name = ev.target[0].value
    const price = ev.target[1].value

    if (!name || !price) return;
    var book = addBook(name, price)
    renderBooks()
    flashMsg(`Book Added ${book.name}`)
}

function onRemoveBook(bookId) {
    deleteBook(bookId)
    renderBooks()
    flashMsg(`Book Deleted`)
}

function onUpdateBook(bookId) {
    var price = prompt('Enter price');
    if (!price) return;
    var book = updateBook(bookId, price)
    renderBooks()
    flashMsg(`Book Update ${book.name}`)
}

function onReadBook(bookId) {
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h2').innerText = book.id
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = makeLorem()
    elModal.querySelector('.input').value = book.rate;
    elModal.classList.add('open')
}

function getBookById(bookId) {
    const book = gBooks.find(book => +bookId === book.id)
    return book
}


function onCloseModal() {
    document.querySelector('.modal').classList.remove('open')
}

function onRate(num) {
    var elId = document.querySelector('.modal h2')
    var curId = +elId.innerText
    var rate = updateRate(num, curId)
    var elRate = document.querySelector('.modal .input')
    elRate.value = rate;
}