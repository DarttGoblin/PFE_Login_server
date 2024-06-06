const usernameSpan = document.getElementById("usernameSpan");

var supervisorData = localStorage.getItem("supervisorData");
if (supervisorData) {
    supervisorData = JSON.parse(supervisorData);
    usernameSpan.innerHTML = capitalizeFirstLetter(supervisorData.fname) + " " + capitalizeFirstLetter(supervisorData.lname);
}
else {window.location.href = "../../Home.html";}

function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}