type BookId = string;

interface IBook {
	title: string;
	author: string;
	read: boolean;
	id: BookId;
	setTitle: Setter<string, Book>;
	setAuthor: Setter<string, Book>;
	setRead: Setter<boolean, Book>;
	getTitle: Getter<string>;
	getAuthor: Getter<string>;
	getRead: Getter<boolean>;
	getId: Getter<BookId>;
}

type NumberGenerator = (start?: number) => Generator<number>;
type IdGenerator = () => BookId;
type Setter<T, N> = (value: T) => N;
type Getter<T> = () => T;


const numberGenerator: NumberGenerator = function*(start = 0) {
	let index = start;
	while (true)
		yield index++;
}

const idGenerator = numberGenerator();

const generateId: IdGenerator = () => {
	return `id${idGenerator.next().value}`;
}


class Book implements IBook { 
	public static generateId = generateId;

	title: string;
	author: string;
	read: boolean;
	id: BookId;

	constructor(title: string, author: string, read: boolean, id: BookId) {
		[this.title, this.author, this.read, this.id] = [title, author, read, id];
	}

	setTitle = (value: string) => {
		this.title = value;
		return this;
	}

	setAuthor = (value: string) => {
		this.author = value;
		return this;
	}

	setRead = (value: boolean) => {
		this.read = value;
		return this;
	}

	getTitle = () => {
		return this.title;
	}

	getAuthor = () => {
		return this.author;
	}

	getRead = () => {
		return this.read;
	}

	getId = () => {
		return this.id;
	}
}


export {BookId, Book};