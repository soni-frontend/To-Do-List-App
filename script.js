document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            // 🔒 SECURITY LINE: Using textContent helps protect against XSS attacks.
            const taskSpan = document.createElement('span');
            taskSpan.textContent = task.text;
            li.appendChild(taskSpan);

            if (task.completed) {
                li.classList.add('completed');
            }

            
            li.addEventListener('click', (e) => {
                
                if (e.target.tagName === 'BUTTON' || e.target.tagName === 'I') return;
                
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
            
    
            deleteBtn.classList.add('delete-btn'); 

        
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }


    function addTask() {
        const taskText = taskInput.value.trim();
        
        
        if (taskText === '') return;

        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }

    addBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});

// EXAMINER DEMO: Insecure output dikhane ke liye chhota function
function showInsecureDemo() {
    alert("Insecure innerHTML test chal raha hai...");
    document.body.innerHTML += `<div style='display:none'><img src='x' onerror='alert("Warning: Hacker successfully hacked the app using XSS vulnerability!")'></div>`;
}
