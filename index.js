// scripts.js

document.addEventListener('DOMContentLoaded', () => {
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
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTeacher = document.getElementById('modal-teacher');
    const subscribeButton = document.getElementById('subscribe-button');
    const unsubscribeButton = document.getElementById('unsubscribe-button');
    const closeModalButton = document.getElementsByClassName('close')[0];

    workshops.forEach((workshop, index) => {
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

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

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
});
