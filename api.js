'use strict'
const BASE_URL="https://thinkful-list-api.herokuapp.com/heesu";

const getItems = function() {
    return fetch(`${BASE_URL}/bookmarks`);
};

const createItem = function(data) {
    return apiFetch(`${BASE_URL}/bookmarks`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
};

const updateItem = function(id, updateData) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(updateData)
    });
};

const deleteItem = function(id) {
    return fetch(`${BASE_URL}/bookmarks/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    });
};

export default {
    createItem,
    deleteItem,
    updateItem,
    getItems
};
