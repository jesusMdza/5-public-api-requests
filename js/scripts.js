const searchContainer = document.querySelector('.search-container');
const gallery = document.querySelector('#gallery');
// const modal;
// const cardDiv = document.createElement('div');
// const imgContainer = document.createElement('div');
// const cardInfoContainer = document.createElement('div');

// cardDiv.classList.add('card');
// imgContainer.classList.add('card-img-container');
// cardInfoContainer.classList.add('card-info-container');

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
    gallery.innerHTML = html;
}

function toggleModal() {
    const gallery = document.querySelectorAll('.card');
    console.log(gallery);

    //     const modal = data.map(employee => `
    //     <div class="modal-container">
    //     <div class="modal">
    //         <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    //         <div class="modal-info-container">
    //             <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
    //             <h3 id="name" class="modal-name cap">name</h3>
    //             <p class="modal-text">email</p>
    //             <p class="modal-text cap">city</p>
    //             <hr>
    //             <p class="modal-text">(555) 555-5555</p>
    //             <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
    //             <p class="modal-text">Birthday: 10/21/2015</p>
    //         </div>
    //     </div>
    // `).join('');
    // gallery.innerHTML = modal;
}


fetchData('https://randomuser.me/api/?results=12', displayEmployees);
toggleModal();




/* 
A. HTML
    You'll be provided with a basic index.html file to use in your project. But this file is missing the main components of the app, 
    which you will need to create and add to the DOM dynamically.
    Comments in the index.html file contain examples of the markup you'll need to add. So use the markup in 
    those comments as a template. And keep in mind that altering the arrangement of the markup and the attributes used may 
    break the styles or functionality.

B. Structure, style and CSS
    Your finished project should match the general position and layout of the mockups. If you you followed the arrangement and attributes 
    of the template markup in the HTML comments, then the provided styles should accomplish this for you.
    You are encouraged to experiment with things like color, background color, font, shadows, 
    transitions and animations to make this project your own.

1. Get and display 12 random users
    With information provided from The Random User Generator API, send a single request to the API, 
    and use the response data to display 12 users, along with some basic information for each:
        Image
        First and Last Name
        Email
        City or location
    Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.

2. Create a modal window
    When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
        Image
        Name
        Email
        City or location
        Cell Number
        Detailed Address, including street name and number, state or country, and post code.
        Birthday
        Make sure there’s a way to close the modal window
    Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.

3. Add good code comments

4. Check for cross-browser consistency
    To pass, your project only needs to work in Chrome, but it's good to get in the habit of checking your work in multiple browsers.
    Carefully review the "How you'll be graded" section.

5. Quality Assurance and Project Submission Checklist
    Perform QA testing on your project, checking for bugs, user experience and edge cases.
    Check off all of the items on the Student Project Submission Checklist.


Extra Credit

1. Search
    Add a way to filter the directory by name. To do this, you’ll need to adjust your API request to retrieve a user 
    nationality that will only return data in the English alphabet.
    Example markup for this feature is included in the HTML comments.
Note: Your search feature should filters results that are already on the page. So don't request new info from the API for your search.

2. Modal toggle
    Add a way to toggle back and forth between employees when the modal window is open.
    There should be no errors once the end or beginning of the list is reached.
    Example markup for this feature is included in the HTML comments.

3. Structure, style and CSS
    Add or change at least one of the following:
        color
        background color
        font
        box or text shadows
        Document your style changes in your readme file and the project submission notes.
        Do not alter the layout or position of the important elements on the page.

*/