// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem('loggedIn')) {
        window.location.href = 'login.html';
    }

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    console.log('Usuário logado:', currentUser);  // Log para verificar se os dados do usuário estão sendo recuperados corretamente

    document.getElementById('user-name').textContent = `Nome: ${currentUser.name}`;
    document.getElementById('user-course').textContent = `Cursos: ${currentUser.courses.join(', ')}`;

    const workshops = [
        {
            title: "Workshop de Design",
            description: "Aprenda técnicas avançadas de design.",
            teacher: "João Silva",
            tags: ["Design"],
            subscribed: false
        },
        {
            title: "Workshop de Marketing",
            description: "Estratégias de marketing digital.",
            teacher: "Maria Souza",
            tags: ["Marketing"],
            subscribed: false
        },
        {
            title: "Workshop de Programação",
            description: "Introdução à programação web.",
            teacher: "Carlos Lima",
            tags: ["Programação"],
            subscribed: false
        }
    ];

    const workshopCardsContainer = document.getElementById('workshop-cards');
    const modal = document.getElementById('modal');
    const profileModal = document.getElementById('profile-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTeacher = document.getElementById('modal-teacher');
    const subscribeButton = document.getElementById('subscribe-button');
    const unsubscribeButton = document.getElementById('unsubscribe-button');
    const closeModalButton = document.getElementById('close-workshop-modal');
    const closeProfileModalButton = document.getElementById('close-profile-modal');
    const editProfileButton = document.getElementById('edit-profile-button');
    const editProfileForm = document.getElementById('edit-profile-form');
    const editName = document.getElementById('edit-name');
    const editEmail = document.getElementById('edit-email');
    const editCourses = document.querySelectorAll('input[name="edit-course"]');

    // Filtra workshops com base nos cursos do usuário
    const filteredWorkshops = workshops.filter(workshop => 
        workshop.tags.some(tag => currentUser.courses.includes(tag))
    );

    filteredWorkshops.forEach((workshop, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${workshop.title}</h3>
            <p>${workshop.description}</p>
            <div class="tags">
                ${workshop.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <span class="subscribed-icon">✔️</span>
        `;

        card.addEventListener('click', () => {
            openModal(workshop, index);
        });

        workshopCardsContainer.appendChild(card);
    });

    closeModalButton.addEventListener('click', closeModal);
    closeProfileModalButton.addEventListener('click', closeProfileModal);

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
        if (event.target === profileModal) {
            closeProfileModal();
        }
    };

    editProfileButton.addEventListener('click', () => {
        editName.value = currentUser.name;
        editEmail.value = currentUser.username;
        editCourses.forEach(checkbox => {
            checkbox.checked = currentUser.courses.includes(checkbox.value);
        });
        profileModal.style.display = 'block';
    });

    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentUser.name = editName.value;
        currentUser.username = editEmail.value;
        const updatedCourses = Array.from(editCourses).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value);
        currentUser.courses = updatedCourses;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUserProfile();
        closeProfileModal();
        // Recarregar a página para aplicar os filtros
        location.reload();
    });

    function openModal(workshop, index) {
        modalTitle.textContent = workshop.title;
        modalDescription.textContent = workshop.description;
        modalTeacher.textContent = `Professor: ${workshop.teacher}`;

        if (workshops[index].subscribed) {
            subscribeButton.style.display = 'none';
            unsubscribeButton.style.display = 'block';
        } else {
            subscribeButton.style.display = 'block';
            unsubscribeButton.style.display = 'none';
        }

        subscribeButton.onclick = () => subscribeWorkshop(index);
        unsubscribeButton.onclick = () => unsubscribeWorkshop(index);

        modal.style.display = 'block';
    }

    function closeModal() {
        modal.style.display = 'none';
    }

    function closeProfileModal() {
        profileModal.style.display = 'none';
    }

    function subscribeWorkshop(index) {
        workshops[index].subscribed = true;
        const card = workshopCardsContainer.children[index];
        const subscribedIcon = card.querySelector('.subscribed-icon');
        subscribedIcon.style.display = 'block';
        closeModal();
    }

    function unsubscribeWorkshop(index) {
        workshops[index].subscribed = false;
        const card = workshopCardsContainer.children[index];
        const subscribedIcon = card.querySelector('.subscribed-icon');
        subscribedIcon.style.display = 'none';
        closeModal();
    }

    function updateUserProfile() {
        document.getElementById('user-name').textContent = `Nome: ${currentUser.name}`;
        document.getElementById('user-course').textContent = `Cursos: ${currentUser.courses.join(', ')}`;
    }
});
