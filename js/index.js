let sequence = [];
let clicksInRound = [];
let currentRound = 0;
let strict = true;
let gameRunning = false;
let gameSwitchedOn = false;

//load an array of length 20 for a new game - random selections of red, blue, yellow and green.
function setSequence() {
    let color = "";
    for (let i = 0; i < 2; i++) {
        //change back to 20 when ready
        color = Math.floor((Math.random() * 4) + 1);
        switch (color) {
            case 1:
                sequence.push("red");
                break;
            case 2:
                sequence.push("blue");
                break;
            case 3:
                sequence.push("yellow");
                break;
            case 4:
                sequence.push("green");
                break;
        }
    }
}

//function to load sound effects
function playSound(path) {
    let audioElement = document.createElement('audio');
    audioElement.setAttribute('src', path);
    audioElement.play();
}

function reset() {
    gameRunning = false;
    $("#start-reset").html("Start");
    currentRound = 0;
    clicksInRound = [];
    $("#round").html("--");
    // changeRound();
}

$(".on-off-button").click(function() {
    if (this.id == 'on-button' && gameSwitchedOn === false) {
        gameSwitchedOn = true;
        $("#on-button").css("background-color", "blue");
        $("#off-button").css("background-color", "black");
        //POTENTIALLY CHANGE DISPLAY HERE?
    } else if (this.id == 'off-button' && gameSwitchedOn === true) {
        gameSwitchedOn = false;
        $("#off-button").css("background-color", "blue");
        $("#on-button").css("background-color", "black");
        reset();
    }
});

$("#start-reset").click(function() {
    if (gameSwitchedOn) {
        if (!gameRunning) {
            gameRunning = true;
            sequence = [];
            setSequence();
            currentRound = 1;
            changeRound();
            $("#start-reset").html("Reset");
            console.log(sequence);
        } else if (gameRunning) {
            reset();
        }
    }
});

//strict button - change strict on or off. Only allow functionality if game is not in progress.
$("#strict").click(function() {
    if (!gameRunning) {
        if (!strict) {
            strict = true;
            $("#strict-light").css("background-color", "red");
        } else {
            strict = false;
            $("#strict-light").css("background-color", "black");
        }
    }
});

console.log(sequence);

function handleWin() {
    playSound("sounds/win.mp3");
    $("#round").html('W');
    setTimeout(function() {
        reset();
    }, 3000);
}

function changeRound() {
    $("#round").html(currentRound);
    clicksInRound = [];
    displayRoundSequence();
}

function handleWrong() {
    playSound("sounds/mistake.mp3");
    console.log('wrong');
    if (strict) {
        //game reset
        reset();
    } else {
        //restart round
        currentRound--;
        changeRound();
    }
}

function playYellow() {
    $("#yellow").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    setTimeout(function() {
        $("#yellow").removeClass("highlight");
    }, 350);
}

function playRed() {
    $("#red").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    setTimeout(function() {
        $("#red").removeClass("highlight");
    }, 350);
}

function playGreen() {
    $("#green").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    setTimeout(function() {
        $("#green").removeClass("highlight");
    }, 350);
}

function playBlue() {
    $("#blue").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    setTimeout(function() {
        $("#blue").removeClass("highlight");
    }, 350);
}

function displayRoundSequence() {
    for (let k = 0; k < currentRound; k++) {
        setTimeout(function() {
            sequencePlaying = false;
        }, (1000 * currentRound));
        if (sequence[k] === "red") {
            setTimeout(function() {
                playRed();
            }, (1000 * k + 1000));
        } else if (sequence[k] === "blue") {
            setTimeout(function() {
                playBlue();
            }, (1000 * k + 1000));
        } else if (sequence[k] === "yellow") {
            setTimeout(function() {
                playYellow();
            }, (1000 * k + 1000));
        } else if (sequence[k] === "green") {
            setTimeout(function() {
                playGreen();
            }, (1000 * k + 1000));
        }
    }
}

$(".game-button").click(function() {
    if (gameRunning && gameSwitchedOn) {
        clicksInRound.push(this.id);
        for (let j = 0; j < clicksInRound.length; j++) {
            if (clicksInRound[j] !== sequence[j]) {
                handleWrong();
                break;
            }
            if (this.id === 'red') {
                playRed();
            } else if (this.id === 'blue') {
                playBlue();
            } else if (this.id === 'green') {
                playGreen();
            } else if (this.id === 'yellow') {
                playYellow();
            }
        }
        if (clicksInRound.length === currentRound) {
            //round completed, new round
            currentRound++;
            if (currentRound === sequence.length + 1) {
                return handleWin();
            }
            changeRound();
        }
    }
});