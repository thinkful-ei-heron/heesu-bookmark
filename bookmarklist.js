import api from './api.js';
import store from './store.js';

function generateBookmarkForm() {
    return`
    <form id="bookmark-form">
    <label for="title">Title:
        <input class="bookmark-title-input" name="title" type="text" required/>
    </label>
    <br />
    <label for="url">URL:
        <input class="bookmark-url-input" name="url" type="text" placeholder="must include http://" required/>
    </label>
    <br />
    <label for="desc">Description:
        <input class="bookmark-desc-input" name="desc" type="text" required />
    </label>
    <br />
    <label for="rating">Rating:
        <input class="bookmark-rating-input" name="rating" type="number" placeholder="1-5" min="1" max="5" required />
    </label>
    <br />
    <button type="submit">Submit</button>
    </form>
    `
};

function generateItemElement(item) {
    if (!item.expanded) {
        return `
            <li class="bookmark-id" data-item-id="${item.id}">
                <p id="title">${item.title}</p>
                <p>Rating: ${item.rating}</p>
            </li>`
    }
    else {
        return `
            <li class="bookmark-id" data-item-id="${item.id}">
                <p id="title">${item.title}</p>
                <p>Rating: ${item.rating}</p>
                <p>Link: <a href="${item.url}">${item.url}</a></p>
                <p>Description: <br> ${item.desc}</p>
                <button class="delete-bookmark-button"><span class="button-label">DELETE</span></button>
            </li>`;
    }
};

function generateBookmarkItemString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
};

function render() {
    console.log('render working');
    let items = store.bookmarks;
    $('.form-container').html(generateBookmarkForm());

    if(store.adding){
        $('.form-container').show();
    } else {
        $('.form-container').hide();
    }

    if (store.filterRating >= 1) {
        items = store.bookmarks.filter(bookmark => bookmark.rating >= store.filterRating);
    }

    const bookmarklistItemsString = generateBookmarkItemString(items);
    $('.bookmark-list').html(bookmarklistItemsString);
};

function handleBookmarkSubmit() {
    $('.form-container').on('submit', '#bookmark-form', event => {
        event.preventDefault();
        console.log("working");
        const bookmarkTitle = $('.bookmark-title-input').val();
        $('.bookmark-title-input').val('');
        const bookmarkURL = $('.bookmark-url-input').val();
        $('.bookmark-url-input').val('');
        const bookmarkDesc = $('.bookmark-desc-input').val();
        $('.bookmark-desc-input').val('');
        const bookmarkRating = parseInt($('.bookmark-rating-input').val(), 10);
        $('.bookmark-rating-input').val('');

        api.createItem(bookmarkTitle, bookmarkURL, bookmarkDesc, bookmarkRating)
            .then(items => {
                store.addItems(items);
                store.toggleAdding();
                render();
            })
            .catch(
                err => {
                console.log(err)
                store.setError(err);
                render();
            });
    });
};

function serializeJson(form) {
    const formData = new FormData(form);
    const obj = {};
    formData.forEach((val, name) => obj[name] = val);
    return JSON.stringify(obj);
};

$('#contactForm').submit(event => {
    event.preventDefault();
    // These two lines are THE SAME
    // let formElement = document.querySelector("#contactForm");
    let formElement = $('#contactForm')[0];
    // the [0] here selects the native element
    console.log( serializeJson(formElement) );
  
    $('#contactForm').html(`
      <p>Your form submission has been received!</p>
    `);
});

function handleAddBookmarkClick() {
    $('.addBookmark').on('click', function () {
        store.toggleAdding();
        render();
    })
};

function handleDeleteItemClick() {
    $('.bookmark-list').on('click', '.delete-bookmark-button', event => {
        const id = getItemIdFromElement(event.target);
        console.log(id);
        api.deleteItem(id)
            .then(()=> {
                store.findAndDelete(id);
                render();        
        })
    })
};

function generateError(message) {
    return `
        <section class="error-content">
          <button id="cancel-error">X</button>
          <p>${message}</p>
        </section>
      `;
};

function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
};

function getItemIdFromElement(item) {
    return $(item).closest('.bookmark-id').data('item-id');
};

function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
        store.setError(null);
        renderError();
    })
};

function handleRatingFilterClick() {
    $('.min-rating').on('change', function () {
        const selection = parseInt($(this).val(), 10);
        store.filterRating = selection;
        render();
    })
};

function toggleExpandBookmark(title) {
    const foundBookmark = store.bookmarks.find(bookmark => bookmark.title === title);
    foundBookmark.expanded = !foundBookmark.expanded;
    render();
};

function handleBookmarkClick() {
    $('.bookmark-list').on('click', 'li', function (event) {
        const title = $(this).find('#title').text()
        toggleExpandBookmark(title);
        render();
    })
};

function bindEventListeners() {
    handleDeleteItemClick();
    handleCloseError();
    handleBookmarkClick();
    handleAddBookmarkClick()
    handleBookmarkSubmit();
    handleRatingFilterClick();
    generateBookmarkForm();
    renderError();
};

export default {
    render,
    bindEventListeners
};
