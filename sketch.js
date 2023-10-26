var bgImg;
var bg;
var monkey;
var monkeyImg;
var plataformaImg;
var plataformGroup;
var gameState = 1;
var bananaGroup;
var bananaImg;
var num;
var score = 0;
var banana;
var sound;
var soundJump;

function preload(){
    bgImg = loadImage("./assets/Fundo1.jpg");
    monkeyImg = loadAnimation("./assets/monkey1.png","./assets/monkey1.png","./assets/monkey2.png","./assets/monkey2.png");
    bananaImg = loadImage("./assets/banana.png");
    plataformaImg = loadImage("./assets/baseTerra-removebg-preview.png");
    sound = loadSound("./assets/Trilha.mp3");
    soundJump = loadSound("./assets/jump.mp3");
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    //bg = createSprite(300,490,2560,1440);
    //bg.addImage('bg',bgImg);
    //bg.x = bg.width/1;
    //bg.scale = 3;
    monkey = createSprite(width/7,height/2,200,200);
    monkey.addAnimation('monkey',monkeyImg);
    monkey.scale = 2;

    plataformGroup = createGroup();
    bananaGroup = createGroup();
    monkey.setCollider("circle",0,0,25);
    monkey.debug = true;
}

function draw(){
    background(bgImg);
    
    
    //bg.velocityX = -4;
    //if(bg.x<0){
       // bg.x = bg.width/1;
    //}
    if(gameState == 1){
        textSize(50);
        fill("white");
        text(`Pontuação: ${score} ` ,15,45);
       // if(!sound.play()){
           // sound.play();
      // }
        
        if(keyDown('space')){
            monkey.velocityY = -10;
            soundJump.play();
        }
        
        monkey.velocityY += 0.8;
        spawnPlataformas();
        spawnBananas();
        if(bananaGroup.isTouching(monkey)){
            score += 1;
          //  banana.visible = false;
        }
        if(monkey.y > height){
            gameState = 2;
        }
    }else if(gameState == 2){
        swalEnd();
    }
    
    monkey.collide(plataformGroup);
    drawSprites();
    
}

function spawnPlataformas(){
    if(frameCount%80==0){
        var plataform = createSprite(2000,500,300,75);
        plataform.addImage('plataform',plataformaImg);
        num = Math.round(random(350,700));
        plataform.y = num;
        plataform.velocityX = -7;
        plataformGroup.add(plataform);
    }

}

function spawnBananas(){
    if(frameCount%80==0){
        banana = createSprite(2000,500,300,75);
        banana.addImage('banana',bananaImg);
        banana.scale = 0.13;
        banana.y = num-75;
        banana.velocityX = -7;
        bananaGroup.add(banana);
        banana.depth = monkey.depth;
    }
}

function swalEnd(){
    swal({
        title: `Fim de Jogo`,
        text: "Oops você perdeu o jogo!",
        text: "Sua pontuação é: " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Obrigado por jogar"
      },
      function(isConfirm){
        if(isConfirm){
            location.reload();
        }
      }
      );
}