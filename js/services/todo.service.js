'use strict';

var gTodos;
_createTodos();

var gFilterBy = 'ALL';
var gSortBy = 'TXT';

function getTodosForDisplay() {
    sortTodos();
    if (gFilterBy === 'ALL') return gTodos;
    const todos = gTodos.filter(function (todo) {
        return (
            (todo.isDone && gFilterBy === 'DONE') ||
            (!todo.isDone && gFilterBy === 'ACTIVE')
        );
    });
    return todos;
}
function getFilterBy() {
    return gFilterBy;
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex((todo) => todo.id === todoId);
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    const todo = gTodos.find((todo) => todo.id === todoId);
    todo.isDone = !todo.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance);
    gTodos.push(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length;
}

function getActiveTodosCount() {
    const todos = gTodos.filter(function (todo) {
        return !todo.isDone;
    });
    return todos.length;
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}

function setSort(sortBy) {
    gSortBy = sortBy;
}

function sortTodos() {
    switch (gSortBy) {
        case 'TEXT':
            gTodos.sort((a, b) => {
                if (a.txt.toUpperCase() > b.txt.toUpperCase()) return 1;
                else return -1;
            });
            break;
        case 'CREATED':
            gTodos.sort((a, b) => a.createdAt - b.createdAt);
            break;
        case 'IMPORTANCE':
            gTodos.sort((a, b) => a.importance - b.importance);
    }
}

function _saveTodosToStorage() {
    saveToStorage('todosDB', gTodos);
}

function _createTodo(txt, importance = 3) {
    const todo = {
        id: _makeId(),
        txt,
        createdAt: Date.now(),
        importance,
        isDone: false,
    };
    return todo;
}

function _createTodos() {
    var todos = loadFromStorage('todosDB');
    // Setup Demo data
    if (!todos || !todos.length) {
        todos = [
            _createTodo('Style With Flexbox'),
            _createTodo('Master your HTML'),
            _createTodo('Practice Array Extras'),
        ];
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _makeId(length = 5) {
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var txt = '';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
