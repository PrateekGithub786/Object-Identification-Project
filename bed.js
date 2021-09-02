img = "";
object = [];
status = "";

function preload(){
    img = loadImage("bed.jpg");
}

function setup(){
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetect = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statusBed").innerHTML = "Status : Detecting Object";
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetect.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error)
    }
    console.log(results);
    object = results;
}

function draw(){
    image(img, 0, 0, 600, 400);

    if(status != ""){
        for(i = 0; i < object.length; i++){
            document.getElementById("statusBed").innerHTML = "Status : Object Detected";
            document.getElementById("objectsBed").innerHTML = "There are " + object.length + "objects";
            fill(255, 0, 0);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + " %", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("red");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            
        }
    }
}
