'use strict'
import $ from 'jquery';
import api from './api';
import store from './store';

const render = function() {
    if(store.adding === true) {
        addNewBookmarkList()
    }
    else if(store.adding === false) {
        renderList();
    }
};

const renderList = function() {
    // render from bookmark store(array), render each one time
    const bookmarksHTML = store.bookmarks.map(bookmark => {
        return `
        <li>
          <span>${bookmark.title}</span>
        </li>
      `}).join("") 
    
      $('some container').html(`<ul>${bookmarksHTML}</ul>`)
}

const bookmarkDelete = function() {
    // delete one by one (similar shopping list)
}

const bookmarkAdd = function() {
    // add one by one (similar shopping list)
}

const bookmarkCheck = function() {
    // (similar shopping list)
}

const toggleView = function() {
    // expand or condense veiw, add html&url or not

}

export default {
    render,
    addNewBookmarkList,
    bookmarkDelete,
    bookmarkAdd,
    bookmarkCheck,
    toggleView
};