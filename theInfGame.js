"use strict"
let ctx;
let yPlayer = 275;
let xHitR = 217;
let xHitR2 = 237;
let yHitR = 290;
let yHitR2 = 260;

let coordination = [75,125,175,225,275,325,375,425,475];


function theGame(){
    let canvas=document.getElementById('playZone');
    ctx = canvas.getContext('2d');

    mapDisplay();
    theSecondBall();
    timer();
}

function arrows(e){
    let key1 = e.key;
    e.stopPropagation();
    if (key1 == "ArrowUp"){
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 
        yPlayer-=50;
        yHitR-=50;
        yHitR2-=50;
        //Bigger or equal than 25 because it'll decrease further
        if (yPlayer>=25){

            // hitBox(xHitR,xHitR2,yHitR,yHitR2);


        //SMaller than 0 because 25-50=-25
        } else if (yPlayer<0){
            //make another drawings
            yPlayer+=50;
            yHitR+=50;
            yHitR2+=50;
            redrawGreen();
            // theSecondBall();

            // hitBox(xHitR,xHitR2,yHitR,yHitR2);
        }
    } else if (key1 == "ArrowDown"){
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 
        yPlayer+=50;
        yHitR+=50;
        yHitR2+=50;
        if (yPlayer<=75){

            redrawGreen();

        } else if(yPlayer>500){
            yPlayer-=50;
            yHitR-=50;
            yHitR2-=50;

        }
    } else if(key1 == "ArrowLeft"){
        xHitR = 179;
        xHitR2 = 160;
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 
        redrawGreen();
    } else if (key1 == "ArrowRight"){
        xHitR = 217;
        xHitR2 = 237;
        if (yPlayer != coordination[positionSpawner[positionIndex]]){
            ctx.clearRect(1,yPlayer-24,398,48);
        } 
        redrawGreen();
    }
}

//the position
let movingGhost = 350;
let timing;
let speed = 30;
function timer(){
    //so that they can also show up with the arow key
    if (timing == undefined){
    // timing = clearInterval(timer);
        timing = setInterval(runHand, speed);
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
    if (movingGhost <= 24 || movingGhost >= 375){
        flipPos*=-1;
    }
}

let positionIndex = 0;
let positionSpawner = [];
function randomBalls(){
    for (let i=0; i<2; i++){
        let thePosition = Math.random()*9;
        thePosition = Math.floor(thePosition);
        positionSpawner.push(thePosition);
    }
}

//Remember to set variable for this one
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

let text = "Go Catch a Ball!";
let shovelUpDown = 0;
//countpoint
let countingBalls = 0;
function theSecondBall(){
    let Distance = Math.sqrt(Math.pow((xHitR2-movingGhost),2)+Math.pow(((yHitR-15)-coordination[positionSpawner[positionIndex]]), 2));
    let distanceToPlayer = Math.sqrt(Math.pow((200-movingGhost),2)+Math.pow((yPlayer-coordination[positionSpawner[positionIndex]]), 2));

    if ((Distance <= 20&&shovelUpDown==0)){
        ctx.clearRect(1,yPlayer-24,398,48);
        drawPlayer(yPlayer);
        positionIndex+=1;
        text = "You have caught a ball!! Take it home. Don't get hit!"
        shovelUpDown++;
        movingGhost=350;

        clearInterval(timing);
        timing=undefined;
        if (countingBalls%10==0){
            flipPos*=1.2;
        }

        runHand();
        timer();
    }else if(distanceToPlayer<=45||(Distance <= 20&&shovelUpDown==1)){
        text="You were hit!! Please try again!" + " Your score is "+ countingBalls;

        ctx.clearRect(1,yPlayer-24,398,48);
        shovelUpDown = 1;
        drawPlayer(yPlayer);
        timing = clearInterval(timing);
    }else if (text == "You have caught a ball!! Take it home. Don't get hit!"){
        if (yPlayer != 25){
            ctx.clearRect(1,yPlayer-24,398,48);
            drawPlayer(yPlayer);
            drawBallWP(yPlayer);
        }else{
            text="Go catch another ball";
            //call count ball here
            countingBalls++;
            ballUnder(countingBalls);
            // if (countingBalls==10){
            //     text = "You've won!!";
            //     timing = clearInterval(timing);
            ctx.clearRect(1,yPlayer-24,398,48);
            ctx.clearRect(1,yPlayer+25,398,48);
            redrawGreen();
            // }
            shovelUpDown--;
        }
    }else{
        drawPlayer(yPlayer);
    }
    randomBalls();
    // randomBalls();
    document.getElementById('willChangeEventually').innerHTML=text;
}

//this is the point counter
function ballUnder(countThis){
    ctx.clearRect(1,550,398,50);
    ctx.beginPath();
    ctx.fillText("You score is: "+countThis,50,570);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

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

function balls(x,y){
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
}

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

function redrawGreen(){
    ctx.beginPath();
    ctx.rect(1,0,400,50);
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillText("Home", 20, 25);
    ctx.fill();
    ctx.stroke();
}

function resetTheGame(){
    ctx.clearRect(1,yPlayer-24,398,48);
    // ctx.clearRect(1,coordination[positionSpawner[positionIndex]]-24,398,48);
    redrawGreen();
    yPlayer=275;
    movingGhost = 350;
    xHitR = 217;
    xHitR2 = 237;
    yHitR = 290;
    yHitR2 = 260;
    text = "Catch a ball and bring it home";
    theSecondBall();
    countingBalls = 0;
    shovelUpDown = 0;
    // timing=undefined;
    ballUnder(countingBalls);
    hitBox(xHitR,xHitR2,yHitR,yHitR2);
    // timing = undefined;
    // clearInterval(timing);
    flipPos = 1;
    // randomBalls();
    runHand();
    timer();
}

//Bugs:
// 1.Flicker player whenever hold
// 2.Player border
// 3.the ball spawning