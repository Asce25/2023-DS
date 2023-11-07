// script.js
document.addEventListener("DOMContentLoaded", function() {
    var boton = document.getElementById("miBoton");
    var cuadroTexto = document.getElementById("miCuadroTexto");
    var piramide = document.getElementById("miPiramide");

    cuadroTexto.addEventListener("input", function() {
        crearPiramide(parseInt(cuadroTexto.value));
    });

 boton.addEventListener("click", function() {
        alert("¡Botón clicado! Valor del cuadro de texto: " + cuadroTexto.value);
    });


    function crearPiramide(niveles) {
        piramide.innerHTML = "";

        for (var i = 0; i < niveles; i++) {
            var nivel = document.createElement("div");
            nivel.classList.add("nivel");

            for (var j = 0; j <= i; j++) {
                var cuadro = document.createElement("div");
                cuadro.classList.add("cuadro-piramide");

                // Generar números aleatorios
                var numeroAleatorio = Math.floor(Math.random() * 100);
                cuadro.innerText = numeroAleatorio; // Asigna el número al cuadro

                nivel.appendChild(cuadro);
            }

            piramide.appendChild(nivel);
        }
        
        calcularRutaMasAlta(niveles);
    }

    function calcularRutaMasAlta(niveles) {
        var piramideContainer = document.querySelector(".piramide-container");
        var piramide = piramideContainer.querySelectorAll(".nivel");
        
        // Guardar la ruta de la suma más alta
        var mejorRuta = [];
        var mejorSuma = 0;

        function encontrarRuta(nivel, indice, suma, ruta) {
            if (nivel >= piramide.length) {
                if (suma > mejorSuma) {
                    mejorSuma = suma;
                    mejorRuta = ruta.slice(); // Guardar la ruta actual
                }
                return;
            }

            var cuadrosNivel = piramide[nivel].querySelectorAll(".cuadro-piramide");
            var numero = parseInt(cuadrosNivel[indice].innerText);

            // Crear una copia de la ruta actual
            var rutaCopia = ruta.slice();
            rutaCopia.push([nivel, indice]);

            encontrarRuta(nivel + 1, indice, suma + numero, rutaCopia);
            encontrarRuta(nivel + 1, indice + 1, suma + numero, rutaCopia);
        }

        encontrarRuta(0, 0, 0, []);

        // Resaltar la mejor ruta
        resaltarMejorRuta(mejorRuta);

        alert("La ruta con el peso más alto tiene una suma de: " + mejorSuma);
    }

    function resaltarMejorRuta(ruta) {
        var piramide = document.querySelector(".piramide-container").querySelectorAll(".cuadro-piramide");
        
        piramide.forEach(function(cuadro) {
            cuadro.classList.remove("resaltado");
        });

        ruta.forEach(function(coordenadas) {
            var [nivel, indice] = coordenadas;
            var cuadro = piramide[nivel * (nivel + 1) / 2 + indice];
            cuadro.classList.add("resaltado-mejor");
        });
    }
});

