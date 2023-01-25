//Iniciacion de Variables
let uncapCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let hits = 0;
let tempo = false;
let timer = 30;
let initTime = 30;
let timeId = undefined;

//SONIDOS
let winAudio = new Audio('/Juego-poke/sounds/win.wav');
let loseAudio = new Audio('/Juego-poke/sounds/lose.wav');
let clickAudio = new Audio('/Juego-poke/sounds/click.wav');
let rightAudio = new Audio('/Juego-poke/sounds/right.wav');
let wrongAudio = new Audio('/Juego-poke/sounds/wrong.wav');



//Apuntando al html
let showMoves = document.getElementById('movimiento');
let showHits = document.getElementById('aciertos');
let showTime = document.getElementById('tiempo-restante');
let result = document.getElementById('resultado');
let btn = document.getElementsByClassName('btn')
let message = document.getElementById('mensaje');

mensaje.innerHTML = 'Da click sobre un recuadro para comenzar';

document.addEventListener('click', function () {
  setTimeout(() =>{
    mensaje.innerHTML = '';
  },3000)
    
})


//Generacion de numeros aleatorios
//queremos que regrese un arreglo numeros aleatorios del -0.5 al 0.5.
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => {

    return Math.random() - 0.5
    
});
console.log(numbers)

//Funciones
function countTime (){
    //Establece el contador hacia atras.
    timeId = setInterval(() => {
        timer--;

        showTime.innerHTML = `Tiempo: ${timer} segundos`
        //Comprueba si el contador a llegado a 0 y detiene el contador
        //Comprueba si el jugador perdio y manda el correspondiente mensaje.
        if(timer === 0 && moves !== 8){
            clearInterval(timeId);
            blockCards();
            loseAudio.play();
            result.innerHTML = `Muy lento PERDISTE!!, lograste ${hits} aciertos en ${moves} movimientos.`
           
        }
    },1000)
}

//Funcion para bloquera las tarjetas si el contador llega a 0.
function blockCards(){

    for (let i = 0; i <= 15; i++){
        
        let blockCard = document.getElementById(i)
        //imprime en pantalla el valor correspondiente.
        blockCard.innerHTML = `<img src="/Juego-poke/images/${numbers[i]}.png">`;
        blockCard.disabled = true;
    }
}

//Funcion principal.
function uncap (id){

    if(tempo === false){

        countTime()
        tempo = true
    }


    uncapCards++

    if(uncapCards === 1){
        //mostrar el primer numero
        card1 = document.getElementById(id)
        firstResult = numbers[id]
        card1.innerHTML = `<img src="/Juego-poke/images/${firstResult}.png" >`;
        clickAudio.play();

        //Desabilitar primer boton
        card1.disabled  = true
    }else if (uncapCards === 2){
        //mostrar segundo numero
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = `<img src = "/Juego-poke/images/${secondResult}.png">`;

        //Desabilitar el segundo boton
        card2.disabled = true

        //Incrementar movimientos
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;

        //Con este if hacemos la comparacion y si son iguales aumentamos el contador de aciertos.
        if(firstResult === secondResult){
            //Contador de tarjetas destapadas
            uncapCards = 0;

            //Aumentar aciertos
            hits++
            showHits.innerHTML = `Aciertos ${hits}`;
            rightAudio.play();

            if(hits === 8 && timer > 0){
                winAudio.play();
                clearInterval(timeId);
                showHits.innerHTML = `Genial, tuviste: ${hits} aciertos`
                showTime.innerHTML = `Demoraste ${initTime - timer} segundos`
                showMoves.innerHTML = `Te tomo ${moves} movimientos`
                result.innerHTML = `GANASTE!! en ${initTime - timer} segundos y ${moves} movimientos `
            }

            
        }else{
            wrongAudio.play();
            //Mostrar momentaneamente las cartas y que se vuelvan a tapar despues de un tiempo.
            setTimeout(() => {
                card1.innerHTML = '';
                card2.innerHTML = '';
                card1.disabled  = false;
                card2.disabled = false;
                uncapCards = 0;
            },500)
        }

    }

}