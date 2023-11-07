// script.js
document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementById("miBoton");
    var cuadroTexto = document.getElementById("miCuadroTexto");
    
    boton.addEventListener("click", function() {
        alert("¡Botón clicado! Valor del cuadro de texto: " + cuadroTexto.value);
    });

    cuadroTexto.addEventListener("input", function() {
        crearPiramide(parseInt(cuadroTexto.value));
    });
    
    function crearPiramide(niveles) {
        var piramide = document.querySelector(".piramide");
        piramide.innerHTML = ""; // Limpiamos la pirámide anterior

        for (var i = 0; i < niveles; i++) {
            var nivel = document.createElement("div");
            nivel.classList.add("nivel");

            for (var j = 0; j <= i; j++) {
                var cuadro = document.createElement("div");
                cuadro.classList.add("cuadro");
                nivel.appendChild(cuadro);
            }

            piramide.appendChild(nivel);
        }
    }
});