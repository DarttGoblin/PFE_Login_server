const filterSelectLog = document.getElementById("filterSelectLog");
const sortSelectLog = document.getElementById("sortSelectLog");
const downloadSelectLog = document.getElementById("downloadSelectLog");
const filterSelectUserLog = document.getElementById("filterSelectUserLog");
const sortSelectUserLog = document.getElementById("sortSelectUserLog");
const searchEng = document.getElementById("searchEng");
const searchIcon = document.getElementById("searchIcon");
const downloadSelectSpan = document.getElementById("downloadSelectSpan");
const analyseBtn = document.getElementById("analyseBtn");

var filterLogOptions = ['Yesterday', 'Last week', 'Last month'];
var sortLogOptions = ['Number', 'Timestamp', 'Classification', 'Priority'];
var downloadLogOptions = ['PDF', 'CSV', 'JSON'];
var filterUserLogOptions = ['Yesterday', 'Last week', 'Last month', 'Last year'];
var sortUserLogOptions = ['Name', 'Action', 'Timestamp', 'Device', 'Location'];

LogFilterSelect();
LogSortSelect();
LogDownloadSelect();
UserLogFilterSelect();
UserLogSortSelect();
AnalyseBgColor();

searchIcon.onclick = function() {SearchUpdateLog();}
searchEng.onkeydown = function(event) {if (event.key == 'Enter') {SearchUpdateLog()}}
downloadSelectSpan.onclick = function() {DownloadFile();}
filterSelectLog.onchange = function(event) {Filter(event);};

function AnalyseBgColor() {
    analyseBtn.style.backgroundColor = RandomColor();
    setInterval(() => {analyseBtn.style.backgroundColor = RandomColor() + `,${0.5})`;}, 2000);
}
function RandomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgba(${red}, ${green}, ${blue}`;
}
function DownloadFile() {
    const fileType = downloadSelectLog.value;
    if (fileType == 'Choose') {alert("Please choose a file type to download!"); return;}
    fetch('http://localhost:8013', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({parsedFileLog, fileType})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {alert(data.message)}
        else {console.log("Error: " + data.error);}
    })
    .catch(error => {console.log(error);});
}
function FilterDuration(filterType) {
    if (filterType == 1) {return 24}
    else if (filterType == 2) {return 24 * 7}
    else if (filterType == 3) {return 24 * 30}
    else {return 24 * 356}
}
function Filter(event) {
    const filterType = event.target.value;
    const filterDuration = FilterDuration(filterType);
    const filteredLogLines = [];
    var currentDate = new Date();
    var filterIndex = 0;

    parsedFileLog.forEach(line => {
        var timestampParts = line.timestamp.split(/\/|-|:|\./);
        var timestamp = new Date(Date.UTC(
            new Date().getFullYear(),
            parseInt(timestampParts[0], 10) - 1,
            parseInt(timestampParts[1], 10),
            parseInt(timestampParts[2], 10),
            parseInt(timestampParts[3], 10),
            parseInt(timestampParts[4], 10),
            parseInt(timestampParts[5], 10)
        ));

        var timeDifference = currentDate - timestamp;
        var hoursDifference = timeDifference / (1000 * 60 * 60);
        if (hoursDifference <= filterDuration) {
            filteredLogLines[filterIndex] = line;
            filterIndex++;
        }
    });
    
    snortLogFiletbody.innerHTML = '';
    filteredLogLines.forEach(line => {snortLogFiletbody.appendChild(createSnortFileTableRow(line));;});
}
function capitalizeFirstLetter(string) {return string.charAt(0).toUpperCase() + string.slice(1);}
function searchLogs(logLines, keyword) {
    const results = [];
    var index = 0;
    logLines.forEach((line) => {
        var lowercaseLine = line.toLowerCase();
        if (lowercaseLine.includes(keyword.toLowerCase())) {
            results[index] = line;
            index++;
        }
    });
    return results;
}
function SearchUpdateLog() {
    var keyword = searchEng.value;
    var newLogLines = searchLogs(logLines, keyword);
    if (newLogLines.length == 0) {
        alert("The Provided input has no matches with log enteries!");
        return;
    }
    var index = 1;
    snortLogFiletbody.innerHTML = '';
    newLogLines.forEach(line => {
        const parsedData = parseLogLine(line, index);
        if (parsedData) {
            snortLogFiletbody.appendChild(createSnortFileTableRow(parsedData));
            index++;
        } else {handleUnmatchedLogLine(line);}
    });
}
function LogFilterSelect() {
    for (var i = 0; i < filterLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = filterLogOptions[i];
        option.value = i + 1;
        filterSelectLog.appendChild(option);
    }
}
function LogSortSelect() {
    for (var i = 0; i < sortLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = sortLogOptions[i];
        option.value = i + 1;
        sortSelectLog.appendChild(option);
    }
}
function LogDownloadSelect() {
    for (var i = 0; i < downloadLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = downloadLogOptions[i];
        option.value = i + 1;
        downloadSelectLog.appendChild(option);
    }
}
function UserLogFilterSelect() {
    for (var i = 0; i < filterUserLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = filterUserLogOptions[i];
        option.value = i + 1;
        filterSelectUserLog.appendChild(option);
    }
}
function UserLogSortSelect() {
    for (var i = 0; i < sortUserLogOptions.length; i++) {
        var option = document.createElement("option");
        option.textContent = sortUserLogOptions[i];
        option.value = i + 1;
        sortSelectUserLog.appendChild(option);
    }
}