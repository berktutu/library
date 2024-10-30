"use strict";

// Selecting elements
const addBookBtn = document.querySelector(".btn-add");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".close-icon");
const form = document.querySelector(".add-book");
const btnRemove = document.querySelectorAll(".btn-remove");
const booksGrid = document.querySelector(".books-grid");

const cardTitle = document.querySelectorAll(".title");
const cardAuthor = document.querySelectorAll(".author");
const cardPages = document.querySelectorAll(".pages");

const formTitle = document.getElementById("title");
const formAuthor = document.getElementById("author");
const formPages = document.getElementById("pages");
const formRead = document.getElementById("book-read");

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookCard(book) {
  return `<div class="book-card">
          <div class="information-group">
            <p class="book-title">${book.title.trim()}</p>
            <p class="book-author">${book.author.trim()}</p>
            <p class="book-pages">${book.pages.trim()} pages</p>
          </div>
          <div class="btn-group">
            <button class="btn btn-card-read ${
              book.read ? "btn-read" : "btn-not-read"
            }">${book.read ? "Read" : "Not read"}</button>
            <button class="btn btn-remove">Remove</button>
          </div>
        </div>`;
}

const cardButtonRead = document.querySelectorAll(".btn-card-read");

function addBookToLibrary(book) {
  const html = createBookCard(book);
  booksGrid.insertAdjacentHTML("beforeend", html);
  myLibrary.push(book);
  console.log(myLibrary);
}

// Event handler function
function handleEvents() {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const book = new Book(
      formTitle.value,
      formAuthor.value,
      formPages.value,
      formRead.checked
    );

    addBookToLibrary(book);

    formTitle.value = "";
    formAuthor.value = "";
    formPages.value = "";

    modal.style.display = "none";
  });

  addBookBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  modalClose.addEventListener("click", function () {
    modal.style.display = "none";
  });

  if (modal.style.display !== "none") {
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        modal.style.display = "none";
      }
    });
  }

  booksGrid.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-card-read")) {
      e.target.classList.toggle("btn-read");
      e.target.classList.toggle("btn-not-read");
      e.target.textContent = e.target.classList.contains("btn-read")
        ? "Read"
        : "Not read";
    }

    if (e.target.classList.contains("btn-remove")) {
      const bookCard = e.target.closest(".book-card");
      if (bookCard) {
        const bookTitle = bookCard.querySelector(".book-title").textContent;
        const bookAuthor = bookCard.querySelector(".book-author").textContent;

        const index = myLibrary.findIndex(
          (book) => book.title === bookTitle && book.author === bookAuthor
        );
        if (index !== -1) {
          myLibrary.splice(index, 1);
        }
        console.log(myLibrary);
        bookCard.remove();
      }
    }
  });
}
handleEvents();
