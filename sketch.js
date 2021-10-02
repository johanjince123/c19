var path,boy,bottle,prets,juice,fire;
var pathImg,boyImg,bottleImg,pretsImg,juiceImg,fireImg;
var treasureCollection = 0;
var bottleG,pretsG,juiceG,fireGroup,bottle;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("sky.jpg");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  bottleImg = loadImage("bottle.png");
  pretsImg = loadImage("pret.png");
  juiceImg = loadImage("mine.png");
  fireImg = loadImage("fire.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
path=createSprite(width/2,200);
path.addImage(pathImg);

boy = createSprite(width/2,height-20,20);
boy.addAnimation("StickManRunning",boyImg);
boy.scale=0.3;
  
  
bottleG=new Group();
pretsG=new Group();
juiceG=new Group();
fireGroup=new Group();
bottle=new Group();
}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  
    createbottle();
    createprets();
    createjuice();
    createfire();

    
    
    
    if (bottleG.isTouching(boy)) {
      bottleG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (pretsG.isTouching(boy)) {
      pretsG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else if(juiceG.isTouching(boy)) {
      juiceG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(fireGroup.isTouching(boy)) {
        gameState=END;
        
        boy.addAnimation("StickManRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        bottleG.destroyEach();
        pretsG.destroyEach();
        juiceG.destroyEach();
        fireGroup.destroyEach();
        
        bottleG.setVelocityYEach(0);
        pretsG.setVelocityYEach(0);
        juiceG.setVelocityYEach(0);
        fireGroup.setVelocityYEach(0);
        
        if(touches.length>0 || keyDown("SPACE")) {      
          reset();
          touches = []
        }
    }
  }
  

 
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);
  }

}

function createbottle() {
  if (World.frameCount % 200 == 0) {
  var bottle = createSprite(Math.round(random(50, width-350),40, 10, 10));
  bottle.addImage(bottleImg);
  bottle.scale=0.12;
  bottle.velocityY = 9;
  bottle.lifetime = 600;
  bottleG.add(bottle);
  }
}

function createprets() {
  if (World.frameCount % 120 == 0) {
  var prets = createSprite(Math.round(random(50, 350),40, 10, 10));
  prets.addImage(pretsImg);
  prets.scale=0.1;
  prets.velocityY = 9;
  prets.lifetime = 600;
  pretsG.add(prets);
}
}

function createjuice() {
  if (World.frameCount % 300 == 0) {
  var juice = createSprite(Math.round(random(50, width-350),40, 10, 10));
  juice.addImage(juiceImg);
  juice.scale=0.13;
  juice.velocityY = 9;
  juice.lifetime = 600;
  juiceG.add(juice);
  }
}

function createfire(){
  if (World.frameCount % 60 == 0) {
  var fire = createSprite(Math.round(random(50, width-350),40, 10, 10));
  fire.addImage(fireImg);
  fire.scale=0.1;
  fire.velocityY = 9;
  fire.lifetime = 600;
  fireGroup.add(fire);
  }
}