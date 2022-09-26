// given an element, make it visible
function makeSectionVisible(element) {
    element.style.display = "block";
}

// given an element, make it invisible
function makeSectionInvisible(element) {
    element.style.display = "none";
}

// change a given contract button into an expand button
function makeButtonExpandContent(button) {
    button.classList.remove("content-contract");
    button.classList.add("content-expand");
    button.textContent = "see more!";
}

// change a given expand button into a contract button
function makeButtonContractContent(button) {
    button.classList.remove("content-expand");
    button.classList.add("content-contract");
    button.textContent = "see less!";
}

// return an element that contains a parent with a specific id and a specific className
function getElementWithParentIdAndClassName(id, className) {
    return document.querySelector(`#${id} .${className}`);
}

// listen for clicks on buttons to expand/contract content.
document.addEventListener('click', function(event) {
    const button = event.srcElement; // button that was pressed
    const id = event.path[1].id;
    if (button.className === 'content-expand') {
        makeSectionVisible(getElementWithParentIdAndClassName(id, 'project-info'));
        makeButtonContractContent(button);
    }
    else if (button.className === 'content-contract') {
        makeSectionInvisible(getElementWithParentIdAndClassName(id, 'project-info'));
        makeButtonExpandContent(button);
    }
});

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

updateAge(); // updates my age when loading the page