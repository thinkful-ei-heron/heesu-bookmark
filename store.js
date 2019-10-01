'use strict'
const store = {
    bookmarks: [
      {
        id: 'x56w',
        title: 'Title 1',
        rating: 3,
        url: 'http://www.title1.com',
        description: 'lorem ipsum dolor sit',
        expanded: false
      },
      {
        id: '6ffw',
        title: 'Title 2',
        rating: 5,
        url: 'http://www.title2.com',
        description: 'dolorum tempore deserunt',
        expanded: false
      } 
    ],
    adding: false,
    error: null,
    filter: 0
};

const findById = function(id) {
    return this.items.find(item => item.id === id);
};

const addItems = function(item) {
    this.items.push(item);
};

const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
};

const findAndUpdate = function(id, newData) {
    let updatedItem = this.findById(id);
    Object.assign(updatedItem, newData);
};

const resetError = function() {
    this.error = null;
};

return {
    store,
    findById,
    addItems,
    findAndDelete,
    findAndUpdate,
    resetError
};
