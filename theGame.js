"use strict"

//draw everything
let ctx;

//Position of player
let yPlayer = 275;

//position of the hands
let xHitR = 217;
let xHitR2 = 237;
let yHitR = 290;
let yHitR2 = 260;

//position that ball suppose to spawn
let coordination = [75,125,175,225,275,325,375,425,475];

//draw
function theGame(){
    let canvas=document.getElementById('playZone');
    ctx = canvas.getContext('2d');

    randomBalls();
    theSecondBall();
    mapDisplay();
    timer();
    console.log(positionSpawner);
}

//set keys to draw
function arrows(e){
    let key1 = e.key;
    // e.stopPropagation();

    //key ups
    if (key1 == "ArrowUp"){

        //this one fix a ball flickering bug
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        }
        //player move as the key is pushed
        yPlayer-=50;
        yHitR-=50;
        yHitR2-=50;

        //player will not leave the map
        if (yPlayer<0){
            //make another drawings
            yPlayer+=50;
            yHitR+=50;
            yHitR2+=50;
            redrawGreen();
        }

    //keys down
    } else if (key1 == "ArrowDown"){

        //fix part of flickering balls bug
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 
        yPlayer+=50;
        yHitR+=50;
        yHitR2+=50;

        //Remove this will make the home lost their color 
        if (yPlayer<=75){

            redrawGreen();

        //prevent player leaviing the map
        } else if(yPlayer>500){
            yPlayer-=50;
            yHitR-=50;
            yHitR2-=50;
        }
    //face left
    } else if(key1 == "ArrowLeft"){
        //where the hand is now facing
        xHitR = 179;
        xHitR2 = 160;

        //ball flicker bug
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 

        //pressed then delete and redraw green
        redrawGreen();

    //face right
    } else if (key1 == "ArrowRight"){
        //where the hand is now facing
        xHitR = 217;
        xHitR2 = 237;
        //flicker bug
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 
        redrawGreen();
    }
}

//the position of the player
let movingGhost = 350;
let timing;
function timer(){
    //so that they can also show up with the aroow key
    if (timing == undefined){
        timing = setInterval(runHand, 10);
    }
}

let flipPos = 1;
function runHand(){
    movingGhost -=flipPos;
    //45 because of the border, bug: we can see the outline of the clear rect
    ctx.clearRect(1,coordination[positionSpawner[positionIndex]]-24,398,48);
    //if distance< then ball after, reverse
    theSecondBall();
    balls(movingGhost,coordination[positionSpawner[positionIndex]]);
    if (text != "You have caught a ball!! Take it home. Don't get hit!"){
        hitBox(xHitR,xHitR2,yHitR,yHitR2);
    }
    if (movingGhost == 24 || movingGhost == 376){
        flipPos*=-1;
    }
}

//when the web load, it will load the spawning order to apply into coordination
let positionIndex = 0;
let positionSpawner = [];
function randomBalls(){
    for (let i=0; i<10; i++){
        let thePosition = Math.random()*9;
        thePosition = Math.floor(thePosition);
        positionSpawner.push(thePosition);
    }
}

