const lineGraph = document.getElementById('lineGraph').getContext('2d');
const barGraph = document.getElementById('barGraph').getContext('2d');
const circularGraph = document.getElementById('circularGraph').getContext('2d');
const pieGraph = document.getElementById('pieGraph').getContext('2d');

const parsedFileLog = [];
const intrusionsSeverity = [];
const intrusionsNumPerDur = [];
const intrusionsType = [];
const intrusionsProtocol = [];
const intrusionsClassification = [];
const intrusionsSourceIP = [];
const intrusionsDestinationIP = [];
const intrusionCount = [];

const dataTiming = [['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', 
'11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],];

let lineChart, barChart, circularChart, pieChart;

CreateCharts();
ListenToFile();

function ListenToFile() {
    const socket = io('http://localhost:8011');
    socket.on('fileChanged', (fileDataLines) => {
        console.log('fileChanged event received');
        var parIndex = 0;
        var index = 1;
        fileDataLines.forEach(line => {
            const parsedData = parseLogLine(line, index);
            if (parsedData) {
                parsedFileLog[parIndex] = parsedData;
                parIndex++;
                index++;
            }
        });
        console.log("Data processed");
        CreateCharts();
    });
    socket.on('connect', () => {console.log('Connected to server');});
    socket.on('disconnect', () => {console.log('Disconnected from server');});
}

function parseLogLine(logLine, index) {
    const logPattern = /^(\d{2}\/\d{2}-\d{2}:\d{2}:\d{2}\.\d{6})\s+\[\*\*\]\s+\[\d+:\d+:\d+\]\s+(.+?)\s+\[\*\*\]\s+\[Classification:\s+(.+?)\]\s+\[Priority:\s+(\d+)\]\s+\{(\w+)\}\s+(\d{1,3}(?:\.\d{1,3}){3}):(\d+)\s+->\s+(\d{1,3}(?:\.\d{1,3}){3}):(\d+)/;
    const match = logLine.match(logPattern);
    if (match) {
        return {
            no: index,
            actionDescription: match[2],
            timestamp: match[1],
            classification: match[3],
            priority: match[4],
            protocol: match[5],
            sourceIP: match[6],
            sourcePort: match[7],
            destinationIP: match[8],
            destinationPort: match[9]
        };
    } else {
        console.log("Log line format did not match expected pattern: " + logLine);
        return null;
    }
}

function CreateCharts() {
    intrusionsSeverity.length = 0;
    intrusionsType.length = 0;
    intrusionsProtocol.length = 0;
    intrusionsClassification.length = 0;
    intrusionsSourceIP.length = 0;
    intrusionsDestinationIP.length = 0;
    intrusionCount.length = 0;

    parsedFileLog.forEach((log, i) => {
        intrusionsSeverity[i] = log.priority;
        intrusionsType[i] = log.actionDescription;
        intrusionsProtocol[i] = log.protocol;
        intrusionsClassification[i] = log.classification;
        intrusionsSourceIP[i] = log.sourceIP;
        intrusionsDestinationIP[i] = log.destinationIP;
        intrusionCount[i] = "Intrusion " + (i + 1);
    });

    const intrusionsTypeSet = new Set(intrusionsType);
    const intrusionsTypeFiltered = [...intrusionsTypeSet];
    const typeCounts = intrusionsTypeFiltered.map(type => intrusionsType.filter(t => t === type).length);

    const intrusionsProtocolSet = new Set(intrusionsProtocol);
    const intrusionsProtocolFiltered = [...intrusionsProtocolSet];
    const protocolCounts = intrusionsProtocolFiltered.map(protocol => intrusionsProtocol.filter(p => p === protocol).length);

    var lineGraphData = {
        labels: intrusionCount,
        datasets: [{
            label: 'Severity Of Intrusions',
            data: intrusionsSeverity,
            borderColor: 'rgba(0, 255, 0, 1)',
            backgroundColor: 'rgba(100, 195, 255, 0.5)',
            fill: true,
            borderWidth: 5,
            tension: 0.4
        }]
    };
    
    if (lineChart) {
        lineChart.data = lineGraphData;
        lineChart.update();
    } else {
        lineChart = new Chart(lineGraph, {
            type: 'line',
            data: lineGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {return Math.round(value);},
                            stepSize: 1
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Severity Of Intrusions Chart'
                    }
                }
            }
        });
    }

    var barGraphData = {
        labels: dataTiming[0],
        datasets: [{
            label: 'Number Of Intrusions',
            data: new Array(12).fill(0), // Adjust the data as per requirement
            borderColor: 'green',
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
        }]
    };

    if (barChart) {
        barChart.data = barGraphData;
        barChart.update();
    } else {
        barChart = new Chart(barGraph, {
            type: 'bar',
            data: barGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                }
            }
        });
    }

    var circularGraphData = {
        labels: intrusionsTypeFiltered,
        datasets: [{
            label: 'Intrusions by Type',
            data: typeCounts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderWidth: 1
        }]
    };

    if (circularChart) {
        circularChart.data = circularGraphData;
        circularChart.update();
    } else {
        circularChart = new Chart(circularGraph, {
            type: 'doughnut',
            data: circularGraphData,
            options: {
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: false,
                rotation: -Math.PI,
                legend: {
                    position: 'bottom',
                },
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusion Types'
                    }
                }
            },
        });
    }

    var pieGraphData = {
        labels: intrusionsProtocolFiltered,
        datasets: [{
            label: 'Intrusions by Protocol',
            data: protocolCounts,
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
            ],
            borderWidth: 1
        }]
    };

    if (pieChart) {
        pieChart.data = pieGraphData;
        pieChart.update();
    } else {
        pieChart = new Chart(pieGraph, {
            type: 'pie',
            data: pieGraphData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'bottom',
                },
                animation: {
                    animateRotate: true,
                    animateScale: false,
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Intrusions Protocol'
                    }
                }
            },
        });
    }
}
