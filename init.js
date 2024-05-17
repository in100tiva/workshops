// init.js

document.addEventListener('DOMContentLoaded', function() {
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Verifique se o usuário de teste já existe
    const testUserExists = users.some(user => user.username === 'luan');

    if (!testUserExists) {
        // Adicione o usuário de teste
        const testUser = {
            name: 'Luan',
            username: 'luan',
            password: '123456',
            courses: ['Design', 'Programação']
        };
        users.push(testUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuário de teste adicionado:', testUser);
    }
});
