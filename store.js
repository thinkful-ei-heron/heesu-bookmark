const findById = function(id) {
    return this.bookmarks.find(item => item.id === id);
};

const addItems = function(item) {
    this.bookmarks.push(item);
};

const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(item => item.id !== id);
};

const findAndUpdate = function(id, newData) {
    let updatedItem = this.findById(id);
    Object.assign(updatedItem, newData);
};

const setError = function (error) {
    this.error = error;
};

export default {
    bookmarks: [],
    adding: false,
    error: null,
    filterRating: 0,
    findById,
    addItems,
    setError,
    findAndDelete,
    findAndUpdate
};
