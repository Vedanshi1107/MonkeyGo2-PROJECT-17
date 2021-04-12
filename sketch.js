
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,ground,bg,bgimg;

function preload(){
  
  bgimg = loadImage("jungle.jpg");
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,600);
  bg = createSprite(0,20,400,400);
  bg.addImage(bgimg);
  bg.x = bg.width/2;
  
  var survivalTime = 0;
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1

  //creating ground
  ground = createSprite(400,350,900,10);
  ground.visible = false;
  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
 background("black");
  bg.velocityX = -8;
  
  if(bg.x<0){
    bg.x=bg.width/2
  }
  
  if(keyDown("space") && monkey.y>=250){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY+0.8;
  monkey.collide(ground);
  
  OBS();
  
  Food();
  
 drawSprites();
  stroke("white");
  textSize(22);
  fill("white");
  text("Score : " + score, 300, 80);
  
  if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
}

function OBS(){
  if (frameCount % 300 === 0) {
    var stone = createSprite(500, 280, 20, 20);
    stone.addImage(obstacleImage);
    stone.scale = 0.2;
    stone.velocityX = -8;
    stone.lifetime = 64;
    obstaclesGroup.add(stone);
  }

}

function Food(){
  if (frameCount % 80 === 0) {
    banana = createSprite( 600,250,40,10); 
    banana.y = random(120,200); 
    banana.velocityX = -5; 
    banana.lifetime = 65;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    FoodGroup.add(banana);
  }
}
