//Variables
let uncapCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let hits = 0;



//Apuntando al html
let showMoves = document.getElementById('movimiento');
let showHits = document.getElementById('aciertos');


//Generacion de numeros aleatorios
//queremos que regrese un arreglo numeros aleatorios del -0.5 al 0.5.
let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numbers = numbers.sort(() => {

    return Math.random() - 0.5
    
});
console.log(numbers)


//Funcion principal.
function uncap (id){
    uncapCards++

    if(uncapCards === 1){
        //mostrar el primer numero
        card1 = document.getElementById(id)
        firstResult = numbers[id]
        card1.innerHTML = firstResult;

        //Desabilitar primer boton
        card1.disabled  = true
    }else if (uncapCards === 2){
        //mostrar segundo numero
        card2 = document.getElementById(id);
        secondResult = numbers[id];
        card2.innerHTML = secondResult;

        //Desabilitar el segundo boton
        card2.disabled = true

        //Incrementar movimientos
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;

        if(firstResult === secondResult){

            uncapCards = 0;

            //Aumentar aciertos
            hits++
            showHits.innerHTML = `Aciertos ${hits}`
        }

    }

}