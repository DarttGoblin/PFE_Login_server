const profileUsernameSpan = document.getElementById("profileUsernameSpan");
const profileSpans = document.getElementsByClassName("profileSpans");
const manageBtn = document.getElementById("manageBtn");
const deleteBtn = document.getElementById("deleteBtn");

var supervisorData = JSON.parse(localStorage.getItem("supervisorData"));

profileUsernameSpan.innerHTML = capitalizeFirstLetter(supervisorData.fname) + " " + capitalizeFirstLetter(supervisorData.lname);
profileSpans[0].innerHTML = supervisorData.username; 
profileSpans[1].innerHTML = supervisorData.email;
profileSpans[2].innerHTML = supervisorData.phone_number;
profileSpans[3].innerHTML = supervisorData.super_id;
profileSpans[4].innerHTML = supervisorData.created_at;
