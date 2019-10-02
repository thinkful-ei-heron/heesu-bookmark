'use strict'
import $ from 'jquery';
import api from './api';
import store from './store';
import bookmarklist from './bookmarklist';

const main = function() {
    //want to get bookmark then update store and then render again
    api.getItems()
      .then(items => {
        items.map(item => {
          store.addItems(item);
        })
        bookmarklist.render();
    });
}

$(main);
