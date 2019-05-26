/************************************* 
FSJS TechDegree Project - Public API Requests



- This project is attempting to receive an "Exceeds Expectations" grade.
- CSS changes noted in ReadMe file


*************************************/
const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');

function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayEmployees(data.results))
}

function displayEmployees(data) {
    const html = data.map(employee => `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${employee.picture.large}" alt="profile-picture"></img>
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class="card-text">${employee.email}</p>
                <p class="card-text cap">${employee.location.city}</p>
            </div>
        </div>
    `).join('');
    gallery.insertAdjacentHTML('beforeend', html);
    console.log(data);
    appendModal(data);
    searchBar();
}

function appendModal(data) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', (event) => {
        const cardSelect = card;
        const cardName = card.querySelector('h3').textContent;
        console.log(cardName);
        data.map(employee => {
            if (cardName === `${employee.name.first} ${employee.name.last}`) {
                console.log(employee);
                const html = 
                    `<div class="modal-container">
                        <div class="modal">
                        <img src="Images/x.png" id="modal-close-btn" class="modal-close-btn"></img>
                        <div class="modal-info-container">
                            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                            <p class="modal-text">${employee.email}</p>
                            <p class="modal-text cap">${employee.location.city}</p>
                            <hr>                            <p class="modal-text">${employee.cell}</p>
                            <p class="modal-text cap">${employee.location.street}, ${employee.location.state} ${employee.location.postcode}</p>
                            <p class="modal-text">Birthday: ${employee.dob.date}</p>
                        </div>

                        <div class="modal-btn-container">
                            <img src="Images/Arrow.png" id="modal-prev"></img>
                            <img src="Images/Arrow.png" id="modal-next"></img>
                        </div>
                    </div>`;
                document.body.insertAdjacentHTML('afterbegin', html);
                reformatBirthday();
                closeModal();
                modalToggle(cardSelect);
            }
        });
    }));
}

function reformatBirthday() {
    const modalInfoContainer = document.querySelector('.modal-info-container');
    const lastParagraph = modalInfoContainer.lastElementChild;
    const birthday = lastParagraph.textContent.replace(/T\S*/, '');
    const birthdayReformatted = birthday.replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1');
    lastParagraph.innerHTML = birthdayReformatted;
}

function modalToggle(cardSelect) {
    const cards = document.querySelectorAll('.card');
    const prevButton = document.querySelector('#modal-prev');
    const nextButton = document.querySelector('#modal-next');
    console.log(nextButton);
    const firstIndex = cards.length - cards.length;
    const lastIndex = cards.length - 1;
    let array = [];
    cards.forEach(card => array.push(card));

    prevButton.addEventListener('click', () => {
        if (array.indexOf(cardSelect) === firstIndex) {
            cards[lastIndex].click();
        } else {
            cardSelect.previousElementSibling.click();
        }
    });

    nextButton.addEventListener('click', () => {
        if (array.indexOf(cardSelect) === lastIndex) {
            cards[firstIndex].click();
        } else {
            cardSelect.nextElementSibling.click();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal-container');

    modal.addEventListener('click', (event) => {
        const nodeName = event.target.nodeName;
        if (nodeName === 'STRONG' || nodeName === 'IMG') {
            modal.parentNode.removeChild(modal);
        }
    });
}

function searchBar() {
    const searchHTML = `
    <form action="#" method="get">
        <span><img src="Images/search-icon.png" class="search-icon"></img></span>
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`;
    searchContainer.insertAdjacentHTML('afterbegin', searchHTML);

    const searchField = document.querySelector('#search-input');
    
    searchField.addEventListener('keyup', () => {
        const cards = document.querySelectorAll('.card');
        const userInput = searchField.value.toLowerCase();
        const employeeOutput = [];
        cards.forEach(card => {
            const cardName = card.querySelector('h3').textContent;
            if (cardName.includes(userInput)) {
                card.style.display = 'flex';
                employeeOutput.push(card);
            } else {
                card.parentNode.removeChild(card);
            }
        });
       
        if (employeeOutput.length === 0) {
            appendError();
        }
    });
}

function appendError() {
    const error = `
    <div>
        <h1 style="color:rgba(50, 50, 50, 0.9)">No Employees Found</h1>
        <h3 style="color:rgba(50, 50, 50, 0.9)">Refresh the page for a new list of employees</h3>
    </div>`;
    gallery.innerHTML = error;
}

fetchData('https://randomuser.me/api/?results=12&nat=US', displayEmployees);