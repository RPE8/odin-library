import {Book, BookId} from "./book.js";

interface ILibrary {
	books: Book[];
	findBook: BookFinder;
	removeBook: BookRemover;
	addBook: BookAdder;
	getBooks: BooksGetter;
	setBooks: BooksSetter;
}

type BookAdder = (book: Book) => Library;
type BookRemover = (book: Book | BookId) => Library;
type BookFinder = (book: Book | BookId) => Book | undefined;
type BooksSetter = Setter<Book[], Library>;
type BooksGetter = Getter<Book[]>;
type Setter<T, N> = (value: T) => N;
type Getter<T> = () => T;

class Library implements ILibrary{
	books: Book[];

	constructor(books: Book[] = []) {
		this.books = books;
	}

	setBooks = (books: Book[]) => {
		this.books = books;
		return this;
	}

	getBooks() {
		return this.books;
	}

	addBook: BookAdder = (book) => {
		this.books = [...this.books, book];
		return this;
	}

	removeBook: BookRemover = (book2Delete) => {
		this.books = this.books.filter((book) => {
			if (typeof book2Delete === "string") return book2Delete !== book.id;
		
			return book2Delete !== book;
		});

		return this;
	}

	findBook: BookFinder = (book2Find) => this.books.find((book) => {
		if (typeof book2Find === "string") return book2Find === book.id;
		return book2Find === book;
	})
	
}

export {Library};