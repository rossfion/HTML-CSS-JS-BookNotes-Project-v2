//console.log(books)

let filteredBooks = [...books];

const booksContainer = document.querySelector('.books-container');

const displayBooks = () => {
    if (filteredBooks.length < 1) {
        booksContainer.innerHTML = `<h6>Sorry, no books matched your search</h6>`;
        return;
    }

    booksContainer.innerHTML = filteredBooks.map(({ id, book_title, book_cover_image, publication_year }) => {
        // can also do this
        //const{id, book_title, image} = book;
        return `<article class="book" data-id="${id}">
          <img
            src="${book_cover_image}"
            class="book-img img"
            alt="${book_title}"
          />
          <footer>
            <h5 class="book-name">${book_title}</h5>
            <span class="book-publication-year">${publication_year}</span>
          </footer>
        </article>`;
        console.log(book)
    }).join("");
    //console.log(booksContainer)

};
displayBooks();

// Text Filter

const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
    const inputValue = searchInput.value;
    //console.log(inputValue);
    filteredBooks = books.filter((book) => {
        return book.book_title.toLowerCase().includes(inputValue) || book.publication_year.toLowerCase().includes(inputValue);
    });
    displayBooks();
});
//   console.log(
//   books.filter((book) => {
//     return book.book_title.toLowerCase().includes('');
//   })
// );

// Filter Buttons

const categoriesDOM = document.querySelector('.categories');

const displayButtons = () => {
    const buttons = [
        'all',
        ...new Set(books.map((book) => book.category)),
    ];
    // console.log(buttons);
    categoriesDOM.innerHTML = buttons
        .map((category) => {
            return `<button class='category-btn' data-id="${category}">${category}</button>`;
        })
        .join('');
};

displayButtons();

categoriesDOM.addEventListener('click', (e) => {
    const el = e.target;
    if (el.classList.contains('category-btn')) {
        if (el.dataset.id === 'all') {
            filteredBooks = [...books];
        } else {
            filteredBooks = books.filter((book) => {
                return book.category === el.dataset.id;
            });
        }
        searchInput.value = '';
        displayBooks();
    }
});
