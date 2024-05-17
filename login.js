// login.js

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    console.log('Usuários no localStorage:', users);  // Log para verificar se os usuários estão sendo recuperados corretamente

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'index.html';
    } else {
        alert('Nome de usuário ou senha incorretos!');
    }
});
