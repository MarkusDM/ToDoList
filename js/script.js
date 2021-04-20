'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');



let todoData = JSON.parse(localStorage.getItem('todos')) || [];



const render = function () {

    todoList.textContent = "";
    todoCompleted.textContent = "";

    todoData.forEach(function (item, i) {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');

        btnTodoComplete.addEventListener('click', function(){
            item.completed = !item.completed;
            toLocal();
        })

        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoRemove.addEventListener('click', function(){
           todoData.splice(i, 1);
           toLocal();
        
        })

    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    todoData.push(newTodo);
    toLocal();

});

function toLocal() {
    localStorage.setItem('todos', JSON.stringify(todoData));
    render();
}

render();

