const logOut = document.getElementById("logOut");
var actionMade;
var userData;

logOut.onclick = function() {
    userData = JSON.parse(localStorage.getItem("supervisorData"));
    actionMade = "logout";
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
    localStorage.removeItem("supervisorData");
    window.location.href = "../../Home.html";
}