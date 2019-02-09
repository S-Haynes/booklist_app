class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Handles all UI changes
class UI {
  static displayBooks() {
    const tempBooks = [
      {
        title: "Life is good",
        author: "Bob Dylan",
        isbn: "345435"
      },
      {
        title: "The bad guy",
        author: "Joe Schmoe",
        isbn: "88865"
      },
      {
        title: "You must be hella bored",
        author: "Someone cool",
        isbn: "543543543"
      }
    ];

    const books = tempBooks;

    books.forEach(book => UI.addBookToList(book));
  }

  // Add book to list and display
  static addBookToList(book) {
    const list = document.querySelector("#book-list");
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);

    // clear search fields
    UI.clearFields();
  }

  static deleteBook(isbn) {}

  static clearFields() {
    document.querySelectorAll(".field").forEach(field => (field.value = ""));
  }
}

// Event Listeners
document.querySelector("#book-submit").addEventListener("click", e => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  const book = new Book(title, author, isbn);

  UI.addBookToList(book);
});

// Display books on page load
document.addEventListener("DOMContentLoaded", UI.displayBooks);
