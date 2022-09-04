

type Book = {
	title: string;
	author: string;
	read: boolean
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

books = addBook(books, {title: "test", author: "test", read: false});
books = addBook(books, {title: "test2", author: "test2", read: false});
books = addBook(books, {title: "test3", author: "test3", read: false});
displayBooks(booksList, books);

