let audio = document.getElementById('music');
audio.volume = 0.5

document.getElementById('poke').addEventListener('click', function (){
    window.location.href = "/Juego-poke/juego.html"
})

document.getElementById('rpg').addEventListener('click', function(){
    window.location.href = "/Juego-RPG/index-rpg.html"
})

document.getElementById('volumen').addEventListener('click', function (){
    if(audio.paused){
        audio.play()
        
    }else{
        audio.pause()
    }
})

audio.play();

