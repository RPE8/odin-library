

type Book = {
	title: string;
	author: string;
	read: boolean;
	id: BookId;
}

type NumberGenerator = (start: number | undefined) => Generator<number>;
type BookId = string;
type IdGenerator = () => BookId;
type BookAdder = (books: Book[], book: Book) => Book[];
type BookRemover = (books: Book[], book: Book | BookId) => Book[];
type BookFinder = (books: Book[], book: Book | BookId) => Book | undefined;
type BooksList = HTMLElement | null;
type BooksDisplayer = (list: BooksList, books: Book[]) => void;
type BookDisplayItemCreator = (book: Book) => HTMLLIElement;
type ListItemCreator = (childs: Node[]) => HTMLLIElement; 

function* numberGenrator(start = 0): Generator {
	let index = start;
  while (true)
    yield index++;
}

const generateId: IdGenerator = () => {
	return `id${idGenerator.next().value}`;
}

const booksList: BooksList = document.getElementById("booksList");
let books: Book[] = [];
const idGenerator = numberGenrator();


const findBook: BookFinder = (books, book2Find) => books.find((book) => {
	if (typeof book2Find === "string") return book2Find === book.id;
	return book2Find === book;
});

const removeBook: BookRemover = (books, book2Delete) => books.filter((book) => {
	if (typeof book2Delete === "string") return book2Delete !== book.id;

	return book2Delete !== book;
});

const addBook: BookAdder = (books, book) => [...books, book];
const createBookDisplayItem: BookDisplayItemCreator = (book) => {
		const template = document.createElement("template");
		template.innerHTML = `<li class="books-section__list-item list-item" data-id="${book.id}">
			<h1 class="books-section__title title">${book.title}</h1>
			<h2 class="books-section__author author">${book.author}</h2>
			<div class="books-section__buttons-container">
				<button class="books-section__read-button book-button book-button--${book.read ? "read" : "unread"}">${book.read ? "Read" : "Not Read"}</button>
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
		books = removeBook(books, id);
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

		const book = findBook(books, id);

		if (!book) {
			return;
		}
		
		book.read = !book.read;

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
	displayBooks(booksList, books);
}

const addButton = document.querySelector(".dialog__ok")

books = addBook(books, {title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque nobis, sit sapiente quaerat doloribus ipsum odio tempore rem sint deserunt.", author: "test", read: false, id: generateId()});
books = addBook(books, {title: "test2", author: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, sequi.", read: false, id: generateId()});
books = addBook(books, {title: "Lorem ipsum dolor sit.", author: "test3", read: true, id: generateId()});
displayBooks(booksList, books);

