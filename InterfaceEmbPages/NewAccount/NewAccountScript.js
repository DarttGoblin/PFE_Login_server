const newAccInputs = document.getElementsByClassName("newAccInputs");
const newAccbuttons = document.getElementsByClassName("newAccbuttons");
const clearBtn = document.getElementById("clearBtn");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementsByTagName("form")[0];
const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');

clearBtn.onclick = ClearFunction;
submitBtn.onclick = SubmitFunction;

dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('hover');
    dropArea.style.overflow = "auto";
});
dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('hover');
    dropArea.style.overflow = "auto";
});
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.classList.remove('hover');
    const files = event.dataTransfer.files;
    handleFiles(files);
    dropArea.style.overflow = "auto";
});
dropArea.addEventListener('click', () => {
    fileInput.click();
    dropArea.style.overflow = "auto";
});

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
    dropArea.style.overflow = "auto";
});

function ClearFunction() {for (var i = 0; i < newAccInputs.length; i++) {newAccInputs[i].value = ""; fileInput.value = ""}}
function SubmitFunction() {
    var validPassword;
    var index = 0;
    var newUserData = {
        fname: "",
        lname: "",
        email: "",
        phone_number: "",
        username: "",
        password: "",
        confirmedPsw: "",
    };
    for (var key in newUserData) {newUserData[key] = newAccInputs[index].value; index++;}
    for (var key in newUserData) {
        if (newUserData[key] == "") {
            FailMessage("All fields are required!");
            return;
        }
    }
    validPassword = validatePassword(newUserData.password);
    if (!validPassword) {
        FailMessage(validPassword.message);
        return;
    }
    if (newUserData.password != newUserData.confirmedPsw) {
        FailMessage("Passwords are not matched!");
        return;
    }
    if (fileInput.files.length === 0) {
        FailMessage("No file selected!");
        return;
    }
    FetchOldUsers(newUserData);
}
function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {return { valid: false, message: `Password must be at least ${minLength} characters long.` };}
    if (!hasUpperCase) {return { valid: false, message: 'Password must contain at least one uppercase letter.' };}
    if (!hasLowerCase) {return { valid: false, message: 'Password must contain at<br>least one lowercase letter.' };}
    if (!hasNumbers) {return { valid: false, message: 'Password must contain at least one number.' };}
    if (!hasSpecialChar) {return { valid: false, message: 'Password must contain at least one special character.' };}

    return { valid: true};
}
function FetchOldUsers(newUserData) {
    fetch('http://localhost:8012', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({newUserData})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const repley = data.repley;
            if (!repley) {FailMessage("This username is taken, please choose another one!");}
            else {
                const userData = JSON.parse(localStorage.getItem("supervisorData"));
                const actionMade = "addAccount";
                fetch('http://localhost:8009', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({userData, actionMade, newUserData})
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
                alert("Account has been added successfuly!");
                window.location.href = "NewAccount.html";
            }
        }
        else {FailMessage("An error has been occured, try later!");}
    })
    .catch(error => {
        console.log(error);
        FailMessage("An error has been occured, try later!");
    });
}
function FailMessage(message) {
    clearBtn.style.visibility = "hidden";
    submitBtn.style.visibility = "hidden";
    failMsg.innerHTML = message;
    failMsg.style.visibility = "visible";
    failMsg.style.opacity = 1;
    failMsg.style.top = "-40px";
    setTimeout(() => {
        clearBtn.style.visibility = "visible";
        submitBtn.style.visibility = "visible";
        failMsg.innerHTML = "All fields are required!";
        failMsg.style.visibility = "hidden";
        failMsg.style.opacity = 0;
        failMsg.style.top = "0px";
    }, 3000);
}
function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        fileNameDisplay.textContent = `Selected file: ${file.name}`;
    }
}