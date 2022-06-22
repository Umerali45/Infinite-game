var path,mainRunner,coin
var player1 
var pathImg,mainRunnerImg1,mainRunnerImg2,coinImg1,coinImg2
  
var PLAY=1;
var END=0;
var gameState=PLAY;
 
var distance=0;
var gameOver,restart;

function preload(){

pathImg  = loadImage("pathImg.png");
mainRuunner1Img = loadImage("mainRunner.jpg","mainRunner2.jpg");
mainRunner2Img  = loadImage("mainRunner3.jpg");
coinImg1=loadImage("coinImg1.png")
gameOverImg  = loadImage("gameOver.png");
restartImg  =  loadImage("restart.png");


}

function setup() {

 createCanvas(1200,300) ;  

 path =createSprite(100,150);
 path.addImage(pathImg);
 path.velocityX = -5;
  
  mainRunner = createSprite(70,150);
  mainRunner.addAnimation("RahulRunning",mainRunnerImg1);
  mainRunner.scale=0.07;

  mainRunner.setCollider("rectangle",0,0,40,40);
     
  gameOver = createSprite(650,150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  restart = createSprite(650,150); 
  restart.addImage(gameOverImg);
  restart.scale = 0.8;
  restart.visible = false;
  
  coinG=new Group();

}

function draw() 
 background(0);

 drawSprites();
 
if(gameState===PLAY){
  distance = distance + Math.round(getFrameRate()/50);
  path.velocityX = -(6 + 2*distance/150);
 
  mainRunner.y = world.mouseY;

  edges= createEdgeSprites();
  mainRunner .collide(edges);

  if(path.x < 0){
  path.x = width/2;
  }

  createCoin();

  if (coinG.isTouching(mainRunner)) {
    coinG.destroyEach();
    treasureCollection=treasureCollection+50;
  }

  coinG.destroyEach();

  coinG.setVelocityYEach(0);

  function createCoin() 
    if (World.frameCount % 200 == 0) {
    var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
    coin.addImage(cashImg);
    coin.scale=0.12;
    coin.velocityY = 3;
    coin.lifetime = 150;
    coinG.add(coin);
    }


 else if (gameState === END){
   gameOver.visible = true;

   textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
   
    path.velocityX = 0;
    mainRunner.velocityY = 0;
    mainRunner.addAnimation("RahulRunning" , mainRunnerImg2);

    if(keyDown("UP_ARROW")) {
      reset();
    }

}

function reset(){
gameState= PLAY
gameOver.visible = false;
  mainRunner.addAnimation("RahulRunning", mainRunnerImg1);


 distance=0 ;
}


}