const listaPalabras = ["MONITOR", "CASA", "GATO", "PERRO", "MELON", "TAZA", "JIRAFA", "KOALA", "PROGRAMACION", "AUTOBUS", "MUÑECA", "CARACOL", "SANDIA", "AMARILLO", "MARIPOSA", "PLUMA", "ALURA", "LENGUAJE", "JAVASCRIPT", "COFRE", "AVENA"];
const botonNuevoJuego = document.querySelector(".botonNuevojuego");
const botonDesistir = document.querySelector(".botonDesistir");
const secCanvas = document.querySelector(".sec-canvas");
const ganaste = document.querySelector(".ganaste");
const perdiste = document.querySelector(".perdiste");
const cajaLetras = document.querySelector(".contenedor-letras");
const letrasDescartadas = document.querySelector(".letras-descartadas");
const fila1 = document.querySelector(".fila1");
const fila2 = document.querySelector(".fila2");
const fila3 = document.querySelector(".fila3");
const abc1 = ["Q","W","E","R","T","Y","U","I","O","P"];
const abc2 = ["A","S","D","F","G","H","J","K","L","Ñ"];
const abc3 = ["Z","X","C","V","B","N","M"];
let pantalla = document.querySelector("canvas");
let pincel = pantalla.getContext("2d");
let palabraSecreta;
let letrasUsadas;
let errores;
let aciertos;


botonNuevoJuego.addEventListener("click", iniciarJuego);

botonDesistir.addEventListener("click", function(event){
    window.removeEventListener("keydown", validarTecla);
    addPalabra.style.display = "none";
    juego.style.display = "none";
    inicio.style.display = "";
});

function iniciarJuego(){
    errores = 0;
    aciertos = 0;
    letrasUsadas = [];
    pincel.clearRect(0, 0, pantalla.width, pantalla.height);
    perdiste.style.display = "none";
    ganaste.style.display = "none";
    cajaLetras.innerHTML = "";
    letrasDescartadas.innerHTML = "";
    fila1.innerHTML = "";
    fila2.innerHTML = "";
    fila3.innerHTML = "";

    dibujarAhorcado(errores);
    seleccionarPalabra();
    dibujarGuiones();
    window.addEventListener("keydown", validarTecla);
    generarTeclado();
}

function generarTeclado(){
    for(let i = 0; i < abc1.length; i++){
        let tecla1 = document.createElement("button");
        tecla1.classList.add("tecla");
        tecla1.id = abc1[i];
        tecla1.textContent = abc1[i];
        fila1.appendChild(tecla1);
        tecla1.addEventListener("click", validarTeclaT);
    }

    for(let j = 0; j < abc2.length; j++){
        let tecla2 = document.createElement("button");
        tecla2.classList.add("tecla");
        tecla2.id = abc2[j];
        tecla2.textContent = abc2[j];
        fila2.appendChild(tecla2);
        tecla2.addEventListener("click", validarTeclaT);
    }

    for(let k = 0; k < abc3.length; k++){
        let tecla3 = document.createElement("button");
        tecla3.classList.add("tecla");
        tecla3.id = abc3[k];
        tecla3.textContent = abc3[k];
        fila3.appendChild(tecla3);
        tecla3.addEventListener("click", validarTeclaT);
    }
}


function seleccionarPalabra(){
    let palabraSeleccionada = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    palabraSecreta = palabraSeleccionada.split("");
    aciertos = palabraSecreta.length;
}

function dibujarGuiones(){
    for(let i=0; i<palabraSecreta.length; i++){
        let guionLetra = document.createElement("div");
        guionLetra.classList.add("guiones");
        cajaLetras.appendChild(guionLetra);
    }
}

function validarTecla(evento){
    let letra = evento.key.toUpperCase();
    let auxT = document.querySelector("#" + letra);
    if(letra.match(/^[a-zA-ZÑñ]$/i) && !letrasUsadas.includes(letra)){
        agregarLetra(letra);
        auxT.classList.add("teclaP");
        auxT.removeEventListener("click", validarTeclaT);
    }
}

