(function (){
    let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log("script working")
function fetchData() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then((Response) => {
            console.log(Response);
            return Response.json()
        }).then((data) => {
            tasks = data.slice(0,10);
            renderList();
        })
}
function addTaskToDom(task) {
    const li = document.createElement('li');

    li.innerHTML = `
            <input class="custom-checkbox" type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}"  >  
            <label for="${task.id}" class="label">${task.title}</label>
            <img src="https://cdn.onlinewebfonts.com/svg/img_422309.png" alt="del-icon" height="15px" width="15px" class="del-icon" data-id="${task.id}">
    `;
    taskList.append(li);
}
function renderList() {
    taskList.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
    }
}

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id == Number(taskId);
    })

    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification('Task toggled succesfully');
    }

    else {
        showNotification('Couldnt toggle the task');
    }
}

function deleteTask(taskId) {
    count--;
    document.getElementById('tasks-counter').innerHTML = count;
    const newTasks = tasks.filter(function (task) {
        return task.id !== Number(taskId);
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

var count = 10;
function addTask(task) {
    count++;
    document.getElementById('tasks-counter').innerHTML = count;
    tasks.push(task);
    renderList();
    showNotification('Task is added');

    return;
}

function showNotification(text) {
    alert(text);
}

function handleKeyInputPress(e) {

    if (e.key == 'Enter') {
        const text = e.target.value;


        if (!text) {
            showNotification(text);
            return;
        }
        const task = {
            title: text,
            id: Date.now().toString(),
            completed: false

        }

        e.target.value = '';
        addTask(task);
    }


}
function handleClickListener(e) {
    const target = e.target;
    if (target.className == 'del-icon') {
        const taskId = target.dataset.id;
        deleteTask(taskId);
    } else if (target.className == 'custom-checkbox') {
        const taskId = target.id;
        toggleTask(taskId);
    }

}
function startingApp() {
    fetchData();
    addTaskInput.addEventListener('keyup', handleKeyInputPress);
    tasksCounter.innerHTML = count;
    document.addEventListener('click', handleClickListener)
}
startingApp();

})()

