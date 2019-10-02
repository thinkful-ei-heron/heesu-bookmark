
const DATA = {
    bookmarks: [],
    adding: false,
    error: null,
    filterRating: 0,
};

const findById = function(id) {
    return this.DATA.bookmarks.find(item => item.id === id);
};

const addItems = function(item) {
    this.DATA.bookmarks.push(item);
};

const findAndDelete = function(id) {
    this.DATA.bookmarks = this.DATA.bookmarks.filter(item => item.id !== id);
};

const findAndUpdate = function(id, newData) {
    let updatedItem = this.findById(id);
    Object.assign(updatedItem, newData);
};

export default {
    DATA,
    findById,
    addItems,
    findAndDelete,
    findAndUpdate
};
