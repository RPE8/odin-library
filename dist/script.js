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
    const checkId = generateId();
    const label = document.createElement("label");
    label.textContent = "Read ";
    label.setAttribute("for", checkId);
    const readCheck = document.createElement("input");
    readCheck.setAttribute("type", "checkbox");
    readCheck.setAttribute("id", checkId);
    readCheck.checked = book.read;
    const listItem = document.createElement("li");
    listItem.append(title, author, label, readCheck, removeButton);
    return listItem;
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
books = addBook(books, { title: "test", author: "test", read: false });
books = addBook(books, { title: "test2", author: "test2", read: false });
books = addBook(books, { title: "test3", author: "test3", read: false });
displayBooks(booksList, books);
//# sourceMappingURL=script.js.map