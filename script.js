/* ==================================
   Store the shuffle animation timer

   We save the interval ID so we can
   stop the binary shuffling later
   using clearInterval().
================================== */
let shuffleInterval;

/* ==================================
   Virus Animation Timer
================================== */

let virusInterval;
/* ==================================
   Current User
================================== */

let currentUser = "";

/* ==================================
   Get HTML Elements
================================== */
const binary =
    document.getElementById("binary");

const decoder =
    document.getElementById("decoder");


const systemPanel =

    document.getElementById("systemPanel");

const terminal =

    document.getElementById("terminal");

const usernameInput =

    document.getElementById("usernameInput");

const progressContainer =

    document.getElementById("progressContainer");

const progressFill =

    document.getElementById("progressFill");

const birthdayScreen =

    document.getElementById("birthdayScreen");

const birthdayName =

    document.getElementById("birthdayName");

const birthdayWish =

    document.getElementById("birthdayWish");

const systemMessage =

    document.getElementById("systemMessage");

const systemContent =

    document.getElementById("systemContent");
/* ==================================
   Set Initial Terminal State
================================== */

terminal.classList.add(

    "normal"

);

/* ==================================
   Load Initial System Panel
================================== */

normalSystemPanel();

/* ==================================
   Mission-Success.exe
================================== */

generateBinary();


/* ==================================
   Generate Binary Screen
================================== */
function generateBinary() {

    let lineCount = 0;

    function addLine() {

        // Stop after 12 lines
        if (lineCount >= 12) {

            // Start decoding after binary appears
            setTimeout(
                startDecoding,
                1000
            );

            return;
        }

        // Type one line of binary
        typeBinaryLine(

            randomBinary(),

            () => {

                lineCount++;

                addLine();
            }
        );
    }

    addLine();
}


/* ==================================
   Create Random Binary Line

   Example:
   01010101 11001010 10101010
================================== */
function randomBinary() {

    let line = "";

    // Create 6 binary blocks
    for (let i = 0; i < 6; i++) {

        let block = "";

        // Each block contains 8 bits
        for (let j = 0; j < 8; j++) {

            block +=
                Math.random() > 0.5
                    ? "1"
                    : "0";
        }

        line += block + " ";
    }

    return line;
}
/* ==================================
   Generate Clean Binary

   Used after reboot only.
================================== */

function generateCleanBinary(){

    binary.innerHTML = "";

    for(

        let i = 0;

        i < 12;

        i++

    ){

        binary.innerHTML +=

            randomBinary()

            + "<br>";

    }

}
/* ==================================
   Shuffle Existing Binary
================================== */
function shuffleBinary() {

    shuffleInterval = setInterval(() => {

        const chars =
            binary.innerHTML.split("");

        const updated =
            chars.map(char => {

                // Randomly flip some bits
                if (char === "0" &&
                    Math.random() < 0.08) {

                    return "1";
                }

                if (char === "1" &&
                    Math.random() < 0.08) {

                    return "0";
                }

                return char;
            });

        binary.innerHTML =
            updated.join("");

    }, 100);

}
/* ==================================
   Binary Infection
================================== */

function infectBinary(){

    virusInterval = setInterval(() => {

        let chars =

            binary.innerHTML.split("");

        chars = chars.map(char => {

            if(

                Math.random() < 0.08 &&

                char !== "<" &&

                char !== ">"

            ){

                const virus = [

                    "#",

                    "@",

                    "X",

                    "%",

                    "&",

                    "$",

                    "!"

                ];

                return virus[

                    Math.floor(

                        Math.random() *

                        virus.length

                    )

                ];

            }

            return char;

        });

        binary.innerHTML =

            chars.join("");

    },80);

}
/* ==================================
   Screen Flicker
================================== */
function flashScreen() {

    terminal.classList.add(

        "flash"

    );

    setTimeout(() => {

        terminal.classList.remove(

            "flash"

        );

    }, 450);

}
/* ==================================
   System Panel

   Normal State
================================== */
function normalSystemPanel() {

    systemPanel.innerHTML = `

<pre>
MISSION-SUCCESS.exe

STATUS : ONLINE

MODE   : SEARCH

GPS    : OFF

THREAT : LOW
</pre>

`;

}

/* ==================================
   System Panel

   Danger State
================================== */
function dangerSystemPanel() {

    systemPanel.innerHTML = `

<pre>
MISSION-SUCCESS.exe

STATUS : ERROR

MODE   : OFFLINE

GPS    : LOST

THREAT : <span class="blink">CRITICAL</span>
</pre>

`;

}
/* ==================================
   System Panel

   Warning State
================================== */

function warningSystemPanel(){

    systemPanel.innerHTML = `

<pre>
MISSION-SUCCESS.exe

STATUS : WARNING

MODE   : SCANNING

ACCESS : AUTHORIZED

THREAT : HIGH
</pre>

`;

}

