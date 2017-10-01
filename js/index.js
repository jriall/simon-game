let sequence = [];
let clicksInRound = [];
let currentRound = 0;
let strict = true;
let gameRunning = false;
let gameSwitchedOn = false;
let sequenceRunning = false;
let tempo = 1000;
let gameLength = 20;

//load an array for a new game - random selections of red, blue, yellow and green.
function setSequence() {
    let color = "";
    for (let i = 0; i < gameLength; i++) {
        //change back to 20 when ready
        color = Math.floor(Math.random() * 4 + 1);
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
    let audioElement = document.createElement("audio");
    audioElement.setAttribute("src", path);
    audioElement.play();
}

//reset game
function reset() {
    gameRunning = false;
    currentRound = 0;
    clicksInRound = [];
    $("#round").html("--");
    tempo = 1000;
}

//handle turning the game on and off
$(".on-off-button").click(function() {
    if (this.id == "on-button" && gameSwitchedOn === false) {
        gameSwitchedOn = true;
        $("#on-button").css("background-color", "blue");
        $("#off-button").css("background-color", "black");
    } else if (this.id == "off-button" && gameSwitchedOn === true) {
        gameSwitchedOn = false;
        $("#off-button").css("background-color", "blue");
        $("#on-button").css("background-color", "black");
        reset();
    }
});

//handle clicking the start/reset button
$("#start-reset").click(function() {
    if (gameSwitchedOn) {
        if (!gameRunning) {
            gameRunning = true;
            sequence = [];
            setSequence();
            currentRound = 1;
            changeRound();
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

//handle player winning the game
function handleWin() {
    playSound("sounds/win.mp3");
    $("#round").html("W");
    $(".game-button").addClass("highlight");
    setTimeout(function() {
        $(".game-button").removeClass("highlight");
    }, 350);
    setTimeout(function() {
        reset();
    }, 3000);
}

//handle player completing a round
function changeRound() {
    $("#round").html(currentRound);
    clicksInRound = [];
    if (currentRound === Math.floor(gameLength / 2)) {
        tempo = 750;
    }
    displayRoundSequence();
    gameRunning = true;
}

//handle player making a mistake - restart round or restart game (if strict mode is on)
function handleWrong() {
    playSound("sounds/mistake.mp3");
    $(".game-button").addClass("highlight");
    setTimeout(function() {
        $(".game-button").removeClass("highlight");
    }, 350);
    if (strict) {
        //game reset
        reset();
    } else if (!strict) {
        //restart round
        currentRound--;
        changeRound();
    }
}

//highlight a color, play sound, and remove highlight for when player clicks or sequence is displaying.
let playColor = function(color) {
    $("#" + color).addClass("highlight");
    playSound("sounds/" + color + "-tone.mp3");
    setTimeout(function() {
        $("#" + color).removeClass("highlight");
    }, 350);
};

//generate the current round sequence and display to the player
let displayRoundSequence = function() {
    sequenceRunning = true;
    let unfreeze = setTimeout(function() {
        sequenceRunning = false;
    }, 1000 * currentRound);
    $(".on-off-button, #start-reset").click(function() {
        clearTimeout(unfreeze);
    });
    for (let k = 0; k < currentRound; k++) {
        let testColor = setTimeout(function() {
            playColor(sequence[k]);
        }, tempo * k + 1500);
        $(".on-off-button, #start-reset").click(function() {
            clearTimeout(testColor);
        });
    }
};

//handle player clicking a color button, checking if correct or wrong and where player is in the round.
$(".game-button").click(function() {
    if (gameRunning && gameSwitchedOn && !sequenceRunning) {
        clicksInRound.push(this.id);
        for (let j = 0; j < clicksInRound.length; j++) {
            if (clicksInRound[j] !== sequence[j]) {
                handleWrong();
                break;
            }
            playColor(this.id);
        }
        if (clicksInRound.length === currentRound) {
            //round completed, new round
            currentRound++;
            if (currentRound === gameLength + 1) {
                return handleWin();
            }
            changeRound();
        }
    }
});

//handle the change level input
$("#level-change").submit(function(event) {
    event.preventDefault();
    gameLength = parseInt(this.elements[0].value);
});
