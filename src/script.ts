type Book = {
	title: string;
	author: string;
}
type BookAdder = (books: Book[], book: Book) => Book[]; 
type BooksList = HTMLElement | null;
type BooksDisplayer = (list: BooksList, books: Book[]) => void;
type BookDisplayItemCreator = (book: Book) => Node[];
type ListItemCreator = (childs: Node[]) => HTMLLIElement; 


const booksList: BooksList = document.getElementById("booksList");
let books: Book[] = [];

const addBook: BookAdder = (books, book) => [...books, book];
const createBookDisplayItem: BookDisplayItemCreator = (book) => {
		const title = document.createElement("h1");
		title.textContent = book.title;
		const author = document.createElement("h2");
		author.textContent = book.author;

		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.addEventListener("click", (event) => {
			console.log(book, "remove");
		})

		return [title, author, removeButton];
}

const createListItem:ListItemCreator = (childs) => {
	const listItem = document.createElement("li");
	listItem.append(...childs);
	
	return listItem;
}

const displayBooks: BooksDisplayer = (list, books) => {
	if (!list || !Array.isArray(books)) {
		console.log("err");
		return;
	}
	list.append(...books.reduce((items: HTMLLIElement[], book: Book): HTMLLIElement[] => {
		items.push(createListItem(createBookDisplayItem(book)))
		return items;
	}, []));
}

books = addBook(books, {title: "test", author: "test"});
books = addBook(books, {title: "test2", author: "test2"});
books = addBook(books, {title: "test3", author: "test3"});
displayBooks(booksList, books);

