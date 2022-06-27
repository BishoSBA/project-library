let myLibrary = [];
const main = document.querySelector(".container");

//book object constructor
function Book(name, author, numOfPages, readStatus) {
	this.title = name;
	this.author = author;
	this.numOfPages = numOfPages;
	this.readStatus = readStatus;
}

//displays a single book, used in a loop
function display(book) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.setAttribute("data-index", myLibrary.indexOf(book));
	main.appendChild(card);

	const title = document.createElement("h3");
	title.textContent = `Title: ${book.title}`;
	card.append(title);

	const author = document.createElement("p");
	author.textContent = `Author: ${book.author}`;
	card.append(author);

	const numOfPages = document.createElement("p");
	numOfPages.textContent = `No of pages: ${book.numOfPages}`;
	card.append(numOfPages);

	const readLabel = document.createElement("label");
	readLabel.classList.add("switch");

	card.append(title, author, numOfPages, readLabel);

	const readInput = document.createElement("input");
	readInput.setAttribute("type", "checkbox");
	const readSpan = document.createElement("span");
	readSpan.classList.add("slider", "round");

	readLabel.append(readInput, readSpan);

	if (book.readStatus) {
		readInput.click();
	}

	const removeBtn = document.createElement("button");
	removeBtn.textContent = "remove book";
	removeBtn.onclick = (e) => {
		const card = e.target.parentNode;
		removeBook(card.getAttribute("data-index"));
	};
	card.append(removeBtn);
}

//adds a book to myLibrary array
function addBookToLibrary(book) {
	if (myLibrary.includes(book)) return;
	myLibrary.push(book);
	update();
}

function removeBook(index) {
	delete myLibrary[index];
	update();
}

//updates list of shown books from myLibrary
function update() {
	main.textContent = "";
	myLibrary.forEach(display);
}

const btn = document.querySelector(".add-book");
const modal = document.querySelector(".modal-form");
const closeBtn = document.querySelector(".close");
const formBtn = document.getElementById("btn-submit");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	modal.style.display = "none";

	let title = form.title.value;
	let author = form.author.value;
	let numOfPages = form.pages.value;
	let readStatus = form.readStatus.checked;

	const bookToAdd = new Book(title, author, numOfPages, readStatus);
	addBookToLibrary(bookToAdd);

	form.reset();
});

const a = new Book("BookA", "Anwar", 100, "Already read");
const b = new Book("BookB", "Bisho", 200, "Not read yet");
const c = new Book("BookA", "Anwar", 100, "Already read");
const d = new Book("BookB", "Bisho", 200, "Not read yet");

addBookToLibrary(a);
addBookToLibrary(b);
addBookToLibrary(c);
addBookToLibrary(d);

//show the modal on button click
btn.onclick = () => {
	modal.style.display = "block";
	form.title.focus();
};

//close the btn
closeBtn.onclick = () => {
	modal.style.display = "none";
};

//close modal window if clicked out of it
window.onclick = (e) => {
	if (e.target == modal) {
		modal.style.display = "none";
	}
};
