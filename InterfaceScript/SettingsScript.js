const gear = document.getElementById("gear");
const settingsCont = document.getElementById("settingsCont");
const settingsDiv = document.getElementById("settingsDiv");
const darkBgSetDiv = document.getElementById("darkBgSetDiv");
const closingSetArrow = document.getElementById("closingSetArrow");
const currentMode = document.getElementById("currentMode");
const modeSpan = document.getElementById("modeSpan");
const modeLogo = document.getElementById("modeLogo");
const optionsConts = document.getElementsByClassName("optionsConts");
const newAccountSpan = document.getElementById("newAccountSpan"); 
const newAccountIcon = document.getElementById("newAccountIcon");
const manageAccountIcon = document.getElementById("manageAccountIcon");
const manageAccountSpan = document.getElementById("manageAccountSpan");
const UsernameSpan = document.getElementById("usernameSpan");

var dlrangeBool = true; //  Referes to intial dark mode

gear.onclick = function() {SettingsState("block", "400px", 50);}
closingSetArrow.onclick = function() {SettingsState("none", "0px", 0);}
darkBgSetDiv.onclick = function() {SettingsState("none", "0px", 0);}
modeSpan.onclick = function() {ModeRange();}
newAccountSpan.onclick = function() {window.location.href = "../NewAccount/NewAccount.html";}
newAccountIcon.onclick = function() {window.location.href = "../NewAccount/NewAccount.html";}
manageAccountSpan.onclick = function() {window.location.href = "../NewAccount/NewAccount.html";}
manageAccountIcon.onclick = function() {window.location.href = "../NewAccount/NewAccount.html";}
UsernameSpan.onclick = function() {window.location.href = "../Account/Account.html";}

currentMode.innerHTML = "Dark";

function SettingsState(displayScl, widthScl, time) {
    darkBgSetDiv.style.display = displayScl;
    settingsCont.style.width = widthScl;
    closingSetArrow.style.display = displayScl;
    setTimeout(() => {settingsDiv.style.display = displayScl}, time);
}
// function ModeRange() {
//     if (dlrangeBool) {ModeChange("Light", "fa-moon", "fa-sun", false); DarkMode();}
//     else {ModeChange("Dark",  "fa-sun", "fa-moon",  true);}
// }
// function ModeChange(var1, var2, var3, var4) {
//     currentMode.innerHTML = var1;
//     modeLogo.classList.remove(var2);
//     modeLogo.classList.add(var3);
//     dlrangeBool = var4;
// }
// function DarkMode() {
//     document.body.style.backgroundColor = "white";
//     document.body.style.backgroundImage = "none";
//     darkBgSetDiv.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
//     settingsCont.style.backgroundColor = "rgb(150, 150, 150)";
//     closingSetArrow.style.backgroundColor = "rgb(150, 150, 150)";
//     optionsConts[0].style.color = "black";
//     optionsConts[1].style.color = "black";
// }
// function LightMode() {}