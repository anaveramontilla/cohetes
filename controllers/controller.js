"use strict";
var cohetes = [];
function crearCohete() {
    //Inputs de código y potencias
    var codigo = document.querySelector("#codigo");
    var codigoUp = codigo.value;
    codigoUp = codigoUp.toUpperCase();
    var potencias = inputsPotencias();
    //Validamos propulsores, si están OK creamos cohete
    if (!validarPropulsores()) {
        return;
    }
    else {
        cohetes.push(new Cohete(codigoUp, potencias));
        console.log(cohetes);
        mostrarCohete(cohetes);
        reset();
    }
    //A partir de dos cohetes creados se habilita el juego
    var habilitado = document.querySelector("#habilitado");
    var habilitado2 = document.querySelector(".habilitado");
    var empezar = document.querySelector("#empezar");
    if (cohetes.length >= 2) {
        habilitado.textContent = "¡Ya puedes empezar a jugar! O crear más cohetes.";
        empezar.classList.remove("d-none");
        habilitado2.style.animation = "habilitado";
        habilitado2.style.animationDuration = "1.5s";
    }
}
//Función mostrar cohetes
function mostrarCohete(cohetes) {
    var informacion = document.querySelector("#informacion");
    var coheteContainer = document.createElement("div");
    coheteContainer.classList.add("coheteContainer");
    var coheteTitulo = document.createElement("h6");
    coheteTitulo.classList.add("coheteTitulo", "text-center", "font-weight-bold");
    informacion.prepend(coheteContainer);
    //Título
    coheteTitulo.textContent = "Cohete " + cohetes[cohetes.length - 1].codigo + " | N\u00BA de propulsores: " + cohetes[cohetes.length - 1].propulsores.length;
    //Potencia máxima
    var max = potenciaMax(cohetes[cohetes.length - 1]);
    var infoMax = document.createElement("p");
    infoMax.classList.add("text-center", "font-weight-bold", "potenciaMaximaTotal");
    coheteContainer.prepend(infoMax);
    infoMax.textContent = "Potencia m\u00E1xima total: " + max;
    //Propulsores
    for (var j = cohetes[cohetes.length - 1].propulsores.length - 1; j >= 0; j--) {
        var coheteInfo = document.createElement("p");
        coheteInfo.classList.add("coheteInfo", "text-center");
        coheteInfo.append(coheteTitulo);
        coheteContainer.prepend(coheteTitulo, coheteInfo);
        coheteInfo.textContent = "Potencia M\u00E1xima Propulsor " + (j + 1) + ": " + cohetes[cohetes.length - 1].propulsores[j];
    }
}
//Añadir inputs propulsores
function inputsPropulsores() {
    //Validamos info de código y número de propulsores, si está OK mostrará tantos inputs como propulsores haya para añadir sus potencias máximas
    if (!validarCohete()) {
        return;
    }
    else {
        var crear = document.querySelector("#crear");
        var aceptar = document.querySelector("#aceptar");
        aceptar.classList.remove("d-block");
        aceptar.classList.add("d-none");
        crear.classList.remove("d-none");
        // crear.classList.add("d-block");
        var numP = document.querySelector("#numP");
        numP.disabled = true;
        var codigo = document.querySelector("#codigo");
        codigo.disabled = true;
        var form2div = document.querySelector("#form2div");
        var form2 = document.createElement("form");
        form2.classList.add("form2");
        form2div.prepend(form2);
        var _loop_1 = function (i) {
            var grupoP = document.createElement("div");
            var labelP = document.createElement("label");
            var inputP = document.createElement("input");
            var errorP = document.createElement("div");
            grupoP.classList.add("form-group");
            inputP.classList.add("P" + i, "form-control");
            errorP.classList.add("invalid-feedback");
            errorP.id = "errorMaxPow" + i;
            inputP.type = "number";
            form2.prepend(grupoP);
            grupoP.prepend(inputP, labelP, errorP);
            labelP.textContent = "Potencia m\u00E1xima Propulsor " + i;
            inputP.before(labelP);
            errorP.before(inputP);
            inputP.addEventListener("blur", function () {
                inputBoosterPow(i);
            });
        };
        for (var i = numP.valueAsNumber; i > 0; i--) {
            _loop_1(i);
        }
        form2div.style.animationName = "formulario2";
        form2div.style.animationDuration = "0.8s";
    }
}
//Recoger inputs potencias
function inputsPotencias() {
    var numP = document.querySelector("#numP");
    var potencias = [];
    for (var i = 1; i <= numP.valueAsNumber; i++) {
        var valorPotencia = document.querySelector(".P" + i);
        potencias.push(valorPotencia.valueAsNumber);
    }
    return potencias;
}
//Función cálculo potencia máxima
function potenciaMax(cohete) {
    var potencias = cohete.propulsores;
    var max = 0;
    for (var i = 0; i < potencias.length; i++) {
        var valor = potencias[i];
        max += valor;
    }
    return max;
}
//Función reseteo
function reset() {
    var inputCodigo = document.querySelector("#codigo");
    inputCodigo.disabled = false;
    inputCodigo.value = "";
    var numP = document.querySelector("#numP");
    numP.disabled = false;
    numP.value = "";
    var form2 = document.querySelector(".form2");
    form2.remove();
    var aceptar = document.querySelector("#aceptar");
    aceptar.classList.remove("d-none");
    var crear = document.querySelector("#crear");
    crear.classList.remove("d-block");
    crear.classList.add("d-none");
    var form2div = document.querySelector("#form2div");
    form2div.style.animation = "";
    form2div.style.animationDuration = "";
}
//Función mostrar al empezar
function mostrarJuego() {
    var form1 = document.querySelector(".form1");
    form1.remove();
    var aceptar = document.querySelector("#aceptar");
    aceptar.remove();
    var habilitado = document.querySelector("#habilitado");
    habilitado.remove();
    var botonEmpezar = document.querySelector("#empezar");
    botonEmpezar.remove();
    var informacion = document.querySelector("#informacion");
    informacion.remove();
    var controles = document.querySelector("#controles");
    controles.classList.remove("d-none");
    var random = randomNum();
    var ptos = 0;
    var puntosTotal = document.querySelector(".puntosTotal");
    puntosTotal.classList.remove("d-none");
    var puntosTotalParag = document.querySelector("#puntosTotal");
    puntosTotalParag.textContent = ptos + " pts";
    var objetivoDiv = document.querySelector(".objetivo");
    objetivoDiv.classList.remove("d-none");
    var objetivo = document.querySelector("#objetivo");
    objetivo.textContent = "Objetivo: " + random;
    var randomPtos = [random, ptos];
    for (var i = 0; i < cohetes.length; i++) {
        var controlContainer = document.createElement("div");
        controlContainer.classList.add("controlContainer");
        var potenciaActual = document.createElement("p");
        potenciaActual.classList.add("potenciaActual");
        potenciaActual.id = "potenciaActual" + (i + 1);
        potenciaActual.textContent = "Potencia Actual: " + cohetes[i].potenciaActual;
        var coheteCode = document.createElement("h6");
        var rocket_1 = document.createElement("div");
        rocket_1.classList.add("rocket", "fas", "fa-rocket");
        rocket_1.id = "rocket" + (i + 1);
        rocket_1.style.animation = "rocket linear 0.8s infinite";
        rocket_1.style.textShadow = "0px 0px 10px white";
        rocket_1.style.color = "white";
        var maxTotalPow = potenciaMax(cohetes[i]);
        coheteCode.textContent = "Cohete: " + cohetes[i].codigo + " | Potencia m\u00E1xima: " + maxTotalPow;
        var frenar = document.createElement("button");
        frenar.classList.add("frenar");
        frenar.id = "frenar" + (i + 1);
        frenar.textContent = "<< Frenar";
        var acelerar = document.createElement("button");
        acelerar.classList.add("acelerar");
        acelerar.id = "acelerar" + (i + 1);
        acelerar.textContent = "Acelerar >>";
        controlContainer.prepend(frenar, acelerar, potenciaActual, coheteCode, rocket_1);
        controles.prepend(controlContainer);
        frenar.before(coheteCode);
        coheteCode.before(rocket_1);
    }
    return randomPtos;
}
//Función empezar, inicia el juego
function empezar() {
    var datos = mostrarJuego();
    var random = datos[0];
    var ptos = datos[1];
    var objetivo = document.querySelector("#objetivo");
    var controles = document.querySelector("#controles");
    var again = document.querySelector(".again");
    var _loop_2 = function (i) {
        var acelerar = document.querySelector("#acelerar" + (i + 1));
        acelerar.addEventListener("click", function () {
            var potenciaActual = document.querySelector("#potenciaActual" + (i + 1));
            var max = aceleracion(i);
            if (!max) {
                potenciaActual.textContent = "\u00A1\u00A1POTENCIA M\u00C1XIMA " + cohetes[i].potenciaActual + "!!";
            }
            else {
                potenciaActual.textContent = "Potencia Actual: " + cohetes[i].potenciaActual;
            }
            //animación
            rocket(i, potenciaMax(cohetes[i]), cohetes[i].potenciaActual);
            var sumaAc = sumaActual();
            var estado = juego(random, sumaAc, ptos);
            if (estado[0]) {
                random = randomNum();
                objetivo.textContent = "Objetivo: " + random;
                ptos = estado[1];
            }
            if (estado[1] === 100) {
                objetivo.textContent = "¡COMPLETADO!";
                objetivo.style.animation = "completado linear 0.8s infinite";
                objetivo.style.marginTop = "100px";
                controles.classList.remove("d-flex");
                controles.classList.add("d-none");
                again.classList.remove("d-none");
                again.classList.add("d-flex");
            }
        });
        var frenar = document.querySelector("#frenar" + (i + 1));
        frenar.addEventListener("click", function () {
            var potenciaActual = document.querySelector("#potenciaActual" + (i + 1));
            var min = frenos(i);
            if (!min) {
                potenciaActual.textContent = "\u00A1\u00A1POTENCIA M\u00CDNIMA!!";
            }
            else {
                potenciaActual.textContent = "Potencia Actual: " + cohetes[i].potenciaActual;
            }
            //animación
            rocket(i, potenciaMax(cohetes[i]), cohetes[i].potenciaActual);
            var sumaFr = sumaActual();
            var estado = juego(random, sumaFr, ptos);
            if (estado[0]) {
                random = randomNum();
                objetivo.textContent = "Objetivo: " + random;
                ptos = estado[1];
            }
            if (estado[1] === 100) {
                objetivo.textContent = "¡COMPLETADO!";
                objetivo.style.animation = "completado linear 0.8s infinite";
                objetivo.style.marginTop = "100px";
                controles.classList.remove("d-flex");
                controles.classList.add("d-none");
                again.classList.remove("d-none");
                again.classList.add("d-flex");
            }
        });
    };
    for (var i = 0; i < cohetes.length; i++) {
        _loop_2(i);
    }
}
function aceleracion(i) {
    var max = cohetes[i].acelerar();
    console.log(cohetes[i]);
    return max;
}
function frenos(i) {
    var min = cohetes[i].frenar();
    console.log(cohetes[i]);
    return min;
}
//Función número aleatorio
function randomNum() {
    var sumaP = 0;
    var random;
    var saltos = 0;
    for (var i = 0; i < cohetes.length; i++) {
        sumaP += potenciaMax(cohetes[i]);
    }
    for (var i = sumaP; i > 10; i -= 10) {
        saltos++;
    }
    random = Math.floor(Math.random() * saltos) * 10;
    if (random == 0) {
        random += 10;
    }
    console.log(random);
    return random;
}
function sumaActual() {
    var sumaActual = 0;
    var i = 0;
    while (i < cohetes.length) {
        sumaActual += cohetes[i].potenciaActual;
        i++;
    }
    console.log(sumaActual);
    return sumaActual;
}
function juego(random, sumaActual, ptos) {
    var puntos = document.querySelector(".puntos");
    puntos.removeAttribute("style");
    var puntosTotalParag = document.querySelector("#puntosTotal");
    var estado;
    var flag = false;
    if (random === sumaActual) {
        puntos.classList.remove("d-none");
        puntos.style.animation = "puntos";
        puntos.style.animationDuration = "1s";
        setTimeout(quitarEstilo, 1500);
        ptos += 10;
        flag = true;
    }
    else {
        puntos.removeAttribute("style");
    }
    puntosTotalParag.textContent = ptos + " pts";
    estado = [flag, ptos];
    return estado;
}
function quitarEstilo() {
    var puntos = document.querySelector(".puntos");
    puntos.removeAttribute("style");
    puntos.classList.add("d-none");
}
//Animación cohetes, cambia movimiento y color
function rocket(i, potenciaMax, potenciaActual) {
    var rocket = document.querySelector("#rocket" + (i + 1));
    rocket.removeAttribute("style");
    var tramos = [];
    var salto = potenciaMax / 4; //cuatro tramos
    var num = 0;
    for (var i_1 = 0; i_1 < 5; i_1++) {
        tramos[i_1] = num;
        num += salto;
    }
    if (potenciaActual >= tramos[0]) {
        rocket.style.animation = "rocket linear 0.8s infinite";
        rocket.style.textShadow = "0px 0px 10px white";
        rocket.style.color = "white";
        rocket.style.transition = "color 0.5s";
    }
    if (potenciaActual >= tramos[1]) {
        rocket.style.animation = "rocket linear 0.6s infinite";
        rocket.style.textShadow = "0px 0px 10px green";
        rocket.style.color = "green";
        rocket.style.transition = "color 0.5s";
    }
    if (potenciaActual >= tramos[2]) {
        rocket.style.animation = "rocket linear 0.4s infinite";
        rocket.style.textShadow = "0px 0px 10px yellow";
        rocket.style.color = "yellow";
        rocket.style.transition = "color 0.5s";
    }
    if (potenciaActual >= tramos[3]) {
        rocket.style.animation = "rocket linear 0.2s infinite";
        rocket.style.textShadow = "0px 0px 10px orange";
        rocket.style.color = "orange";
        rocket.style.transition = "color 0.5s";
    }
    if (potenciaActual >= tramos[4]) {
        rocket.style.animation = "rocket linear 0.1s infinite";
        rocket.style.textShadow = "0px 0px 10px red";
        rocket.style.color = "red";
        rocket.style.transition = "color 0.5s";
    }
}
function resetAll() {
    location.reload();
}
