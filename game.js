var gameSequence=[];
var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var loc=0;
$(document).keydown(function(){
  nextSequence();
});
$(".btn").click(function(){
  var userChosenColour=this.id;
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  checkAnswer(loc++);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});
function startOver(){
  gameSequence=[];
  level=0;
}
function playSound(name){
  var aud1=new Audio("sounds/"+name+".mp3");
  aud1.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(loc){
  if(userClickedPattern[loc]!=gameSequence[loc]){
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  else{
    if(userClickedPattern.length==gameSequence.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
}

function nextSequence(){
  level=level+1;
  loc=0;
  $("h1").text("Level "+level);
  userClickedPattern=[];
  var randomNumber=Math.floor((Math.random()*3)+1);
  var randomChosenColour=buttonColours[randomNumber];
  gameSequence.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
