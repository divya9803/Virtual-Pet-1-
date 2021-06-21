var dog, happyDog;
var database;
var foodS, foodStock;
var dog_img, happydog_img;

function preload()
{
	dog_img = loadImage("dogImg.png");
  happydog_img = loadImage("dogImg1.png");
}

function setup() 
{
	createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(250, 350, 10, 60);
  dog.addImage("dog", dog_img);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);
}


function draw() 
{  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage("dog", happydog_img);
  }

  if(keyWentUp(UP_ARROW))
  {
    dog.addImage("dog", dog_img);
  }

  drawSprites();

  textSize(20);
  fill("white");
  stroke(2);
  text("Note: Press UP_ARROW Key To Feed drago Milk!", 30, 50);
  text("Food Remaining: " + foodS, 150, 150);
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0)
  {
    x = 0
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update(
                            {
                              Food: x
                            })
}