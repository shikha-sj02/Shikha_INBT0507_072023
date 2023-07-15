console.log("Welcome to Spotify");
let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');

let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songItems= Array.from(document.getElementsByClassName('songItem'));

let audioElement = new Audio('songs/1.mp3');
let songs = [
    {
        songName: "Sunrise", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"
    },
    {
        songName: "Labyrinth", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"
    },
    {
        songName: "Occarina", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"
    },
    {
        songName: "Rhythm", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"
    },
    {
        songName: "Ripples", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"
    },
    {
        songName: "Spacious", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"
    },
    {
        songName: "Xtreme Tone", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"
    },
    {
        songName: "Fantasy Blue", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"
    }
]
songItems.forEach((element,i) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText=songs[i].songName;
});
///handle play/pause click
masterPlay.addEventListener('click',(e)=>{
    if(audioElement.paused||audioElement.currentTime<=0){
        audioElement.play();
        makeAllplay()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity=1;
        
    }else{
        audioElement.pause();
        makeAllplay()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity=0;
    }
})

//listen to event
audioElement.addEventListener("timeupdate",()=>{
    console.log('timeUpdate');
    ///update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  
    myProgressBar.value= progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
const makeAllplay=()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
            element.classList.remove('fa-circle-pause')
            
            element.classList.add('fa-circle-play')
    })    
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
     
  if(audioElement.paused||audioElement.currentTime<=0){
    makeAllplay();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play')
    e.target.classList.add('fa-circle-pause')
    audioElement.src=`songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime=0; 
    audioElement.play()
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-circle-play')    
 masterPlay.classList.add('fa-circle-pause')

}else{

    makeAllplay();
    songIndex = parseInt(e.target.id);
    e.target.classList.add('fa-circle-play')
    e.target.classList.remove('fa-circle-pause')
    audioElement.src=`songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime=0; 

    audioElement.pause()
    gif.style.opacity=0;
       masterPlay.classList.remove('fa-circle-pause')    
 masterPlay.classList.add('fa-circle-play')

  }
})
})
document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }else{
        songIndex+=1;

    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play()
  masterPlay.classList.remove('fa-circle-play')    
 masterPlay.classList.add('fa-circle-pause')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }else{
        songIndex-=1;

    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
mastersongname.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')    
 masterPlay.classList.add('fa-circle-pause')
})