/* ==================================
   Type Binary Character By Character
================================== */
function typeBinaryLine(

    text,

    callback

) {

    let index = 0;

    const typing = setInterval(() => {

        binary.innerHTML +=
            text[index];

        index++;

        // Line Finished
        if (index >= text.length) {

            clearInterval(typing);

            binary.innerHTML +=
                "<br>";

            if (callback) {

                callback();
            }
        }

    }, 10);
}


/* ==================================
   Stage 1.5

   Show:
   Decoding Binary Stream...
================================== */
function startDecoding() {

    decoder.innerHTML =
            "Decoding Binary Stream..." +
            "<span id='cursor'>█</span>";

        shuffleBinary();

        setTimeout(

            decodeWords,

            5000

        );

const cursor =
    document.getElementById("cursor");


    /* =============================
       Blink Cursor
    ============================== */
    setInterval(() => {

        cursor.style.visibility =

            cursor.style.visibility ===
            "hidden"

                ? "visible"

                : "hidden";

    }, 500);
}
/* ==================================
   Stage 2

   Target Verification
================================== */
function decodeWords() {

    // Stop binary shuffling
    clearInterval(shuffleInterval);

    const messages = [

        "TARGET FOUND",

        "VERIFYING IDENTITY...",

        "CHECKING SECURITY LEVEL..."

    ];

    let index = 0;

    const messageInterval = setInterval(() => {

        decoder.innerHTML +=
            "<br><br>" +
            messages[index];

        index++;

        // Stage 2 Finished
        if (index >= messages.length) {

            clearInterval(messageInterval);

            // Start Stage 3 after Stage 2
            setTimeout(

                startStage3,

                2000

            );
        }

    }, 1500);

}
/* ==================================
   Stage 3

   System Breach
================================== */
function startStage3() {

        flashScreen();

        setTimeout(()=>{

            terminal.classList.remove(

                "normal",
                "warning"

            );

            terminal.classList.add(

                "danger"

            );

        },400);

    decoder.innerHTML =

        "████ SECURITY ALERT ████" +

        "<br><br>UNKNOWN PROCESS DETECTED" +

        "<br>CHECKING SYSTEM...";

    setTimeout(

        startDebugMode,

        2500

    );

}
/* ==================================
   Stage 3.1

   Debug Mode
================================== */
function startDebugMode() {

    decoder.innerHTML =

        "---------------------------" +

        "<br>DEBUG MODE ACTIVATED" +

        "<br><br>ENTER USERNAME TO CONTINUE" +

        "<br><br>USER:";

    usernameInput.style.display =

        "block";

    usernameInput.focus();

}
/* ==================================
   Username Authentication
================================== */

usernameInput.addEventListener(

    "keydown",

    function(event){

        if(event.key !== "Enter"){

            return;

        }

        const username =

            usernameInput.value.trim();

        if(username === ""){

            alert(

                "Enter username."

            );

            return;

        }

        currentUser =

            username;

        usernameInput.style.display =

            "none";

        decoder.innerHTML =

            "AUTHENTICATING..." +

            "<br><br>Hello, <span class='blink'>" +

            currentUser +

            "</span>." +

            "<br><br>Checking Identity...";

        setTimeout(

            securityScan,

            2500

        );

    }

);
/* ==================================
   Stage 3.5

   Security Scan
================================== */

function securityScan(){

    decoder.innerHTML =

        "ACCESS GRANTED" +

        "<br><br>Welcome, " +

        currentUser +

        "." +

        "<br><br>Initializing Secure Environment...";

    setTimeout(() => {

        decoder.innerHTML =

            "SYSTEM SCAN..." +

            "<br><br>Threat Level : LOW";

    }, 2000);

    setTimeout(() => {

        decoder.innerHTML =

            "SYSTEM SCAN..." +

            "<br><br>Threat Level : MEDIUM";

    }, 4000);

    setTimeout(() => {

        warningSystemPanel();

        decoder.innerHTML =

            "SYSTEM SCAN..." +

            "<br><br>Threat Level : HIGH";

    },6000);

    setTimeout(

        startVirusAttack,

        5000

    );

}
/* ==================================
   Stage 4

   Virus Attack
================================== */

function startVirusAttack(){

    flashScreen();

    infectBinary();

    terminal.classList.add(

        "shake",

        "glitch"

    );

    decoder.innerHTML =

        "Secure Environment Loaded." +

        "<br><br>Monitoring Background Processes..." +

        "<br><br>Please Wait...";

    setTimeout(() => {

        flashScreen();

        dangerSystemPanel();

        decoder.innerHTML =

            "⚠ WARNING ⚠" +

            "<br><br>Suspicious Process Detected..." +

            "<br>Scanning Memory...";

    }, 1500);

    setTimeout(() => {

        decoder.innerHTML =

            "████ VIRUS DETECTED ████" +

            "<br><br>Core Files Infected..." +

            "<br>Attempting Isolation...";

    }, 2500);

    setTimeout(

        startSystemFailure,

        4000

    );

}
/* ==================================
   Stage 5

   System Failure
================================== */

