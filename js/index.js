let sequence = [];
let clicksInRound = [];
//load an array of length 20 for a new game - random selections of red, blue, yellow and green.
function setSequence() {
  let color = "";
  for (let i=0; i < 20; i++) {
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

setSequence();
console.log(sequence);

function checkIsCorrect(arr) {
  for (let i=0; i<arr.length; ) {
    if (arr[i] !== sequence[i]) {
      console.log('try again');
      return false;
    }
  }
  console.log('Hooray!!!');
  return true;
}

$(".game-button").click(function() {
  clicksInRound.push(this.id);
  checkIsCorrect(clicksInRound);
});



// var running = false;
// var strict = true;
// var testArray = [];
// var round = 0;
// var sequencePlaying = false;
// var clicksInRound = [];
// var currentRoundSequence = [];
// var whereInRound = 0;

// //strict button - change strict on or off. Only allow functionality if game
// //is not in progress.
// $("#strict").click(function() {
//   if (running === false) {
//     if (strict === false) {
//       strict = true;
//       $("#strict").html("On");
//     } else if (strict === true) {
//       strict = false;
//       $("#strict").html("Off");
//     }
//   }
// });

// //clear the sequence for a new game
// function clearSequence() {
//   sequence = [];
// }

// //function to load sound effects
// function playSound(path) {
//   var audioElement = document.createElement('audio');
//   audioElement.setAttribute('src', path);
//   audioElement.play();
// }

// //click sequence functions to work with user selection through clicks and also for display
// //during automated sequencing.
// function playRedInSequence() {
//   $("#red").addClass("highlight");
//   playSound("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
//   setTimeout(function() {
//     $("#red").removeClass("highlight");
//   }, 350);
// }

// function playBlueInSequence() {
//   $("#blue").addClass("highlight");
//   playSound("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
//   setTimeout(function() {
//     $("#blue").removeClass("highlight");
//   }, 350);
// }

// function playYellowInSequence() {
//   $("#yellow").addClass("highlight");
//   playSound("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
//   setTimeout(function() {
//     $("#yellow").removeClass("highlight");
//   }, 350);
// }

// function playGreenInSequence() {
//   $("#green").addClass("highlight");
//   playSound("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
//   setTimeout(function() {
//     $("#green").removeClass("highlight");
//   }, 350);
// }

// //function to check if the click is incorrect or correct.
// function checkClickIsCorrect() {
//   //if the players selection is wrong
//   if (currentRoundSequence[whereInRound-1] != clicksInRound[whereInRound-1]) {
//     if (strict === true) {
//       //GAME OVER NOISE AND MESSAGE
//       running = false;
//       $("#start-reset").html("Start");
//       round = 0;
//       clicksInRound = [];
//       whereInRound = 0;
//       $("#round").html(round);
//       clearSequence();
//     } else if (strict === false) {
//       //ERROR MESSAGE AND ROUND RESTART MESSAGE
//       round--;
//       newRound();
//     // clicksInRound = [];
//     // currentRoundSequence = [];
//     // whereInRound = 0;
//     // $("#round").html(round);
//     }
//   }
//   //if player has reached the end of the round
//   if (arraysEqual(currentRoundSequence, clicksInRound) === true) {
//     round++;
//     clicksInRound = [];
//     whereInRound = 0;
//     $("#round").html(round);
//     newRound();
//   }
// }

// //check array iteratively to see if they are equal
// function arraysEqual(arr1, arr2) {
//   if (arr1.length !== arr2.length) {
//     return false;
//   }
//   for (var i = arr1.length; i--;) {
//     if (arr1[i] !== arr2[i])
//       return false;
//   }
//   return true;
// }

// //function to generate new round sequence
// function generateNewRoundSequence() {
//   currentRoundSequence = [];
//   for (i = 0; i < round; i++) {
//     currentRoundSequence.push(sequence[i]);
//   }
// }

// //this plays the sequence they are currently on to the player
// function displayCurrentSequence(round) {
//   for (var i = 0; i <= (round - 1); i++) {
//     sequencePlaying = true;
//     setTimeout(function() {
//       sequencePlaying = false;
//     }, (1000 * round));
//     if (sequence[i] === "red") {
//       setTimeout(function() {
//         playRedInSequence();
//       }, (1000 * i));
//     } else if (sequence[i] === "blue") {
//       setTimeout(function() {
//         playBlueInSequence();
//       }, (1000 * i));
//     } else if (sequence[i] === "yellow") {
//       setTimeout(function() {
//         playYellowInSequence();
//       }, (1000 * i));
//     } else if (sequence[i] === "green") {
//       setTimeout(function() {
//         playGreenInSequence();
//       }, (1000 * i));
//     }
//   }
// }

// //Function to run at the beginning of every new round.
// function newRound() {
//   //if player gets to round 21 (i.e. completes 20 separate rounds) then they have
//   //achieved victory.
//   if (round === 21) {
//     //SOME COOL VICTORY STUFF
//   } else {
//     generateNewRoundSequence();
//     displayCurrentSequence(round);
//     //what to do when user clicks color panel while playing
//     $(".game-button").click(function() {
//       if (sequencePlaying === false && running === true) {
//         if ($(this).is("#red")) {
//           playRedInSequence();
//           clicksInRound.push("red");
//           whereInRound++;
//           checkClickIsCorrect();
//         } else if ($(this).is("#blue")) {
//           playBlueInSequence();
//           clicksInRound.push("blue");
//           whereInRound++;
//           checkClickIsCorrect();
//         } else if ($(this).is("#yellow")) {
//           playYellowInSequence();
//           clicksInRound.push("yellow");
//           whereInRound++;
//           checkClickIsCorrect();
//         } else if ($(this).is("#green")) {
//           playGreenInSequence();
//           clicksInRound.push("green");
//           whereInRound++;
//           checkClickIsCorrect();
//         }
//       }
//     });
//   }
// }

// //run game
// function game() {
//   if (round === 0) {
//     round++;
//     $("#round").html(round);
//     newRound();
//   }
// }

// //start or reset game button
// $("#start-reset").click(function() {
//   if (sequencePlaying === false) {
//     if (running === false) {
//       running = true;
//       setSequence();
//       game();
//       $("#start-reset").html("Reset");
//     } else if (running === true) {
//       running = false;
//       $("#start-reset").html("Start");
//       round = 0;
//       $("#round").html(round);
//       clearSequence();
//     }
//   }
// });

