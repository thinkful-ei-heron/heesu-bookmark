'use strict'
const store = (function() {
    const findById = function(id) {
        return this.items.find(item => item.id === id);
    };

    const addItems = function(item) {
        this.items.push(item);
    };

    const findAndDelete = function(id) {
        this.items = this.items.filter(item => item.id !== id);
    };

    const setError = function(error) {
        this.error = error;
    };

    

    return {
        findById,
        addItems,
        findAndDelete,
        setError,

        items: [],
        error: null,

    }
});
