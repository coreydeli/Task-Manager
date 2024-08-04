let token = '';

async function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    alert(await response.json().message);
}

async function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        token = data.token;
        alert('Login successful');
        loadTasks();
    } else {
        alert(data.message);
    }
}

async function loadTasks() {
    const response = await fetch('http://localhost:3000/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const tasks = await response.json();
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.title;
        tasksList.appendChild(li);
    });
}

async function addTask() {
    const title = document.getElementById('taskTitle').value;
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
    });
    if (response.ok) {
        loadTasks();
    }
}
