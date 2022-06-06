const palabraEntrada = document.querySelector(".addpalabra");
const botonGuardarEmpezar = document.querySelector(".botonGuardarEmpezar");
const botonCancelar = document.querySelector(".botonCancelar");
const avisoLetras = document.querySelector(".aviso-invisible");
const avisoAddPalabra = document.querySelector(".aviso-palabra-invisible");

botonGuardarEmpezar.addEventListener("click", function(event){
    event.preventDefault();
    if(palabraEntrada.value.length === 0 || palabraEntrada.value.trim().length === 0){
        return;
    }else{
        if(palabraEntrada.value.length <= 15){
            let palabra = palabraEntrada.value;
            listaPalabras.push(palabra);
            avisoAddPalabra.classList.replace("aviso-palabra-invisible", "aviso-palabra-visible");
            palabraEntrada.value = "";
            setTimeout(function(){
                avisoAddPalabra.classList.replace("aviso-palabra-visible", "aviso-palabra-invisible");
            }, 2500);
            setTimeout(function(){
                iniciarJuego();
                juego.style.display = "";
                addPalabra.style.display = "none";
                inicio.style.display = "none";
            }, 4000);
            
        }else{
            avisoLetras.classList.replace("aviso-invisible", "aviso-visible");
            palabraEntrada.value = "";
            setTimeout(function(){
                avisoLetras.classList.replace("aviso-visible", "aviso-invisible");
            }, 2500);
        }
    }
});

botonCancelar.addEventListener("click", function(event){
    window.removeEventListener("keydown", validarTecla);
    addPalabra.style.display = "none";
    juego.style.display = "none";
    inicio.style.display = "";
});