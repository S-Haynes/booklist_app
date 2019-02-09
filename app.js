class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Handles all UI changes
class UI {
  static displayBooks() {
    const books = Store.getBooks();

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
  }

  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector("#form-section");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
  }

  static clearFields() {
    document.querySelectorAll(".field").forEach(field => (field.value = ""));
  }

  static clearAlerts() {
    if (document.querySelector(".alert")) {
      document.querySelector(".alert").remove();
    }
  }
}

// Event Listeners
document.querySelector("#book-submit").addEventListener("click", e => {
  // prevent page reload
  e.preventDefault();

  // clear any previous alerts
  UI.clearAlerts();

  // get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // validate form values
  if (title === "" || author === "" || isbn === "") {
    // show failure message
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    // create a new book
    const book = new Book(title, author, isbn);

    // add book to UI
    UI.addBookToList(book);

    // add book to store
    Store.addBook(book);

    // clear search fields
    UI.clearFields();

    // show success message
    UI.showAlert("Book has successfully been added", "success");
  }
});

// Display books on page load
document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Remove a book
document.querySelector("#book-list").addEventListener("click", e => {
  UI.clearAlerts();

  // remove book from UI
  UI.deleteBook(e.target);

  //remove book from storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert("Book Removed", "success");
});
