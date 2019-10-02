
import api from './api.js';
import store from './store.js';

//const bookmarkList = (function() {
function handleBookmarkSubmit() {
    $('#bookmark-form').submit(function (event) {
        event.preventDefault();
        const bookmarkTitle = $('.bookmark-title-input').val();
        $('.bookmark-title-input').val('');
        const bookmarkURL = $('.bookmark-url-input').val();
        $('.bookmark-url-input').val('');
        const bookmarkDesc = $('.bookmark-desc-input').val();
        $('.bookmark-desc-input').val('');
        const bookmarkRating = parseInt($('.bookmark-rating-input').val(), 10);
        $('.bookmark-rating-input').val('');

        api.createItem(bookmarkTitle, bookmarkURL, bookmarkDesc, bookmarkRating, response => {
            store.addItem(response);
            render();
        }, err => {
            console.log(err)
            store.setError(err);
            render();
        });
    });
};

function render() {
    console.log('render working');
    if (store.DATA.error) {
        const el = generateError(store.DATA.error);
        $('.error-container').html(el);
    } else {
        $('.error-container').empty();
    }

    let items = store.DATA.bookmarks;
    if (store.DATA.filterRating >= 1) {
        items = store.DATA.bookmarks.filter(bookmark => bookmark.rating >= store.DATA.filterRating);
    }

    button.innerText = 'ADD BOOKMARKS';
    if (store.DATA.adding) {
        button.innerText = 'CANCEL'
        $('#bookmark-form').show();
    }
    else {
        button.innerText = 'ADD BOOKMARKS'
        $('#bookmark-form').hide();
    }
    const bookmarklistItemsString = generateBookmarkItemString(items);
    $('.bookmark-list').html(bookmarklistItemsString);
};

function generateBookmarkItemString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
};

function handleError(err) {
    let errorMessage = '';
    if (err.responseJSON && err.responseJSON.message) {
        errorMessage = err.responseJSON.message;
    } else {
        errorMessage = `${err.code} Server Error!`;
    }
    return `
        <section class ="error-body">
            <button id="close-error">X</button>
            <p>${errorMessage}</p>
        </section>
        `;
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
                <p>Rating ${item.rating}</p>
                <p>Link <a href="${item.url}">${item.url}</a></p>
                <p>Description <br> ${item.desc}</p>
                <button class="delete-bookmark-button"><span class="button-label">DELETE</span></button>
            </li>`;
    }
};

function handleDeleteItemClick() {
    $('.bookmark-list').on('click', '.delete-bookmark-button', event => {
        const id = getItemIdFromElement(event.target);
        console.log(id);
        api.deleteItem(id, () => {
            store.findAndDelete(id);
            render();
        })
    })
};

function handleAddBookmarkClick() {
    $('#showhide').on('click', function () {
        store.DATA.adding = !store.DATA.adding;
        render();
    })
};

function getItemIdFromElement(item) {
    return $(item).closest('.bookmark-id').data('item-id');
};

function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
        store.DATA.error = null;
        render();
    })
};

function handleRatingFilterClick() {
    $('.min-rating').on('click', function () {
        const selection = parseInt($(this).val(), 10);
        store.DATA.filterRating = selection;
        render();
    })
};

function toggleExpandBookmark(title) {
    const foundBookmark = store.DATA.bookmarks.find(bookmark => bookmark.title === title);
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
    handleError();
};

export default {
    render,
    bindEventListeners
};

//}());

