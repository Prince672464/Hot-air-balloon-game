var balloon,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

function setup() {
  database=firebase.database();
  createCanvas(1500,700);
  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonHeight = database.ref('Balloon/Height');
  balloonHeight.on('value', readHeight, showError);
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-5,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(5,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}
function updateHeight(x,y){
  database.ref('Balloon/Position').set({
    'x': height.x + x,
    'y': height.y + y
  });
}
function readHeight(data){
   height = data.val();
   balloon.x = height.x;
   balloon.y = height.y;
}

function showError(){
  console.log("Check values of your database")
}
