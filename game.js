var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keydown(function(event){
    if(started == false){
        nextSequence();
    }
    started = true;
    console.log("Key pressed is: " + event.key);
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log("User pattern(clicked) is: " + userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];

    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    $("#" + randomChosenColor).fadeOut(100, function(){
        $(this).fadeIn(100);
    });

    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
    console.log("Game pattern is: " + gamePattern);

    level++;

}

function playSound(name){
    switch(name){
        case "green":
            var greenSound = new Audio("./sounds/green.mp3");
            greenSound.play();
            break;
        case "red":
            var redSound = new Audio("./sounds/red.mp3");
            redSound.play();
            break;
        case "yellow":
            var yellowSound = new Audio("./sounds/yellow.mp3");
            yellowSound.play();
            break;
        case "blue":
            var blueSound = new Audio("./sounds/blue.mp3");
            blueSound.play();
            break;
    }    
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}