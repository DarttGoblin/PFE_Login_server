const closingForm = document.getElementById("closingForm");
const navLinks = document.getElementsByClassName("navLinks");
const form = document.getElementsByTagName("form");
const submitBtn = document.getElementById("submitBtn");
const loginInputs = document.getElementsByClassName("loginInputs");
const accessDenial = document.getElementById("accessDenial");
const connecting = document.getElementById("connecting");

const navLinksArray = [
    "InterfaceEmbPages/Dashboard/Dashboard.html",
    "InterfaceEmbPages/Log/Log.html",
    "InterfaceEmbPages/Alerts/Alerts.html",
    "InterfaceEmbPages/Reports/Reports.html",
];

var chosenLinkIndex;

//  Nav Script
for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = function() {
        form[0].style.display = "block";
        chosenLinkIndex = i;
    }
}

closingForm.onclick = function() {form[0].style.display = "none";}
submitBtn.onclick = function() {
    var givenusername = loginInputs[0].value;
    var givenpassword = loginInputs[1].value;
    var userData;
    var actionMade;

    fetch('http://localhost:8008', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({givenusername, givenpassword})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("supervisorData", JSON.stringify(data.supervisorData));
            connecting.style.display = "block";
            setTimeout(() => {
                if (chosenLinkIndex == undefined) {window.location.href = navLinksArray[0];}
                else {window.location.href = navLinksArray[chosenLinkIndex];}
            }, 1500);
            userData = JSON.parse(JSON.stringify(data.supervisorData));
            actionMade = "login";
            fetch('http://localhost:8009', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({userData, actionMade})
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {console.log("Log updates successfuly!");}
                else {console.log("Error updating log!");}
            })
            .catch(error => {
                console.log(error);
                console.log("Error updating log!");
            });
        }
        else {AccessDenial();}
    })
    .catch(error => {
        console.log(error);
        AccessDenial();
    });
}
function AccessDenial() {
    submitBtn.style.visibility = "hidden";
    accessDenial.style.visibility = "visible";
    accessDenial.style.opacity = 1;
    accessDenial.style.top = "-40px";
    setTimeout(() => {
        submitBtn.style.visibility = "visible";
        accessDenial.style.visibility = "hidden";
        accessDenial.style.opacity = 0;
        accessDenial.style.top = "0px";
    }, 3000);
}