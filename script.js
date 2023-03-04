let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

console.log("script working")
function addTaskToDom(task){
    const li = document.createElement('li');

    li.innerHTML = `
        
            <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''}" >  
            <label for="${task.id}">${task.text}</label>
          
    `;
    taskList.append(li);
}
function renderList() {
    taskList.innerHTML = '';
    for(let i=0; i<tasks.length;i++){
        addTaskToDom(tasks[i]);
    }
 }

function toggleTask(taskId) {
    const task = tasks.filter(function (task) {
        return task.id == taskId;
    })

    if(task.length > 0 ){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('Task toggled succesfully');
    }

    showNotification('Couldnt toggle the task');
 }

function deleteTask(taskId) { 
    count--;
    document.getElementById('tasks-counter').innerHTML = count;
    const newTasks = tasks.filter(function (task) {
        return task.id !== taskId
    })
    tasks = newTasks;
    renderList();
    showNotification('Task deleted successfully');
}

var count =0;
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
            text: text,
            id: Date.now().toString(),
            done: false

        }

        e.target.value = '';
        addTask(task);
    }


}
function handleClickListener(e) {
    const target = e.target;
    console.log(target);

}

addTaskInput.addEventListener('keyup', handleKeyInputPress);

document.addEventListener('click' , handleClickListener)


