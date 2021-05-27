var gameState="play";


function preload(){
  fireball1=loadImage("images/astroid1.png");
  spaceImage=loadImage("images/space background.jpg");
  earthImage=loadImage("images/earth1.png");
  spaceshipImage=loadImage("images/spaceship.png");
  fireball2=loadImage("images/astroid2.png");
  fireball3=loadImage("images/astroid3.png");
  fireball4=loadImage("images/astroid4.png");
  fireball5=loadImage("images/astroid5.jpg");
  bulletImg=loadImage("images/bullet_ing.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-135);

 earth=createSprite(displayWidth/2,displayHeight-100,5000,100);
 earth.addImage(earthImage);
 earth.scale=1.5

 spaceship=createSprite(500,430,100,20);
 spaceship.addImage(spaceshipImage);
 spaceship.scale=0.2 ;
 
fireballGroup = new Group();
bulletGroup = new Group();
}

function draw() {
  background( spaceImage); 
  if(gameState === "play") {
  if(keyDown("left_arrow")||keyDown("A")){
 spaceship.x=spaceship.x-12;
 }

 if(keyDown("right_arrow")||keyDown("D")){
  spaceship.x=spaceship.x+12;
  }

  spawnfireball();

  if(fireballGroup.isTouching (spaceship)){
    gameState = "repair"
  }



if(keyDown("space")){
var bullet=createSprite(10,10,10,10);
bullet.addImage(bulletImg);
bullet.scale=0.1;
bullet.x=spaceship.x;
bullet.y=spaceship.y;
bullet.velocityY=-5;
bullet.lifetime=50;
bullet.debug=true;
bulletGroup.add(bullet);
bullet.setCollider("circle",0,0,1000);

if(fireballGroup.isTouching(bullet)){
  fireball.destroy();
  console.log("bullet and fireball touch");
 
}
}



}//end of "play"

else if(gameState==="repair"){

}
  drawSprites();
}//end of draw()


function spawnfireball(){
    if (frameCount % 120 === 0){
      var fireball = createSprite(random(100,1000),0,10,40);
      fireball.velocityY = +2 ;
      fireball.scale=0.2;
      fireball.debug=true;
      fireball.setCollider("circle",0,0,1000)

       //generate random obstacles
       var rand = Math.round(random(1,5));
       switch(rand) {
         case 1: fireball.addImage(fireball1);
                 break;
         case 2: fireball.addImage(fireball2);
                 break;
         case 3: fireball.addImage(fireball3);
                 break;
         case 4: fireball.addImage(fireball4);
                 break;
         case 5: fireball.addImage(fireball5);
                 break;
         default: break;
       }
       fireball.lifetime=200;
       if(bulletGroup.isTouching(fireball)){
      fireballGroup.destroy();
         console.log("in spawn fireball")
       }
      
}
}