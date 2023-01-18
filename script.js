import projects from './projects.js';

// change a given contract button into an expand button
function makeButtonExpandContent(button) {
    button.classList.replace("hide", "show");
    button.textContent = "HIDE";
}

// change a given expand button into a contract button
function makeButtonContractContent(button) {
    button.classList.replace("show", "hide");
    button.textContent = "EXPAND";
}

// handle a button expand/contract event.
function buttonExpandOrContractHandler(event) {
    const button = event.target; // button that was pressed
    const id = `prj-${button.id}`;
    const infoSection = document.querySelector(`#${id} .project-info`);
    infoSection.classList.toggle("hidden"); // toggle if it's hidden
    if (button.className === "show") {
        makeButtonContractContent(button);
    }
    else if (button.className === "hide") {
        makeButtonExpandContent(button);
    }
}

// update the age element in the about me section
function updateAge() {
    const ageElement = document.getElementById("age");
    const dob = document.getElementById("dob").textContent;
    const date = parseInt(dob.substring(0, 2), 10);
    const month = parseInt(dob.substring(3, 5), 10);
    const year = parseInt(dob.substring(6, dob.length));
    ageElement.textContent = `${getYearDifference(date, month, year)}`;
}

// return the difference in years between a given day, month, and year and today's date
function getYearDifference(date, month, year) {
    const today = new Date();
    let difference = today.getFullYear() - year;
    if (month > (today.getMonth() + 1)) {
        difference--;
    }
    else if (month === (today.getMonth() + 1) && date < today.getDate()) {
        difference--;
    }
    return difference;
}

// renders all projects from projects list in ./projects.js
function renderProjects() {
    const projectSection = document.querySelector('#projects .section-content');
    projects.forEach((prj, idx) => {
        projectSection.append(renderProject(prj, idx));
    });
}

// renders a project as a section element given the project object.
function renderProject(project, index) {
    const section = document.createElement('section');
    section.className = 'project';
    section.id = `prj-${index}`;

    const h3 = document.createElement('h3');
    h3.textContent = project.name;

    const button = document.createElement('button');
    button.className = 'hide';
    button.id = index;
    button.textContent = 'EXPAND';

    const div = document.createElement('div');
    div.className = 'project-info hidden';

    const img = document.createElement('img');
    img.src = project.imgUrl;
    img.alt = img.title = project.name;
    
    const p = document.createElement('p');
    p.textContent = project.desc;

    const gitDiv = document.createElement('div');

    const githubLink = document.createElement('a');
    githubLink.href = project.github
    githubLink.target = '_blank';
    githubLink.textContent = 'Github';

    gitDiv.append(githubLink);

    div.append(img, p, gitDiv);

    if (project.youtube) {
        const ytDiv = document.createElement('div');

        const youtubeLink = document.createElement('a');
        youtubeLink.href = project.youtube
        youtubeLink.target = '_blank';
        youtubeLink.textContent = 'Youtube';

        ytDiv.append(youtubeLink);

        div.appendChild(ytDiv);
    }

    section.append(h3, button, div);

    return section;
}

updateAge(); // updates my age when loading the page
renderProjects(); // renders the list of projects in the project section

window.addEventListener('DOMContentLoaded', function(event) {
    const buttonList = document.querySelectorAll(".project button");
    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener("click", buttonExpandOrContractHandler);
    }
})