const searchEng = document.getElementById("searchEng");

const placeHolders = [
    'How to detect SYN flood attacks with Snort?',
    'What are common Snort rules for port scans?',
    'How to identify ICMP flooding attacks in Snort?',
    'How to configure Snort to detect ARP spoofing?',
    'What are the best Snort rules for detecting DNS attacks?',
    'How does Snort identify brute force attacks?',
    'How to detect network reconnaissance with Snort?',
    'How to analyze Snort logs for botnet activity?',
    'What Snort rules are used for detecting man-in-the-middle attacks?',
    'How to use Snort to detect IP spoofing?',
    'What are effective Snort rules for detecting malware communication?',
    'How to monitor for unusual network traffic patterns with Snort?',
    'How to detect SSH brute force attacks using Snort?',
    'How to write Snort rules for detecting ransomware?',
    'How to use Snort to identify command and control traffic?',
    'What Snort rules help in detecting zero-day network attacks?',
    'How to configure Snort for detecting data exfiltration?',
    'How to detect malicious network traffic with Snort?',
    'What are Snort rules for detecting unauthorized network access?',
    'How to identify network scanning activities with Snort?'
];
var placeHInterval;

function GeneratePlaceHolders() {
    var networkConcept = placeHolders[Math.floor(Math.random() * (placeHolders.length))];
    var networkConceptArray = networkConcept.split("");
    searchEng.placeholder = "";
    for (var i = 0; i < networkConceptArray.length; i++) {
        (function(index) {
            setTimeout(() => { searchEng.placeholder += networkConceptArray[index]; }, 50 * index);
        })(i);
    }
}
GeneratePlaceHolders();
placeHInterval = setInterval(GeneratePlaceHolders, 7000);