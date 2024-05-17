// register.js

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newName = document.getElementById('new-name').value;
    const newEmail = document.getElementById('new-email').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const courseElements = document.querySelectorAll('input[name="course"]:checked');
    const courses = Array.from(courseElements).map(element => element.value);

    if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = users.some(user => user.username === newEmail);

    if (userExists) {
        alert('Nome de usuário já existe. Por favor, escolha outro nome.');
    } else {
        const newUser = { name: newName, username: newEmail, password: newPassword, courses: courses };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Cadastro realizado com sucesso!');
        window.location.href = 'login.html';
    }
});
