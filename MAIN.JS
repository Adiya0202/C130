song="";
leftWrist_x="";
leftWrist_y="";
rightWrist_x="";
rightWrist_y="";
scoreRightWrist=0;
scoreLeftWrist=0;

function preload(){
song= loadSound("Song_1.mp3");
}

function setup(){
canvas= createCanvas(400,400);
canvas.center();

video= createCapture(VIDEO);
video.hide();

poseNet= ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotResult);
}

function modelLoaded(){
    console.log('poseNet is initialised');
}

function gotResult(results){

    if(results.length > 0){
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        scoreRightWrist= results[0].pose.keypoints[10].score;
        console.log("score leftWrist="+scoreLeftWrist+"score rightWrist="+scoreRightWrist);
        leftWrist_x= results[0].pose.leftWrist.x;
        leftWrist_y= results[0].pose.leftWrist.y;
        console.log("leftWrist_x="+leftWrist_x+"leftWrist_y="+leftWrist_y);
        rightWrist_x= results[0].pose.rightWrist.x;
        rightWrist_y= results[0].pose.rightWrist.y;
        console.log("rightWrist_x="+rightWrist_x+"rightWrist_y="+rightWrist_y);
    }
}

function draw(){
image(video, 0,0,400,400);
fill("#9966cc");
stroke("#9966cc");

if (scoreLeftWrist > 0.2){
    circle(leftWrist_x, leftWrist_y, 20);
 inNumberLeftWristY= Number(leftWrist_y);
 newLeftWrist= floor(inNumberLeftWristY * 2);
 leftWristDivide= newLeftWrist/1000;
 document.getElementById("song_volume").innerHTML="Volume: "+leftWristDivide;
 song.setVolume(leftWristDivide);
}
if (scoreRightWrist > 0.2){
    circle(rightWrist_x, rightWrist_y, 20);
   if(rightWrist_y >= 0 && rightWrist_y <= 100){
       song.rate(0.5);
       document.getElementById("song_speed").innerHTML= "Speed: 0.5x";
   }
   if(rightWrist_y >= 100 && rightWrist_y <= 200){
    song.rate(1);
    document.getElementById("song_speed").innerHTML= "Speed: 1x";
}
if(rightWrist_y >= 200 && rightWrist_y <= 300){
    song.rate(1.5);
    document.getElementById("song_speed").innerHTML= "Speed: 1.5x";
}
if(rightWrist_y >= 300 && rightWrist_y <= 400){
    song.rate(2);
    document.getElementById("song_speed").innerHTML= "Speed: 2x";
}
if(rightWrist_y >= 400){
    song.rate(2.5);
    document.getElementById("song_speed").innerHTML= "Speed: 2.5x";
}
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}