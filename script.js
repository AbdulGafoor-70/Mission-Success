/* ==================================
   Store the shuffle animation timer

   We save the interval ID so we can
   stop the binary shuffling later
   using clearInterval().
================================== */
let shuffleInterval;

/* ==================================
   Get HTML Elements
================================== */
const binary =
    document.getElementById("binary");

const decoder =
    document.getElementById("decoder");


/* ==================================
   Start Stage 1 Immediately
================================== */
generateBinary();


/* ==================================
   Generate Binary Screen
================================== */
function generateBinary() {

    let lineCount = 0;

    function addLine() {

        // Stop after 20 lines
        if (lineCount >= 20) {

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

    // Create 8 binary blocks
    for (let i = 0; i < 8; i++) {

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

   Decode Binary Into Words
================================== */
function decodeWords() {

    // Stop binary shuffling
    clearInterval(shuffleInterval);

    const words = [

        "MISSION",
        "SUCCESS",
        "BIRTHDAY"

    ];

    let index = 0;

    const wordInterval = setInterval(() => {

        decoder.innerHTML +=
            "<br><br>FOUND: " +
            words[index];

        index++;

        if (index >= words.length) {

            clearInterval(wordInterval);

        }

    }, 1500);

}