const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task-item').forEach(item => {
    tasks.push({
      text: item.querySelector('span').innerText,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(text, isCompleted = false) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (isCompleted) li.classList.add('completed');

  const taskSpan = document.createElement('span');
  taskSpan.innerText = text;

  const buttonGroup = document.createElement('div');
  buttonGroup.classList.add('task-buttons');

  const completeBtn = document.createElement('button');
  completeBtn.innerText = '✔';
  completeBtn.className = 'complete-btn';
  completeBtn.onclick = () => {
    li.classList.toggle('completed');
    saveTasks();
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = '🗑';
  deleteBtn.className = 'delete-btn';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  buttonGroup.appendChild(completeBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(taskSpan);
  li.appendChild(buttonGroup);

  taskList.appendChild(li);
  saveTasks();
}

addBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text !== '') {
    renderTask(text);
    taskInput.value = '';
  }
};
