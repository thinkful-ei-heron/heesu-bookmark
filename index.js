'use strict'
import $ from 'jquery';
import api from './api.js';
import store from './store.js';
import bookmarklist from './bookmarkList.js';

const main = function() {
    //want to get bookmark then update store and then render again
    api.getItems()
      .then(items => {
        items.map(item => {
        store.addItems(item);
      })
        bookmarklist.render();
        bookmarklist.bindEventListeners();
    })
};

$(main);