//Draw player
function drawPlayer(yPos){

    ctx.beginPath();
    //ear1(x-25,y-20)
    ctx.arc(200-25,yPos-15,10,0*Math.PI,180*Math.PI);
    //earmove(x+30,y-20)
    ctx.moveTo(235,yPos-15);
    //ear2(x+35,y-35)
    ctx.arc(200+25,yPos-15,10,0*Math.PI,180*Math.PI);
    ctx.stroke();

    //face(x,y)
    ctx.beginPath();
    ctx.arc(200, yPos, 25, 0*Math.PI,180*Math.PI);
    ctx.fillStyle = "#997950";
    ctx.fill();
    ctx.stroke();

    //mouth(x,y+10)
    ctx.beginPath();
    ctx.arc(200, yPos+10, 15,0*Math.PI,180*Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();

    //lines(x-5,y-24)
    ctx.beginPath();
    ctx.moveTo(200-5,yPos-24);
    //lines(x-2,y-10)
    ctx.lineTo(200-2,yPos-10);
    //lines(x+2,y-10)
    ctx.lineTo(200+2,yPos-10);
    //lines(x+5,y-24)
    ctx.lineTo(200+5,yPos-24);
    ctx.stroke();

    ctx.beginPath();
    //nose(x-2,y-10)
    ctx.moveTo(200-2,yPos-10);
    //nose(x-1,y-5)
    ctx.lineTo(200-1,yPos-5);
    //nose(x+1,y-5)
    ctx.lineTo(200+1,yPos-5);
    //nose(x+2,y-10)
    ctx.lineTo(200+2,yPos-10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    //eyes(x-13,y-10)
    ctx.arc(200-13,yPos-10,5,180*(Math.PI/180),0*Math.PI);
    //eyes(x+8, y-10)
    ctx.moveTo(200+8,yPos-10);
    //eyes(x+12,y-10)
    ctx.arc(200+12,yPos-10,5,180*(Math.PI/180),0*Math.PI);
    ctx.lineWidth = "2";
    ctx.stroke();
    ctx.lineWidth = "1";

    ctx.beginPath();
    //upperteeth(x-5,y-3)
    ctx.moveTo(200-5,yPos-3);
    //upperteeth(x-2,y+5)
    ctx.lineTo(200-2,yPos+5);
    //upperteeth(x+3,y+5)
    ctx.lineTo(200+3,yPos+5);
    //upperteeth(x+6,y-3)
    ctx.lineTo(200+6,yPos-3);
    //(x,y-3)
    ctx.moveTo(200,yPos-3);
    //(x,y+1)
    ctx.lineTo(200,yPos+1);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    //downteeth(x-3,y+24)
    ctx.moveTo(200-3,yPos+24);
    //downteeth(x-2,y+15)
    ctx.lineTo(200-2, yPos+15);
    //downteeth(x+3,y+15)
    ctx.lineTo(200+3,yPos+15);
    //teethdown(x+4,y+24)
    ctx.lineTo(200+4, yPos+24);
    ctx.fillStyle = "white";
    ctx.fill();
}

//draw the ball on the player
function drawBallWP(ypos){ 

    //face(x,y)
    ctx.beginPath();
    ctx.arc(200, ypos, 25, 0*Math.PI,180*Math.PI);
    ctx.fillStyle = "#997950";
    ctx.fill();
    ctx.stroke();

    //mouth1(x-35,y+15)
    ctx.beginPath();
    ctx.arc(200-20, ypos+10, 15, 0*Math.PI,180*Math.PI);
    ctx.fillStyle = "#997950";
    ctx.fill();
    ctx.stroke();

    //mouth2(x+35,y+15)
    ctx.beginPath();
    ctx.arc(200+20, ypos+10, 15, 0*Math.PI,180*Math.PI);
    ctx.fillStyle = "#997950";
    ctx.fill();
    ctx.stroke();

    //lines(x-5,y-24)
    ctx.beginPath();
    ctx.moveTo(200-5,ypos-24);
    //lines(x-2,y-10)
    ctx.lineTo(200-2,ypos-10);
    //lines(x+2,y-10)
    ctx.lineTo(200+2,ypos-10);
    //lines(x+5,y-24)
    ctx.lineTo(200+5,ypos-24);
    ctx.stroke();

    ctx.beginPath();
    //nose(x-2,y-10)
    ctx.moveTo(200-2,ypos-10);
    //nose(x-1,y-5)
    ctx.lineTo(200-1,ypos-5);
    //nose(x+1,y-5)
    ctx.lineTo(200+1,ypos-5);
    //nose(x+2,y-10)
    ctx.lineTo(200+2,ypos-10);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.stroke();


    ctx.beginPath();
    //eyes(x-13,y-10)
    ctx.arc(200-13,ypos-10,5,180*(Math.PI/180),0*Math.PI);
    //eyes(x+8, y-10)
    ctx.moveTo(200+8,ypos-10);
    //eyes(x+12,y-10)
    ctx.arc(200+12,ypos-10,5,180*(Math.PI/180),0*Math.PI);
    ctx.lineWidth = "2";
    ctx.stroke();
    ctx.lineWidth = "1";

    ctx.beginPath();
    //mouth(x,y+15)
    ctx.arc(200,ypos+15,5,0*Math.PI,180*(Math.PI/180));
    ctx.lineWidth = "2";
    ctx.stroke();
    ctx.lineWidth = "1";
}

//player behavious depends on the text
let text = "Go Catch a Ball!";
//like a switch, decide whethe player caught the ball or not(0 is no, 1 is yes)
let shovelUpDown = 0;
//count point, and this is the cheat code
let countingBalls = 0;

//main function of catch, lost, get score
function theSecondBall(){
    let Distance = Math.sqrt(Math.pow((xHitR2-movingGhost),2)+Math.pow(((yHitR-15)-coordination[positionSpawner[positionIndex]]), 2));
    let distanceToPlayer = Math.sqrt(Math.pow((200-movingGhost),2)+Math.pow((yPlayer-coordination[positionSpawner[positionIndex]]), 2));

    //if the distance <=20 and player is not holding any balls
    if ((Distance <= 20&&shovelUpDown==0)){
        ctx.clearRect(1,yPlayer-24,398,48);
        drawPlayer(yPlayer);
        //spawn a new ball
        positionIndex+=1;
        //change the text
        text = "You have caught a ball!! Take it home. Don't get hit!"
        //set the ball to hold 1
        shovelUpDown++;
        //now the ball is no longer spawn at old position after caught
        movingGhost=350;

    //If touch on the player back, or ball touch while holding a ball
    }else if(distanceToPlayer<=45||(Distance <= 20&&shovelUpDown%2==1)){
        //losing text
        text="You were hit!! Please try again!";

        //stop the whole game
        timing = clearInterval(timing);
        ctx.clearRect(1,yPlayer-24,398,48);
        drawPlayer(yPlayer);
    //If the ball is caught
    }else if (text == "You have caught a ball!! Take it home. Don't get hit!"){
        //while haven't reached the home
        if (yPlayer != 25){
            ctx.clearRect(1,yPlayer-24,398,48);
            drawPlayer(yPlayer);
            //now player have 1 more ball spawn on it
            drawBallWP(yPlayer);
        //after reach home
        }else{
            //text to get another ball
            text="Go catch another ball";
            //call to set the point
            countingBalls++;
            //ball will be displayed as point
            ballUnder(countingBalls);
            //if reach 10, won
            if (countingBalls==10){
                text = "You've won!!";
                timing = clearInterval(timing);
                ctx.clearRect(1,yPlayer-24,398,48);
                redrawGreen();
            }
            //player will no longer hold the ball
            shovelUpDown--;
        }
    }else{
        //must draw player for every event
        drawPlayer(yPlayer);
    }
    //call it so the timer can be activated
    // randomBalls();
    //text will be updated
    document.getElementById('willChangeEventually').innerHTML=text;
}

//this is the point counter
function ballUnder(countThis){
    // ctx.clearRect(1,550,398,50);
    //will display point visually
    for (let i = 1;i<=countThis;i++){
        ballNew(i*20,575);
    }
}

//will draw the point visually, base on the ballUnder
function ballNew(x,y){
    ctx.beginPath();
    ctx.arc(x,y,10,0,2*Math.PI);
    ctx.fillStyle = "red";
    ctx.lineWidth = "8"
    ctx.stroke();
    ctx.fill();
    ctx.lineWidth = "1";

    ctx.beginPath();
    ctx.moveTo(x+5,y-10);
    ctx.arc(x,y-10,5,0,180*(Math.PI/180));
    ctx.lineWidth = "2";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x-15,y-24);
    ctx.arc(x-15,y-10,15,270*(Math.PI/180),0);
    ctx.stroke();
    ctx.lineWidth = "1";
}

//draw the ball that moves around the map
function balls(x,y){
    if (target){
        ctx.beginPath();
        ctx.arc(x,y,17,0,2*Math.PI);
        ctx.fillStyle = "red";
        ctx.lineWidth = "8"
        ctx.stroke();
        ctx.fill();
        ctx.lineWidth = "1";

        ctx.beginPath();
        ctx.moveTo(x+5,y-10);
        ctx.arc(x,y-10,5,0,180*(Math.PI/180));
        ctx.lineWidth = "2";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x-15,y-24);
        ctx.arc(x-15,y-10,15,270*(Math.PI/180),0);
        ctx.stroke();
        ctx.lineWidth = "1";
    //the original design
    } else{
        ctx.beginPath();
        ctx.arc(x,y,17,0,2*Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}

//draw the hands
function hitBox(xHit,xHit2,yHit,yHit2){
    //Hitbox
    ctx.beginPath();
    ctx.moveTo(xHit,yHit);
    ctx.lineTo(xHit2,yHit);
    ctx.lineWidth = "1";
    // minus 30
    ctx.moveTo(xHit,yHit2);
    ctx.lineTo(xHit2,yHit2);
    ctx.stroke();
}

//draw the map
function mapDisplay(){
    let y = 50;

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(0, y);
    for (let i = 1; i<10; i++){
        ctx.rect(0,y,400,50);
        ctx.stroke();
        y+=50;
        // console.log(y);
    }
//the green part needs to be second for hitbox to show up??
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.rect(0,0,400,50);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0,502);
    ctx.lineWidth = "5";
    ctx.lineTo(400,502);
    ctx.moveTo(420,430);
    ctx.fillStyle = "black";
    ctx.fillText("Caught balls", 10, 530);
    ctx.fillText("Home", 20, 25);
    ctx.stroke();
    ctx.lineWidth = "1";
}

//sometimes when move, the home part will disapear
function redrawGreen(){
    ctx.beginPath();
    ctx.rect(1,0,400,50);
    ctx.fillStyle = "green";
    ctx.fill();

    //write the word home
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillText("Home", 20, 25);
    ctx.fill();
    ctx.stroke();
}

//reset button
function resetTheGame(){
    //clean everything up
    ctx.clearRect(1,yPlayer-25,398,48);
    ctx.clearRect(1,coordination[positionSpawner[positionIndex]]-25,398,48);
    ctx.clearRect(1,560,398,29);

    //if the player is at the home, clean player then redraw home color
    if (yPlayer == 25){
        redrawGreen();
    }
    //set the position for the ghost again
    movingGhost=350;

    //set the player position back to original place
    yPlayer=275;
    //set the hitbox to original place
    xHitR = 217;
    xHitR2 = 237;
    yHitR = 290;
    yHitR2 = 260;

    //reset the point
    countingBalls = 0;

    //set the player, now it'll not hold any balls
    shovelUpDown = 0;

    //reset the text
    text = "Go Catch a Ball!";

    //restore everything
    theSecondBall();
    //random these balls
    randomBalls();
    //redraw hitbox
    hitBox(xHitR,xHitR2,yHitR,yHitR2);
    //reset timer
    timer();

    //color changing by random
    let theNumbers = backgroundColorChange();
    if(theNumbers<0.2){
        bckgr = "black";
        target= false;
    } else if(theNumbers<15){
        bckgr = "white";
    } else if(theNumbers<25){
        bckgr = "cyan";
    } else if(theNumbers<50){
        bckgr = "burlywood";
    }
    document.body.style.backgroundColor = bckgr;
}

let bckgr = "#6fc276";
let target = true;
function backgroundColorChange(){
    let randomizer = Math.random()*100;
    return randomizer
}
//Bugs:
// 1.Flicker player whenever hold
// 2.Player border
// 3.the ball spawning