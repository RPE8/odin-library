class Library {
    constructor(books = []) {
        this.setBooks = (books) => {
            this.books = books;
            return this;
        };
        this.addBook = (book) => {
            this.books = [...this.books, book];
            return this;
        };
        this.removeBook = (book2Delete) => {
            this.books = this.books.filter((book) => {
                if (typeof book2Delete === "string")
                    return book2Delete !== book.id;
                return book2Delete !== book;
            });
            return this;
        };
        this.findBook = (book2Find) => this.books.find((book) => {
            if (typeof book2Find === "string")
                return book2Find === book.id;
            return book2Find === book;
        });
        this.books = books;
    }
    getBooks() {
        return this.books;
    }
}
export { Library };
//# sourceMappingURL=library.js.map