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
const removeBook = (books, book2Delete) => books.filter((book) => {
    if (typeof book2Delete === "string")
        return book2Delete !== book.id;
    return book2Delete !== book;
});
const addBook = (books, book) => [...books, book];
const createBookDisplayItem = (book) => {
    const template = document.createElement("template");
    template.innerHTML = `<li class="books-section__list-item list-item" data-id="${book.id}">
			<h1 class="books-section__title title">${book.title}</h1>
			<h2 class="books-section__author author">${book.author}</h2>
			<div class="books-section__buttons-container">
				<button class="books-section__read-button book-button book-button--${book.read ? "read" : "unread"}">${book.read ? "Read" : "Not Read"}</button>
				<button class="books-section__remove-button book-button">Remove</button>
			</div>
		</li>`;
    return template.content.firstChild;
};
const handleBookRemove = (event) => {
    const target = event.target;
    const currentTarget = event.currentTarget;
    const classList = target.classList;
    if (target.classList.contains("books-section__remove-button")) {
        if (!currentTarget.dataset.id)
            return;
        books = removeBook(books, currentTarget.dataset.id);
        updateBooksList();
        return;
    }
    if (target.classList.contains("books-section__read-button")) {
        console.log(target);
        return;
    }
};
const displayBooks = (list, books) => {
    if (!list || !Array.isArray(books)) {
        console.log("err");
        return;
    }
    list.append(...books.reduce((items, book) => {
        const listItem = createBookDisplayItem(book);
        listItem.addEventListener("click", handleBookRemove);
        items.push(listItem);
        return items;
    }, []));
};
const updateBooksList = () => {
    booksList?.replaceChildren();
    displayBooks(booksList, books);
};
books = addBook(books, { title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis, sit sapiente quaerat doloribus ipsum odio tempore rem sint deserunt.", author: "test", read: false, id: generateId() });
books = addBook(books, { title: "test2", author: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, sequi.", read: false, id: generateId() });
books = addBook(books, { title: "Lorem ipsum dolor sit.", author: "test3", read: true, id: generateId() });
displayBooks(booksList, books);
//# sourceMappingURL=script.js.map