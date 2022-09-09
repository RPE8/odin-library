const numberGenerator = function* (start = 0) {
    let index = start;
    while (true)
        yield index++;
};
const idGenerator = numberGenerator();
const generateId = () => {
    return `id${idGenerator.next().value}`;
};
class Book {
    constructor(title, author, read, id) {
        this.setTitle = (value) => {
            this.title = value;
            return this;
        };
        this.setAuthor = (value) => {
            this.author = value;
            return this;
        };
        this.setRead = (value) => {
            this.read = value;
            return this;
        };
        this.getTitle = () => {
            return this.title;
        };
        this.getAuthor = () => {
            return this.author;
        };
        this.getRead = () => {
            return this.read;
        };
        this.getId = () => {
            return this.id;
        };
        [this.title, this.author, this.read, this.id] = [title, author, read, id];
    }
}
Book.generateId = generateId;
export { Book };
//# sourceMappingURL=book.js.map