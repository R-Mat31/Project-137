var status = "";
var objects = [];
function setup(){
 canvas = createCanvas(300, 300);
 canvas.position(490, 250);
 video = createCapture(VIDEO);
 video.hide();
}
function start(){
 objectDetector = ml5.objectDetector("cocossd", model_loaded);
 document.getElementById("status").innerHTML = "Status: Detecting Objects";
 object = document.getElementById("object").value;
 object.toLowerCase();
}
function model_loaded(){
 console.log("Model Loaded");
 status = true;
 objectDetector.detect(video, got_result);
}
function draw(){
 image(video, 0, 0, 300, 300);
 if(status != ""){
  for(i = 0; i < objects.length; i++){
   document.getElementById("status").innerHTML = "Status: Object Found";
   accuracy = floor(objects[i].confidence * 100) + "%";
   objectName = objects[i].label;
   x = objects[i].x;
   y = objects[i].y;
   fill("red");
   text(objectName + ": " + accuracy, x, y);
   stroke("red");
   noFill();
   rect(x, y, objects[i].width, objects[i].height);
   if(object == objectName){
    video.stop();
    objectDetector.detect(got_result);
    document.getElementById("found_or_not").innerHTML = "The object mentioned was found.";
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance("The object mentioned was found");
    synth.speak(utterThis);
   }
   else{
    document.getElementById("found_or_not").innerHTML = "The object mentioned was not found.";
   }
  }
 }
}
function got_result(error, result){
 if(error){
  console.error(error);
 }
 else{
  console.log(result);
  objects = result;
 }
}