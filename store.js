'use strict'
const store = {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0
};

const findById = function(id) {
    return this.items.find(item => item.id === id);
};

const addItems = function(item) {
    this.bookmarks.push(item);
};

const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
};

const findAndUpdate = function(id, newData) {
    let updatedItem = this.findById(id);
    Object.assign(updatedItem, newData);
};

return {
    bookmarks: [],
    adding: false,
    error: null,
    filter: 0,
    findById,
    addItems,
    findAndDelete,
    findAndUpdate
};
