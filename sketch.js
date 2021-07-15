var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle,obstacleGroup,obstacle1Img,obstacle2mg,obstacle3Img,obstacle4Img,obstacle5Img,obstacle6Img;

var score=0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1Img = loadImage("obstacle1.png");
  obstacle2Img = loadImage("obstacle2.png");
  obstacle3Img = loadImage("obstacle3.png");
  obstacle4Img = loadImage("obstacle4.png");
  obstacle5Img = loadImage("obstacle5.png");
  obstacle6Img = loadImage("obstacle6.png");
 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  cloudsGroup=createGroup();
  obstacleGroup=createGroup();
}

function draw() {
  background("white");

  //create score
  text('Score : '+score,500,40);
  score=score+Math.round(frameCount/100);
  
  
  if(keyDown("space")&& trex.y >= 130) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  trex.collide(invisibleGround);
  
  //spawn the clouds
  spawnClouds();
  spawnObstacle();
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //assigning lifetime to the variable
    cloud.lifetime = 200;
    cloudsGroup.add(cloud);
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    }
}



//create spawn obstacle
function spawnObstacle(){

  if(frameCount % 120===0){

  
  obstacle=createSprite(600,165,10,40);
  obstacle.velocityX = -4;

  var cactus = Math.round(random(1,6));
  switch(cactus){
    
    case 1:
      obstacle.addImage(obstacle1Img);
      break;

      case 2:
      obstacle.addImage(obstacle2Img);
      break;

      case 3:
      obstacle.addImage(obstacle3Img);
      break;

      case 4:
      obstacle.addImage(obstacle4Img);
      break;

      case 5:
      obstacle.addImage(obstacle5Img);
      break;

      case 6:
      obstacle.addImage(obstacle6Img);
      break;

      default:
      break;
  }
    obstacle.scale=0.5;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