function startSystemFailure(){

    decoder.innerHTML =

        "SYSTEM FAILURE" +

        "<br><br>Critical Files Corrupted..." +

        "<br>Emergency Reboot Required.";

    setTimeout(

        startReboot,

        1500

    );

}
/* ==================================
   Stage 6

   Emergency Reboot
================================== */

function startReboot(){

    terminal.classList.remove(

        "shake",

        "glitch"

    );

    decoder.innerHTML =

        "SYSTEM REBOOT REQUIRED" +

        "<br><br>Restarting Core Modules...";

    document.getElementById(

        "progressContainer"

    ).style.display = "block";

    startProgress();

}
/* ==================================
   Stage 7

   Reboot Progress
================================== */

function startProgress(){

    let progress = 0;

    progressFill.style.width = "0%";

    const loading = setInterval(() => {

        progress += 2;

        progressFill.style.width =

            progress + "%";

        decoder.innerHTML =

            "SYSTEM REBOOTING..." +

            "<br><br>" +

            progress +

            "% Completed";

        if(progress >= 100){

            clearInterval(

                loading

            );

            setTimeout(

                startRecovery,

                800

            );

        }

    },50);

}
/* ==================================
   Stage 8

   Recovery
================================== */

function startRecovery(){

    clearInterval(

        virusInterval

    );

    terminal.classList.remove(

        "danger",

        "shake",

        "glitch"

    );

    terminal.classList.add(

        "normal"

    );

    normalSystemPanel();

    binary.innerHTML = "";

    generateCleanBinary();

    progressContainer.style.display =

        "none";

    decoder.innerHTML =

        "SYSTEM RESTORED" +

        "<br><br>Recovering Encrypted Files..." +

        "<br><br>Verifying Data Integrity...";

    setTimeout(

        startArchive,

        1300

    );

}
/* ==================================
   Terminal Typing Effect
================================== */

function typeMessage(

    message,

    speed,

    callback

){

    decoder.innerHTML = "";

    let index = 0;

    const typing = setInterval(() => {

        if(message[index] === "\n"){

            decoder.innerHTML += "<br>";

        }else{

            decoder.innerHTML += message[index];

        }

        index++;

        if(index >= message.length){

            clearInterval(

                typing

            );

            if(callback){

                callback();

            }

        }

    }, speed);

}
/* ==================================
   Stage 9

   Secure Archive
================================== */

function startArchive(){

    typeMessage(

`SYSTEM RESTORED...

Searching Secure Archive...

Archive Located...

MISSION-SUCCESS.pkg

Encryption Level : ALPHA`,

        15,

        () => {

            setTimeout(

                startDecrypt,

                800

            );

        }

    );

}
/* ==================================
   Stage 10

   Decrypt Package
================================== */

function startDecrypt(){

    progressContainer.style.display =

        "block";

    progressFill.style.width =

        "0%";

    let progress = 0;

    const decrypt = setInterval(() => {

        progress += 2;

        progressFill.style.width =

            progress + "%";

        decoder.innerHTML =

            "Decrypting MISSION-SUCCESS.pkg..." +

            "<br><br>" +

            progress +

            "%";

        if(progress >= 100){

            clearInterval(

                decrypt

            );

            setTimeout(

                startMissionSuccess,

                1000

            );

        }

    },40);

}
/* ==================================
   Stage 11

   Mission Success
================================== */

function startMissionSuccess(){

    progressContainer.style.display =

        "none";

    decoder.innerHTML =

        "MISSION SUCCESS" +

        "<br><br>Package Verified." +

        "<br><br>Opening Secure Message...";

    setTimeout(

        startBirthdayReveal,

        1000

    );

}
/* ==================================
   Stage 12

   Birthday Reveal
================================== */
function startBirthdayReveal(){

    terminal.style.display =

        "none";

    birthdayScreen.style.display =

        "flex";

    birthdayName.innerHTML =

        currentUser.toUpperCase();

    birthdayWish.innerHTML =

        "Wishing you success,<br>" +

        "good health,<br>" +

        "happiness,<br>" +

        "and endless opportunities.<br><br>" +

        "May every dream become reality.";

    setTimeout(

        showSystemMessage,

        5000

    );

}
function showSystemMessage(){

    systemMessage.classList.add(

        "show"

    );

    systemContent.innerHTML =

`Generating Birthday Happiness...

████████████████████ 100% ✔

Memory Saved.................✔

Friendship Verified..........✔

Cake Request Sent............✔

Awaiting User Response...

> Party dene mat bhul na! 🎂😄`;

    setTimeout(() => {

        systemMessage.classList.remove(

            "show"

        );

    }, 5000);

}