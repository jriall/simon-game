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
    if (this.id == 'on-button' && gameSwitchedOn === false) {
        gameSwitchedOn = true;
        $("#on-button").css("background-color", "blue");
        $("#off-button").css("background-color", "black");
    } else if (this.id == 'off-button' && gameSwitchedOn === true) {
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

//handle player winning the game
function handleWin() {
    playSound("sounds/win.mp3");
    $("#round").html('W');
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

//highlight and play sound for color buttons
let playYellow = function() {
    $("#yellow").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
    setTimeout(function() {
        $("#yellow").removeClass("highlight");
    }, 350);
};

let playRed = function() {
    $("#red").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
    setTimeout(function() {
        $("#red").removeClass("highlight");
    }, 350);
};

let playGreen = function() {
    $("#green").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
    setTimeout(function() {
        $("#green").removeClass("highlight");
    }, 350);
};

let playBlue = function() {
    $("#blue").addClass("highlight");
    playSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
    setTimeout(function() {
        $("#blue").removeClass("highlight");
    }, 350);
};

//generate the current round sequence and display to the player
let displayRoundSequence = function() {
    sequenceRunning = true;
    let unfreeze = setTimeout(function() {
        sequenceRunning = false;
    }, (1000 * currentRound));
    $(".on-off-button, #start-reset").click(function() {
        clearTimeout(unfreeze);
    });
    for (let k = 0; k < currentRound; k++) {
        if (sequence[k] === "red") {
            let testRed = setTimeout(function() {
                playRed();
            }, (tempo * k + 1500));
            $(".on-off-button, #start-reset").click(function() {
                clearTimeout(testRed);
            });
        } else if (sequence[k] === "blue") {
            let testBlue = setTimeout(function() {
                playBlue();
            }, (tempo * k + 1500));
            $(".on-off-button, #start-reset").click(function() {
                clearTimeout(testBlue);
            });
        } else if (sequence[k] === "yellow") {
            let testYellow = setTimeout(function() {
                playYellow();
            }, (tempo * k + 1500));
            $(".on-off-button, #start-reset").click(function() {
                clearTimeout(testYellow);
            });
        } else if (sequence[k] === "green") {
            let testGreen = setTimeout(function() {
                playGreen();
            }, (tempo * k + 1500));
            $(".on-off-button, #start-reset").click(function() {
                clearTimeout(testGreen);
            });
        }
    }
}

//handle player clicking a color button, checking if correct or wrong and where player is in the round.
$(".game-button").click(function() {
    console.log("Gamelength" + gameLength);
    console.log("Current Round" + currentRound);
    if (gameRunning && gameSwitchedOn && !sequenceRunning) {
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