var spaceship, spaceshipImg;
var spacebackground, spacebackgroundImg;
var meteor, meteorImg, meteorsGroup;
var score = 0;
var gameState = "play";
var bottomEdge

function preload(){
    spaceshipImg = loadImage("spaceship_image.jpeg")
    spacebackgroundImg = loadImage("spacebackground_image.jpeg");
    meteorImg = loadImage("meteor_image.png");
    meteorsGroup = new Group();
}

function setup() {
    createCanvas(600,600);
    spacebackground = createSprite(300,300);
    spacebackground.addImage("background",spacebackgroundImg);
    spacebackground.velocityY = 2;
    spacebackground.scale = 3.5;
    
    spaceship = createSprite(200,200);
    spaceship.addImage("runner",spaceshipImg);
    spaceship.scale = 0.5;

    bottomEdge = createSprite(10,590,600,10);
    bottomEdge.visible = false;

    score = 0;
 
}

function draw() {
    background(200);


    if(gameState == "play"){

       if(spacebackground.y > 350){
           spacebackground.y = 300;
       } 
       if(keyDown("up")){
        spaceship.velocityY = -5;
       }
       spaceship.velocityY = spaceship.velocityY + 0.5;
       if(keyDown("right")){
        spaceship.x = spaceship.x + 5;
       }
       if(keyDown("left")){
        spaceship.x = spaceship.x - 5;
       }
       if(spaceship.isTouching(meteorsGroup) || spaceship.isTouching(bottomEdge)){
           spaceship.velocityY = 0;
           gameState = "end";
       }
       if(frameCount % 2 === 0){
           score = score + 1;
       }
       
       spawnMeteors();
       drawSprites();   
    }
    if(gameState == "end"){
        fill("red");
        stroke("blue");
        strokeWeight(6);
        textFont("Alegerya");
        textSize(25);
        text("Game Over, Thanks for playing", 150, 250);
    
    }

    textSize(30);
    fill("yellow");
    text("Score: "+ score,50,50);
    
}

function spawnMeteors(){
    if(frameCount % 300 === 0){
        meteor = createSprite(150,50);
        meteor.addImage("obstacle",meteorImg);
        meteor.scale = 0.1;
        meteor.velocityY = 2;
        meteor.x = Math.round(random (100, 500));
        meteor.lifetime = 900;
        meteorsGroup.add(meteor);

        spaceship.depth = meteor.depth;
        spaceship.depth = spaceship.depth + 1;
    }
}