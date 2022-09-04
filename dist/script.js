const booksList = document.getElementById("booksList");
let books = [];
const addBook = (books, book) => [...books, book];
const createBookDisplayItem = (book) => {
    const title = document.createElement("h1");
    title.textContent = book.title;
    const author = document.createElement("h2");
    author.textContent = book.author;
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", (event) => {
        books = books.filter(currBook => currBook !== book);
        updateBooksList();
    });
    return [title, author, removeButton];
};
const createListItem = (childs) => {
    const listItem = document.createElement("li");
    listItem.append(...childs);
    return listItem;
};
const displayBooks = (list, books) => {
    if (!list || !Array.isArray(books)) {
        console.log("err");
        return;
    }
    list.append(...books.reduce((items, book) => {
        items.push(createListItem(createBookDisplayItem(book)));
        return items;
    }, []));
};
const updateBooksList = () => {
    booksList?.replaceChildren();
    displayBooks(booksList, books);
};
books = addBook(books, { title: "test", author: "test" });
books = addBook(books, { title: "test2", author: "test2" });
books = addBook(books, { title: "test3", author: "test3" });
displayBooks(booksList, books);
//# sourceMappingURL=script.js.map