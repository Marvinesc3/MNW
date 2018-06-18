var x = document.getElementById("myAudio");
var holder;

function timeFunction(){
    holder = setTimeout(showContent, 1000);
}
function showContent(){
    document.getElementById("animation").style.display = "none";
    document.getElementById("boatImg").style.display = "block";
    document.getElementById("titleHeader").style.display = "block";
    document.getElementById("nameTag").style.display = "inline-block";
    document.getElementById("playButton").style.display = "inline-block";
    x.play();

}