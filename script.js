const form = document.querySelector('form');
const input = document.querySelector('input');
const output = document.querySelector('.output');


let todos = [];

const createTask = () => {
    const inputValue = input.value.trim(); 

    if (inputValue !== '') {
        const task = {
            id: new Date().toISOString(),
            message: inputValue,
            status: false,
            date: new Date(),
        };

        todos = [...todos, task];
        input.value = '';
        renderTodos();
    } else {
        alert('Lmao stupid kid');
    }



};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    createTask();
    console.log(todos);
});

const renderTodos = () => {
    output.innerHTML = '';
    todos.forEach((el, index) => {
        const block = document.createElement('div');
        const message = document.createElement('h3');
        const date = document.createElement('p');
        const status = document.createElement('p');
        const edit = document.createElement('button');
        const done = document.createElement('button');
        const deleteBtn = document.createElement('button');

        block.classList = 'block';

        edit.textContent = 'edit';
        deleteBtn.textContent = 'delete';
        done.textContent = 'done';

        if (el.status) { 
            status.textContent = 'todo is completed'; 
            edit.disabled = true; 
            message.style.textDecoration = 'line-through'
        } else { 
            status.textContent = 'todo is not completed'; 
            edit.disabled = false; 
            message.style.textDecoration = 'none';
        }

        date.textContent = el.date.toLocaleDateString('KG')
        message.textContent = `${index + 1}. ${el.message}`; 
        
        edit.addEventListener('click', () => {
            editTodo(el.id);
        });

        done.addEventListener('click', () => {
            markTodoAsDone(el.id);
        });

        deleteBtn.addEventListener('click', () => {
            deleteTodo(el.id);
        });
      


        output.append(block);
        block.append(message, date, status , edit, deleteBtn, done);
    });
};

const editTodo = (id) => {
    const editedMessage = prompt('Изменить текст задачи:');
    if (!editedMessage) return;
    
    todos = todos.map((item) => {
        if (id === item.id) {
            return { ...item, message: editedMessage };
        }
        return item;
    });

    renderTodos();
   
};

const markTodoAsDone = (id) => {
    todos = todos.map((item) => {
        if (id === item.id) {
            return { ...item, status: !item.status};
        }
        return item;
    });
 
    renderTodos();
};
const deleteTodo = (id) => {
    todos = todos.filter((Beksultan) => id !== Beksultan.id);
    renderTodos();
};




const deleterButton = document.createElement('button');
deleterButton.textContent = 'deleter';
deleterButton.addEventListener('click', deleteAllBlocks);

form.insertAdjacentElement('beforebegin', deleterButton);

function deleteAllBlocks() {
    todos = [];
    renderTodos();
}

