palabraEntrada.addEventListener("input", function(event){
    if(validar(palabraEntrada.value)){
        document.getElementById("reglas").style.color = "#682C0E";
    }else{
        palabraEntrada.value = palabraEntrada.value.substring(0, palabraEntrada.value.length - 1);
        document.getElementById("reglas").style.color = "red";
    }
});

function validar(mensaje){
    const charnopermitidos = /[a-zA-ZÑñ]$/;
    return charnopermitidos.test(mensaje);
}

function convertirMay(inputpalabra){
    inputpalabra.value = inputpalabra.value.toUpperCase();
}