function validarTeclaT(){
    let letra = this.id;
    if(letra.match(/^[A-ZÑ]$/i) && !letrasUsadas.includes(letra)){
        this.classList.add("teclaP");
        this.removeEventListener("click", validarTeclaT);
        agregarLetra(letra);
    }
}

function agregarLetra(letra){
    let aux = 0;
    let i = palabraSecreta.indexOf(letra, aux);
    const guiones = document.querySelectorAll(".guiones");
    if(i != -1){
        letrasUsadas.push(letra);
        while(i != -1){
            guiones[i].innerHTML = letra;
            aciertos --;
            aux = i + 1;
            i =  palabraSecreta.indexOf(letra, aux);
        }
        if(aciertos == 0){
            partidaFinalizada();
        }

    }else{
        letrasUsadas.push(letra);
        mostrarDescartada(letra);
        errores++;
        dibujarAhorcado(errores);
    }
    if(errores == 10){
        partidaPerdida();
    }
}

function mostrarDescartada(letra){
    let descartada = document.createElement("span");
    descartada.innerHTML = letra;
    descartada.classList.add("descartadas");
    letrasDescartadas.appendChild(descartada);
}

function partidaFinalizada(){
    window.removeEventListener("keydown", validarTecla);
    quitarEventosT();
    ganaste.style.display = "";
}

function partidaPerdida(){
    window.removeEventListener("keydown", validarTecla);
    quitarEventosT();
    letrasDescartadas.innerHTML = "";
    perdiste.style.display = "";
    const palabra = document.createElement("span");
    let nuevapalabra;
    nuevapalabra = palabraSecreta.join("");
    palabra.innerHTML = "La palabra correcta era: " + nuevapalabra;
    palabra.classList.add("palabrasecreta");
    letrasDescartadas.appendChild(palabra);
}

function quitarEventosT(){
    for(let i = 0; i < abc1.length; i++){
        let tecla1 = document.querySelector("#" + abc1[i]);
        tecla1.removeEventListener("click", validarTeclaT);
    }

    for(let j = 0; j < abc2.length; j++){
        let tecla2 = document.querySelector("#" + abc2[j]);
        tecla2.removeEventListener("click", validarTeclaT);
    }

    for(let k = 0; k < abc3.length; k++){
        let tecla3 = document.querySelector("#" + abc3[k]);
        tecla3.removeEventListener("click", validarTeclaT);
    }
}

function dibujarAhorcado(errores){
    pincel.lineWidth = 8;
    pincel.strokeStyle = "rgba(61, 197, 7, 0.945)";
    pincel.beginPath();
    
    switch(errores){
        case 1:    //piso
            pincel.moveTo(0, 400);
            pincel.lineTo(350, 400);
        break;

        case 2:    //base
            pincel.moveTo(60, 400);
            pincel.lineTo(60, 0);
        break;

        case 3:    //viga
            pincel.moveTo(60, 0);
            pincel.lineTo(200, 0);
        break;

        case 4:    //soga
            pincel.moveTo(200, 0);
            pincel.lineTo(200, 70);
        break;

        case 5:    //cabeza
            pincel.arc(200, 110, 40, 2*Math.PI, 0);
        break;

        case 6:    //cuerpo
            pincel.moveTo(200, 150);
            pincel.lineTo(200, 300);
        break;

        case 7:    //brazo-der
            pincel.moveTo(200, 190);
            pincel.lineTo(270, 260);
        break;

        case 8:    //brazo-izq
            pincel.moveTo(200, 190);
            pincel.lineTo(130, 260);
        break;

        case 9:    //pierna-der
            pincel.moveTo(200, 300);
            pincel.lineTo(270, 370);
        break;

        case 10:    //pierna-izq
            pincel.moveTo(200, 300);
            pincel.lineTo(130, 370);
        break;
    }
    pincel.stroke();
}

