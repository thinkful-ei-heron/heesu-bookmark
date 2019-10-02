'use strict'
import $ from 'jquery';
import api from './api';
import store from './store';

const render = function() {
    if(store.adding === true) {
        addNewBookmarkList()
    }
    else if(store.adding === false) {
        rendersList();
    }
};

const rendersList = function() {
    // render from bookmark store(array), render each one time
    const bookmarksHTML = store.bookmarks.map(bookmark => {
        return `
        <li>
          <span>${bookmark.title}</span>
        </li>
      `}).join("") 
    
      $('some container').html(`<ul>${bookmarksHTML}</ul>`)
};

const addNewBookmarkList  = function() {
    // add one by one
    return (`
    <form id="js-bookmark-list-form">
        <div>
            <label for="bookmark-list-entry">Bookmark Title</label>
            <input type="text" name="bookmark-list-entry" class="js-bookmark-list-entry" placeholder="Google" required></input>
        </div>
        <div>
            <label for="bookmark-list-entry">URL</label>
            <input type="text" name="bookmark-list-entry" class="js-bookmark-list-entry" placeholder="https://www.google.com/" required></input>
        </div>
        <div>
            <label for="bookmark-list-entry">Description</label>
            <input type="text" name="bookmark-list-entry" class="js-bookmark-list-entry" placeholder="It's Google" required></input>
        </div>
        <div>
            <label for="bookmark-list-entry">Rating</label>
            <input type="number" name="bookmark-list-entry" class="js-bookmark-list-entry" 
                placeholder="1-5" id="rate" min="1" max="5" required></input>
        </div>
            <button type="submit">Submit</button>
    </form>
    `)
};

const handleBookmarkDelete = function() {
    // delete one by one (similar shopping list)
    $('.js-bookmark-list').on('click', '.bookmark-item-delete', event => {
        const id = getItemIdFromElement(event.currentTarget);
        api.deleteBookmark(id)
            .then(() => {
                store.bookmarks.findAndDelete(id);
                render();
            })
            .catch(error => {
                store.bookmarks.setError(error.message);
                render();
            })
    })
};

const bookmarkCheck = function() {
    // (similar shopping list)

}

const generateBookmarkItems = function() {
    // expand or condense veiw, add html&url or not
    
};

export default {
    render,
    addNewBookmarkList,
    handleBookmarkDelete,
    bookmarkCheck,
    generateBookmarkItems
};