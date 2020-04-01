var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;


$(document).keypress(function() {
    if (!start) {

        nextSequence();
        start = true;
  }
});

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playAudio(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    console.log(userClickedPattern);
})

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#' + randomChosenColour).fadeIn(75).fadeOut(75).fadeIn(75);

    playAudio(randomChosenColour);
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }

    } else {
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");

        startOver();

        console.log("wrong");
    }
}

function playAudio(input ) {

    switch (input) {
         case "red":
    
            var audioRed = new Audio("sounds/red.mp3");
            audioRed.play();
    
            break;
    
        case "blue":
                
            var audioBlue = new Audio("sounds/blue.mp3");
            audioBlue.play();
    
            break;
        case "green":
                
            var audioGreen = new Audio("sounds/green.mp3");
            audioGreen.play();
    
            break;
    
        case "yellow":
                
            var audioYellow = new Audio("sounds/yellow.mp3");
            audioYellow.play();
    
            break;
    
        default: console.log("Something is wrong");
            break;
        }
}

function animatePress(currentColour) {

    var pressedButton = $("#" + currentColour)
    pressedButton.addClass("pressed");

    setTimeout(function() {
        pressedButton.removeClass("pressed")
    }, 100);

}