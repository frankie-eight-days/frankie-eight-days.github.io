var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

var backgroundImages = {};
var numBackgroundImages = 2;
var backgroundWidth = 1440;
var backgroundHeight = 320;
bgt = [];

for(i=0; i < numBackgroundImages; i++)
{
	backgroundImages[i] = new Image();
	backgroundImages[i].src = "bg.png";

	bgt[i] = {x: i*backgroundWidth, y: 0};
}


var x = canvas.width/2 + 100;
var y = 250;
var playerWidth = 15;
var playerHeight = 40;
var speedX = 2; 
var speedY = -2;
var gravity = 2;
var jump = false;
var playerImage = new Image();
playerImage.src = "rocketMan.png";

var leftPressed = false;
var rightPressed = false;
var up = false;
var down = false;

var gameStart = false;

var numberOfClouds = 2;
var cloudWidth = 240;
var cloudHeight = 15;
var cloudSpacing = 350;
var cloudImages = {}; 

clouds = [];
for(i=0; i < numberOfClouds; i++)
{
	cloudImages[i] = new Image();
	cloudImages[i].src = 'cloudStrife.png';

	clouds[i] = {x: 300, y: canvas.height-cloudHeight};
	clouds[i].x = i*cloudSpacing;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("click", getGameStart);

function getRandomInt(min, max) 
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function keyDownHandler(e)
{
	if(e.keyCode == 68)
	{
		rightPressed = true;
	}
	else if(e.keyCode==65)
	{
		leftPressed=true;
	}
	else if(e.keyCode==87 && jump == false)
	{
		jump = true;
		gravity = -17;
	}
}

function keyUpHandler(e)
{
	if(e.keyCode == 68)
	{
		rightPressed = false;
	}
	if(e.keyCode == 65)
	{
		leftPressed = false;
	}
	if(e.keyCode==83)
	{
		y = 0;
	}
}

function getGameStart()
{
	if(!gameStart)
	{
		gameStart = true;
	}else
	{
		gameStart = false;
		x = 200;
		y = 0;
	}

}

function drawPlayer()
{
	ctx.beginPath();
	//ctx.rect(x, y, playerWidth, playerHeight);
	ctx.drawImage(playerImage, x, y, 20, 40);
	ctx.fill();
	ctx.closePath();
}

function playerMovement()
{
	if(jump && gravity < 2)
	{
		gravity += 1;
	}
	// Temp: Needs fixing.
	if(y + playerHeight > 200 && gravity > 1)
	{
		jump = false;
	}
	y+=gravity;

	if(rightPressed && x < canvas.width-playerWidth) 
	{
    	x += 3;
	}
	else if(leftPressed && x > 0) 
	{
    	x -= 3;
	}
	else if(up && y > 0)
	{
		y -= 3;
	}else if(down && y+playerHeight < canvas.height)
	{
		y += 3;
	}
}

function drawClouds()
{
	for(i=0; i < numberOfClouds; i++)
	{
		ctx.beginPath();
        //ctx.rect(clouds[i].x, clouds[i].y, cloudWidth, cloudHeight);
        ctx.drawImage(cloudImages[i], clouds[i].x, clouds[i].y-10);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
	}
}

function cloudHitDetection()
{
	for(i=0; i < numberOfClouds; i++)
	{
		if(x + playerWidth > clouds[i].x && x < clouds[i].x + cloudWidth)
		{
			if(y < clouds[i].y + cloudHeight && y + playerHeight > clouds[i].y)
			{
				if(y > clouds[i].y)
				{
					y = clouds[i].y + cloudHeight;
				}
				else if(y + playerHeight > clouds[i].y)
				{
					y = clouds[i].y - playerHeight;
				}
				else if(x < clouds[i].x)
				{
					x = clouds[i].x-playerWidth;
				}
				else if(x > clouds[i].x)
				{
					x = clouds[i].x + cloudWidth;
				}
			}
		}
	}
}

function movePlatforms()
{
	// Move player too, to give apperance of standing
	x -= 1;

	for(i=0; i < numberOfClouds; i++)
	{
		clouds[i].x = clouds[i].x - 1;

		if(clouds[i].x + cloudWidth < 0)
		{
			clouds[i].x = canvas.width;
			clouds[i].y = canvas.height-cloudHeight-getRandomInt(0, 100);
		}
	}
}

function drawBackgroundImage()
{
	for(i=0; i < numBackgroundImages; i++)
	{
		bgt[i].x -= 0.1;
		ctx.beginPath();
		ctx.drawImage(backgroundImages[i], bgt[i].x, bgt[i].y);
		ctx.closePath();

		if(bgt[i].x < -1440)
		{
			bgt[i].x = 1440;
		}
	}
}

function gameloop()
{
	if(gameStart)
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBackgroundImage();
		movePlatforms();
		drawPlayer();
		drawClouds();
		cloudHitDetection();
		playerMovement();

	}else
	{
		drawBackgroundImage();
		ctx.font = "30px Arial";
		ctx.fillStyle = "black";
		ctx.fillText("Click To Play!",140,180);
	}

}
setInterval(gameloop, 5);
