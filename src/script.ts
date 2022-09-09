import {Library} from "./library.js";
import {Book} from "./book.js";


type BooksList = HTMLElement | null;
type BooksDisplayer = (list: BooksList, books: Book[]) => void;
type BookDisplayItemCreator = (book: Book) => HTMLLIElement;
type ListItemCreator = (childs: Node[]) => HTMLLIElement; 


const booksList: BooksList = document.getElementById("booksList");
const newBookButton = document.querySelector(".add-section__submit-button");
const dialog = document.querySelector(".dialog");
const dialogOverlay = document.querySelector(".dialog-overlay");
const addButton = document.querySelector(".dialog__ok");
const titleInput = document.querySelector(".dialog__title") as HTMLInputElement;
const authorInput = document.querySelector(".dialog__author") as HTMLInputElement;
const finishedCheckbox = document.querySelector(".dialog__read") as HTMLInputElement;
const form = document.querySelector(".dialog__form") as HTMLFormElement;

const library = new Library();

const createBookDisplayItem: BookDisplayItemCreator = (book) => {
	const template = document.createElement("template");
	template.innerHTML = `<li class="books-section__list-item list-item" data-id="${book.getId()}">
		<h1 class="books-section__title title">${book.getTitle()}</h1>
		<h2 class="books-section__author author">${book.getAuthor()}</h2>
		<div class="books-section__buttons-container">
			<button class="books-section__read-button book-button book-button--${book.getRead() ? "read" : "unread"}">${book.getRead() ? "Read" : "Not Read"}</button>
			<button class="books-section__remove-button book-button">Remove</button>
		</div>
	</li>`

	return template.content.firstChild as HTMLLIElement;
}

const handleBookRemove = (event: Event): void => {
	const target = event.target as HTMLElement;
	const currentTarget = event.currentTarget as HTMLElement;
	const classList = target.classList;
	const id = currentTarget.dataset.id
	if (!id) return;
	if (classList.contains("books-section__remove-button")) {
		library.removeBook(id);
		updateBooksList();
		return;
	}
	if (classList.contains("books-section__read-button")) {
		if (classList.contains("book-button--read")) {
			classList.remove("read");
			classList.add("unread");
			target.textContent = "Not Read";
		} else {
			classList.remove("unread");
			classList.add("read");
			target.textContent = "Read";
		}

		const book = library.findBook(id);

		if (!book) {
			return;
		}
		
		book.setRead(!book.read);

		updateBooksList();
		return;
	}
}

const displayBooks: BooksDisplayer = (list, books) => {
	if (!list || !Array.isArray(books)) {
		console.log("err");
		return;
	}

	list.append(...books.reduce((items: HTMLLIElement[], book: Book): HTMLLIElement[] => {
		const listItem = createBookDisplayItem(book);
		listItem.addEventListener("click", handleBookRemove)
		items.push(listItem);
		return items;
	}, []));
}

const updateBooksList = () => {
	booksList?.replaceChildren();
	displayBooks(booksList, library.getBooks());
}

const openAddDialog = (): void => {
	dialog?.classList.toggle("dialog--closed");
	dialogOverlay?.classList.toggle("dialog-overlay--closed");
}

const closeAddDialog = (): void => {
	dialog?.classList.toggle("dialog--closed");
	dialogOverlay?.classList.toggle("dialog-overlay--closed");
	titleInput.value = "";
	authorInput.value = "";
	finishedCheckbox.checked = false;
}

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
		const book = new Book(titleInput.value, authorInput.value, finishedCheckbox.checked, Book.generateId())
		library.addBook(book);
		updateBooksList();
		closeAddDialog();
	}
});

document.addEventListener('keyup', function (event) {
  if ( event.key === "Escape" )   {
		closeAddDialog();
  }
})

library.addBook(new Book(
	"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis, sit sapiente quaerat doloribus ipsum odio tempore rem sint deserunt.", 
	"test", 
	false,
	Book.generateId()
));

updateBooksList();

