# Simon Game

http://jamesriall.co.uk/simon-game/

## The Project

A web replication of the classic game of memory - Simon! Built with HTML, CSS, and Javascript using jQuery as part of the freeCodeCamp Front End Curriculum.

After turning the game on and starting, users are displayed a sequence of tones and lights, with the game requiring the player to repeate the series to progress to the next level. Levels increase the sequence by one step each round, and the tempo with which the game displays the sequence increases halfway throught the game.

Users have the ability to reduce or increase the level at which the game is completed (default is 20), and the ability to turn 'Strict Mode' on and off (an incorrect selection with strict mode on results in a game reset, with strict mode off, users only have to restart the level).

Planned feature additions - ability to select difficulty (i.e. increase or decrease the tempo of the sequence the game displays to the user each round), and a timer which resets the game if the user takes too long to make a selection.

![ScreenShot](http://res.cloudinary.com/jamesriall/image/upload/v1469029646/simon_mock_up_juwvn1.png)

## The Logic

Once the game loads I generate a new game sequence - an array with 20 strings of either "red", "green", "blue", or "yellow". Whenever the game starts or a new round is started, the game plays through the sequence up until the current round the users is on. Panels are lit up by adding and removing a 'highlight' class on a setTimeout delay, and one of four sounds is played using HTML5 audio - this occurs either when the game plays through the new round sequence or when the user selects a panel when it is his/her turn to select panels to to complete the current round's sequence.

If a users selection is wrong then all the panels light up, an error sound is played and the game is either restarted (if strict mode is on) or the user is sent to the start of the current round again. Position within the round is measured by the clicksInRound array which firstly checks if the user selection is correct when compared against the correct sequence array, and secondly allows for the game to check its length to determine if a user has completed a round or completed the game. If the user has completed the round (clicksInRound values are all correct and length === round numnber) then the round is incremented by one and the new round sequence is played. If the user has completed the game (clicksInRound values are all correct and length > 20) then the handleWin function is called which plays a victory sound, highlights all of the panels, displays a victory message and resets the game after a brief delay.

