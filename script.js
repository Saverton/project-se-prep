// change a given contract button into an expand button
function makeButtonExpandContent(button) {
    button.classList.replace("hide", "show");
    button.textContent = "see more!";
}

// change a given expand button into a contract button
function makeButtonContractContent(button) {
    button.classList.replace("show", "hide");
    button.textContent = "see less!";
}

window.addEventListener('DOMContentLoaded', function(event) {
    const buttonList = document.querySelectorAll("li.project button");
    alert("Dom content loaded");

    for (let i = 0; i < buttonList.length; i++) {
        buttonList[i].addEventListener("click", buttonExpandOrContractHandler);
    }
})

// listen for clicks on buttons to expand/contract content.
//section.addEventListener('click', buttonExpandOrContractHandler);

// listen for touch on buttons to expand/contract content.
//section.addEventListener('touchstart', buttonExpandOrContractHandler);

// handle a button expand/contract event.
function buttonExpandOrContractHandler(event) {
    //alert("Button Pressed")
    const button = event.srcElement; // button that was pressed
    const id = event.composedPath()[1].id;
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

updateAge(); // updates my age when loading the page