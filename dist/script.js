function* numberGenrator(start = 0) {
    let index = start;
    while (true)
        yield index++;
}
const generateId = () => {
    return `id${idGenerator.next().value}`;
};
const booksList = document.getElementById("booksList");
let books = [];
const idGenerator = numberGenrator();
const addBook = (books, book) => [...books, book];
const createBookDisplayItem = (book) => {
    const template = document.createElement("template");
    template.innerHTML = `<li class="books-section__list-item list-item" data-id="${book.id}">
			<h1 class="books-section__title title">${book.title}</h1>
			<h2 class="books-section__author author">${book.author}</h2>
			<button class="books-section__read-button button ${book.read ? "read" : "unread"}">Read</button>
			<button class="books-section__remove-button button>Remove</button>
		</li>`;
    return template.content.firstChild;
};
const displayBooks = (list, books) => {
    if (!list || !Array.isArray(books)) {
        console.log("err");
        return;
    }
    list.append(...books.reduce((items, book) => {
        items.push(createBookDisplayItem(book));
        return items;
    }, []));
};
const updateBooksList = () => {
    booksList?.replaceChildren();
    displayBooks(booksList, books);
};
books = addBook(books, { title: "test", author: "test", read: false, id: generateId() });
books = addBook(books, { title: "test2", author: "test2", read: false, id: generateId() });
books = addBook(books, { title: "test3", author: "test3", read: false, id: generateId() });
displayBooks(booksList, books);
//# sourceMappingURL=script.js.map