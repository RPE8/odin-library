

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

const addBook: BookAdder = (books, book) => [...books, book];
const createBookDisplayItem: BookDisplayItemCreator = (book) => {
		const template = document.createElement("template");
		template.innerHTML = `<li class="books-section__list-item list-item" data-id="${book.id}">
			<h1 class="books-section__title title">${book.title}</h1>
			<h2 class="books-section__author author">${book.author}</h2>
			<button class="books-section__read-button button ${book.read ? "read" : "unread"}">Read</button>
			<button class="books-section__remove-button button>Remove</button>
		</li>`

		return template.content.firstChild as HTMLLIElement;
}

const displayBooks: BooksDisplayer = (list, books) => {
	if (!list || !Array.isArray(books)) {
		console.log("err");
		return;
	}

	list.append(...books.reduce((items: HTMLLIElement[], book: Book): HTMLLIElement[] => {
		items.push(createBookDisplayItem(book))
		return items;
	}, []));
}

const updateBooksList = () => {
	booksList?.replaceChildren();
	displayBooks(booksList, books);
}

books = addBook(books, {title: "test", author: "test", read: false, id: generateId()});
books = addBook(books, {title: "test2", author: "test2", read: false, id: generateId()});
books = addBook(books, {title: "test3", author: "test3", read: false, id: generateId()});
displayBooks(booksList, books);

