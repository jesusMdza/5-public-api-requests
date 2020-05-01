/************************************* 
FSJS TechDegree Project - Public API Requests



- This project is attempting to receive an "Exceeds Expectations" grade.
- CSS changes noted in ReadMe file


*************************************/
const gallery = document.querySelector('#gallery');
const searchContainer = document.querySelector('.search-container');

// A fetch call is made which then parses and passes the response in "displayEmployees"
function fetchData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayEmployees(data.results))
        .catch(err => console.log(err))
}

// Transforms each object from "data" into html and inserts into gallery div
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
    appendModal(data);
    searchBar();
}

// Appends a modal to the browser whenever a "card" is clicked on
function appendModal(data) {
    const cards = document.querySelectorAll('.card');
    
    // Once "card" is clicked on, take the name of employee on "card" and check if it matches in the list of objects from "data"
    // If match, transform matched object into html and append to the body of page
    // Pass selected card (cardSelect) to "modalToggle"
    cards.forEach(card => card.addEventListener('click', (event) => {
        const cardSelect = card;
        const cardName = card.querySelector('h3').textContent;
        data.map(employee => {
            if (cardName === `${employee.name.first} ${employee.name.last}`) {
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
                            <img src="Images/arrow.png" id="modal-prev"></img> 
                            <img src="Images/arrow.png" id="modal-next"></img> 
                        </div>
                    </div>`;
                document.body.insertAdjacentHTML('afterbegin', html);
                console.log(html);
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

// Toggles through visible employee "card" divs depending on what button (prev/next) the user clicks on the current modal
function modalToggle(cardSelect) {
    const cards = document.querySelectorAll('.card');
    const prevButton = document.querySelector('#modal-prev');
    const nextButton = document.querySelector('#modal-next');
    const firstIndex = cards.length - cards.length;
    const lastIndex = cards.length - 1;
    let array = [];
    cards.forEach(card => array.push(card));

    // Clicks on previous element "card" from the current selected "card"
    // If button is clicked while current selected "card" is the first "card", click the last displayed "card"
    prevButton.addEventListener('click', () => {
        if (array.indexOf(cardSelect) === firstIndex) {
            cards[lastIndex].click();
        } else {
            cardSelect.previousElementSibling.click();
        }
    });

    // Clicks on next element "card" from the current selected "card"
    // If button is clicked while current selected "card" is the last "card", click the first displayed "card"
    nextButton.addEventListener('click', () => {
        if (array.indexOf(cardSelect) === lastIndex) {
            cards[firstIndex].click();
        } else {
            cardSelect.nextElementSibling.click();
        }
    });
}

// Close modal when images (left/right arrow, X) are clicked
function closeModal() {
    const modal = document.querySelector('.modal-container');

    modal.addEventListener('click', (event) => {
        const nodeName = event.target.nodeName;
        if (nodeName === 'IMG') {
            modal.parentNode.removeChild(modal);
        }
    });
}

// Appends search bar html into the "searchContainer"
function searchBar() {
    const searchHTML = `
    <form action="#" method="get">
        <span><img src="Images/search-icon.png" class="search-icon"></img></span>
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
    </form>`;
    searchContainer.insertAdjacentHTML('afterbegin', searchHTML);

    // If letter from user matches with any employee name from "card" div, display that "card"
    // If not, remove "card"
    const searchField = document.querySelector('#search-input');
    searchField.addEventListener('keyup', () => {
        const cards = document.querySelectorAll('.card');
        const userInput = searchField.value.toLowerCase();
        const employeeOutput = [];
        cards.forEach(card => {
            const cardName = card.querySelector('h3').textContent.toLowerCase();
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

// Append error html to gallery
function appendError() {
    const error = `
    <div>
        <h1 style="color:rgba(50, 50, 50, 0.9)">No Employees Found</h1>
        <h3 style="color:rgba(50, 50, 50, 0.9)">Refresh the page for a new list of employees</h3>
    </div>`;
    gallery.innerHTML = error;
}

fetchData('https://randomuser.me/api/?results=12&nat=US', displayEmployees);