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
const findBook = (books, book2Find) => books.find((book) => {
    if (typeof book2Find === "string")
        return book2Find === book.id;
    return book2Find === book;
});
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
    const id = currentTarget.dataset.id;
    if (!id)
        return;
    if (classList.contains("books-section__remove-button")) {
        books = removeBook(books, id);
        updateBooksList();
        return;
    }
    if (classList.contains("books-section__read-button")) {
        if (classList.contains("book-button--read")) {
            classList.remove("read");
            classList.add("unread");
            target.textContent = "Not Read";
        }
        else {
            classList.remove("unread");
            classList.add("read");
            target.textContent = "Read";
        }
        const book = findBook(books, id);
        if (!book) {
            return;
        }
        book.read = !book.read;
        updateBooksList();
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
const newBookButton = document.querySelector(".add-section__submit-button");
const dialog = document.querySelector(".dialog");
const dialogOverlay = document.querySelector(".dialog-overlay");
const addButton = document.querySelector(".dialog__ok");
const titleInput = document.querySelector(".dialog__title");
const authorInput = document.querySelector(".dialog__author");
const finishedCheckbox = document.querySelector(".dialog__read");
const form = document.querySelector(".dialog__form");
const openAddDialog = () => {
    dialog?.classList.toggle("dialog--closed");
    dialogOverlay?.classList.toggle("dialog-overlay--closed");
};
const closeAddDialog = () => {
    dialog?.classList.toggle("dialog--closed");
    dialogOverlay?.classList.toggle("dialog-overlay--closed");
    titleInput.value = "";
    authorInput.value = "";
    finishedCheckbox.checked = false;
};
newBookButton?.addEventListener("click", () => {
    openAddDialog();
});
addButton?.addEventListener("click", (event) => {
    event.preventDefault();
    const validity = form.checkValidity();
    form.reportValidity();
    console.log(titleInput?.value);
    console.log(authorInput?.value);
    console.log(finishedCheckbox?.checked);
    if (validity) {
        books = addBook(books, {
            title: titleInput.value,
            author: authorInput.value,
            read: finishedCheckbox.checked,
            id: generateId()
        });
        updateBooksList();
        closeAddDialog();
    }
});
document.addEventListener('keyup', function (event) {
    if (event.key === "Escape") {
        closeAddDialog();
    }
});
books = addBook(books, { title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis, sit sapiente quaerat doloribus ipsum odio tempore rem sint deserunt.", author: "test", read: false, id: generateId() });
books = addBook(books, { title: "test2", author: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, sequi.", read: false, id: generateId() });
books = addBook(books, { title: "Lorem ipsum dolor sit.", author: "test3", read: true, id: generateId() });
displayBooks(booksList, books);
//# sourceMappingURL=script.js.map