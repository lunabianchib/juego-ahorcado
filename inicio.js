const inicio = document.querySelector(".inicio");
const addPalabra = document.querySelector(".agregarPalabra");
const juego = document.querySelector(".juego");
const botonIniciarjuego = document.querySelector(".boton-iniciar");
const botonAgrgarpalabra = document.querySelector(".boton-addpalabra");


botonIniciarjuego.addEventListener("click", function(event){
    iniciarJuego();
    juego.style.display = "";
    inicio.style.display = "none";
    addPalabra.style.display = "none";
});

botonAgrgarpalabra.addEventListener("click", function(event){
    addPalabra.style.display = "";
    inicio.style.display = "none";
    juego.style.display = "none";
});

window.addEventListener("load", () => {
    addPalabra.style.display = "none";
    juego.style.display = "none";
});