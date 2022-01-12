'use strict';

function renderTodos() {
    const todos = getTodosForDisplay();
    if (todos.length === 0) {
        var strHtmls = '';
        var filter = getFilterBy();
        if (filter === 'ALL') {
            strHtmls = 'No Todos';
        } else if (filter === 'ACTIVE') {
            strHtmls = 'No Active Todos';
        } else if (filter === 'DONE') {
            strHtmls = 'No Done Todos';
        }
        //set ALL at last else
        document.querySelector('.todo-list').innerText = strHtmls;
    } else {
        var strHtmls = todos.map(function (todo) {
            return `<li onclick="onToggleTodo('${
                todo.id
            }')" class="${todo.isDone ? 'done' : ''}">
                        ${todo.txt}
                        <button onclick="onRemoveTodo(event, '${
                            todo.id
                        }')">x</button>
                    </li>`;
        });
        document.querySelector('.todo-list').innerHTML = strHtmls.join('');
    }
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    console.log('Removing todo', todoId);
    var deleteConfirm = confirm('Are you sure ?');
    if (deleteConfirm) {
        removeTodo(todoId);
        renderTodos();
    }
}

function onToggleTodo(todoId) {
    console.log('Toggling todo', todoId);
    toggleTodo(todoId);
    renderTodos();
}

function onAddTodo() {
    const elTxt = document.querySelector('.text');
    const txt = elTxt.value;
    const elImp = document.querySelector('.importance');
    const imp = +elImp.value;
    if (txt === '') return;
    addTodo(txt, imp);
    renderTodos();
    elTxt.value = '';
    elImp.value = '';
}

function onSetFilter(filterBy) {
    console.log('Filtering By:', filterBy);
    setFilter(filterBy);
    renderTodos();
}

function onSetSort(sortBy) {
    console.log('Sorting By:', sortBy);
    setSort(sortBy);
    renderTodos();
}
