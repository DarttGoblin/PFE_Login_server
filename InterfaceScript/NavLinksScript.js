const navLinks = document.getElementsByClassName("navLinks");

const navLinksArray = [
    "../Dashboard/Dashboard.html",
    "../Log/Log.html",
    "../Reports/Reports.html",
    "../Help/Help.html",
];
const navLinksNames = ["Dashboard", "Log", "Alerts", "Reports"];

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].onclick = function() {
        userData = JSON.parse(localStorage.getItem("supervisorData"));
        actionMade = "navigate";
        navigatedLink = navLinksNames[i];
        fetch('http://localhost:8009', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({userData, actionMade, navigatedLink})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {console.log("Log updates successfuly!"); alert();}
            else {console.log("Error updating log!");}
        })
        .catch(error => {
            console.log(error);
            console.log("Error updating log!");
        });
        if (supervisorData) {window.location.href = navLinksArray[i];}
        else {window.location.href = "../../Home.html";}
    }
}