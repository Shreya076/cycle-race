var path,mainCyclist;
var obst1; var obst2; var obst3;
var pathImg,mainRacerImg1,mainRacerImg2;
var bellSound;
var END =0;
var PLAY =1;
var gameState = PLAY;
var player1;var player2; var player3;
var distance=0;
var pinkCG;
var gameOver;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
   oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img=loadAnimation("images/opponent3.png");
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img=loadAnimation("images/opponent6.png");
   oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img=loadAnimation("images/opponent9.png");
  bellSound=loadSound("bell.mp3");
  obstacle1img=loadAnimation("images/obstacle1.png");
  obstacle2img=loadAnimation("images/obstacle2.png");
  obstacle3img=loadAnimation("images/obstacle3.png");
}

function setup(){
  
createCanvas(1200,300);
  
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150,20,20);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
  pinkCG= new Group();
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState===PLAY){
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(4 + 2*distance/150);
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
     var select_oppPlayer = Math.round(random(1,3));
    var selectObstacle=Math.round(random(1,3));
    
    if(mainCyclist.isTouching(pinkCG)){
     gameState=END;
    }
    
    if(gameState==END){
      player1.changeAnimation("collided",oppPink2Img);
      player2.changeAnimation("collided",oppYellow2Img);
      player3.changeAnimation("collided",oppRed2Img);
      path.velocityX=0;
      player1.velocityX==0;
      player2.velocityX==0;
      player3.velocityX==0;
      mainCyclist.changeAnimation("collided",mainRacerImg2);
       gameOver.visible = true;
    }
    
    if (KeyDown(UP_ARROW)){
      restart();
    }
    if(mousePressedOver(mainCyclist)){
      bellSound.play;
    }
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    }else  if (select_oppPlayer == 2) {
      yellowCyclists();
    }else  if (select_oppPlayer == 3) {
      redCyclists();
    }
  }
    if(world.frameCount%60==0){
      if(selectObstacle==1){
        obst1();
      }else if (selectObstacle==2){
        obst2();
      }else if (selectObstacle==3){
        obst3();
    }
    }
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
    
 }
  //pinkCyclists();
}


function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer1",oppYellow1Img);
        player2.setLifetime=170;
        pinkCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer2",oppRed1Img);
        player3.setLifetime=170;
        pinkCG.add(player3);
}

function obstacles(){
  obst1 =createSprite(1136,Math.round(random(50, 250)));
        obst1.scale =0.06;
        obst1.velocityX = -(6 + 2*distance/150);
        obst1.addAnimation("obstacle1",obstacle1img);
        obst1.setLifetime=170;
        pinkCG.add(obst1);
}

function obstacles(){
  obst2 =createSprite(1176,Math.round(random(50, 250)));
        obst2.scale =0.06;
        obst2.velocityX = -(6 + 2*distance/150);
        obst2.addAnimation("obstacle2",obstacle2img);
        obst2.setLifetime=170;
        pinkCG.add(obst2);
}

function obstacles(){
  obst3 =createSprite(1036,Math.round(random(50, 250)));
        obst3.scale =0.06;
        obst3.velocityX = -(6 + 2*distance/150);
        obst3.addAnimation("obstacle3",obstacle3img);
        obst3.setLifetime=170;
        pinkCG.add(obst3);
}

function reset(){
  gameState=PLAY;
   gameOver.visible=false;
   pinkCG.destroyEach()
  mainCyclist.changeAnimation("running",mainRacerImg1);
  player1.changeAnimation("run",oppPink1Img);
  player2.changeAnimation("run run",oppYellow1Img);
  player3.changeAnimation("comeon run",oppRed1Img);
  
  score=0;
}
