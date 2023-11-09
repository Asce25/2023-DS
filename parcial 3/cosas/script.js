// script.js
document.addEventListener("DOMContentLoaded", function() {
    const inicio = new Date().getTime();
    var boton = document.getElementById("miBoton");
    var cuadroTexto = document.getElementById("miCuadroTexto");
    var piramide = document.getElementById("miPiramide");

    cuadroTexto.addEventListener("change", function() {
        var valor = parseInt(cuadroTexto.value);
        if (!isNaN(valor) && valor > 0 && valor <=50) {
            crearPiramide(valor);
        }else{
            alert("el valor maximo para el tamaño de la piramide debe ser de 50");
        }
       // crea la piramide con los valores que se ponen en el cuadro de texto
    });

    boton.addEventListener("click", function() {
        alert("¡Botón clicado! Valor del cuadro de texto: " + cuadroTexto.value);
    });

    function crearPiramide(niveles) {
        piramide.innerHTML = "";
        
        // Generar una matriz para almacenar los valores de la pirámide
        var piramideArray = [];
        for (var i = 0; i < niveles; i++) {
            var fila = [];
            for (var j = 0; j <= i; j++) {
                var numeroAleatorio = Math.floor(Math.random() * 100);
                fila.push(numeroAleatorio);
            }
            piramideArray.push(fila);
        }

        var resultado = calcularRutaMasAlta(piramideArray);
    
        // Mostrar la pirámide y resaltar la mejor ruta
        mostrarPiramide(piramideArray, resultado.ruta);
    }

    function calcularRutaMasAlta(niveles) {
        var piramideContainer = document.querySelector(".piramide-container");
        var piramide = piramideContainer.querySelectorAll(".nivel");
    
        var suma = new Array(niveles);
        for (var i = 0; i < niveles; i++) {
            suma[i] = new Array(i + 1).fill(0);
        }
        //var rutaSuma = [];
        for (var nivel = niveles - 1; nivel >= 0; nivel--) {
            var cuadrosNivel = piramide[nivel].querySelectorAll(".cuadro-piramide");
            for (var indice = 0; indice < cuadrosNivel.length; indice++) {
                suma[nivel][indice] = parseInt(cuadrosNivel[indice].innerText);
                if (nivel < niveles - 1) {
                    suma[nivel][indice] += Math.max(suma[nivel + 1][indice], suma[nivel + 1][indice + 1]);  
                }
            }
        }
        var mejorSuma = suma[0][0];
        var ruta = [];
        var nivel = 0;
        var indice = 0;
    
        while (nivel < niveles - 1) {
            ruta.push([nivel, indice]);
            var cuadroActual = suma[nivel][indice];
            var cuadroIzquierda = suma[nivel + 1][indice];
            var cuadroDerecha = suma[nivel + 1][indice + 1];
    
            if (cuadroIzquierda > cuadroDerecha) {
                indice = indice; // Sigue en la misma columna
                //rutaSuma.push(cuadroActual);
            } else {
                //rutaSuma.push(cuadroActual);
                indice = indice + 1;
            }
    
            nivel = nivel + 1;
           
        }
    
        ruta.push([nivel, indice]);
        resaltarMejorRuta(ruta);

        //mostrar la ruta, guardando en un array
        var numerosSumaMaxima = [];
        for (var i = 0; i < ruta.length; i++) {
            var [nivel, indice] = ruta[i];
            var cuadro = piramide[nivel].querySelectorAll(".cuadro-piramide")[indice];
            numerosSumaMaxima.push(parseInt(cuadro.innerText));
        }
        var numerosRutaDiv = document.querySelector(".numeros-ruta");
 
        numerosRutaDiv.innerHTML = "";

        // se crea el div donde estaran dentro de un cuadrito
        for (var i = 0; i < numerosSumaMaxima.length; i++) {
            var numeroDiv = document.createElement("div");
            numeroDiv.innerText = numerosSumaMaxima[i];
            numeroDiv.classList.add("numero-ruta"); 
            numerosRutaDiv.appendChild(numeroDiv);
        }
    
        alert("La ruta con el peso más alto tiene una suma de: " + mejorSuma);
        console.log("Números de sumas en la ruta:", numerosSumaMaxima);
    }

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

    function resaltarMejorRuta(ruta) {
        var cuadros = document.querySelectorAll(".cuadro-piramide");
        cuadros.forEach(function(cuadro) {
            cuadro.classList.remove("resaltado");
        });

        ruta.forEach(function(coordenadas) {
            var [nivel, indice] = coordenadas;
            var cuadro = cuadros[nivel * (nivel + 1) / 2 + indice];
            cuadro.classList.add("resaltado-mejor");
        });

    }
    const tiempoTranscurrido = new Date().getTime() - inicio;
    console.log("Tiempo estimado (ms):", tiempoTranscurrido);
});
function borrar(){
    document.getElementById("borrarBoton").addEventListener("click", function() {
        var piramide = document.getElementById("miPiramide");
        var cuadroTexto = document.getElementById("miCuadroTexto");
        var rutas = document.getElementById("numeros-ruta");

        if (piramide) {
            piramide.innerHTML = ""; 
        }
        if (cuadroTexto) {
            cuadroTexto.value = "";
        }
        if (rutas){
        rutas.innerHTML = "";
        }
    });
}

