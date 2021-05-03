"use strict";
function validarCohete() {
    var codigo = inputCode();
    var numP = inputBooster();
    if (codigo && numP) {
        return true;
    }
    else {
        return false;
    }
}
function validarPropulsores() {
    var respuestasP = [];
    var flag = true;
    var numP = document.querySelector("#numP");
    for (var i = 0; i < numP.valueAsNumber; i++) {
        respuestasP[i] = inputBoosterPow(i + 1);
        if (respuestasP[i]) {
            flag = true;
        }
        else {
            flag = false;
        }
    }
    if (flag) {
        return true;
    }
    else {
        return false;
    }
}
function inputCode() {
    var code = document.querySelector("#codigo");
    code.classList.remove("is-invalid");
    if (code.value == "") {
        code.classList.add("is-invalid");
        var errorCode = document.querySelector("#errorCode");
        errorCode.textContent = "Debes introducir un código.";
        return false;
    }
    else if (code.value.length < 8) {
        code.classList.add("is-invalid");
        var errorCode = document.querySelector("#errorCode");
        errorCode.textContent = "Debe contener al menos 8 caracteres";
        return false;
    }
    return true;
}
function inputBooster() {
    var numP = document.querySelector("#numP");
    numP.classList.remove("is-invalid");
    if (numP.value == "") {
        numP.classList.add("is-invalid");
        var errorNumP = document.querySelector("#errorNumP");
        errorNumP.textContent = "Debes introducir un número.";
        return false;
    }
    else if (numP.valueAsNumber <= 0 || (numP.valueAsNumber) % 1 != 0) {
        numP.classList.add("is-invalid");
        var errorNumP = document.querySelector("#errorNumP");
        errorNumP.textContent = "Por favor, introduce un número válido (1, 2 ,3...).";
        return false;
    }
    return true;
}
function inputBoosterPow(i) {
    var maxPow = document.querySelector(".P" + i);
    maxPow.classList.remove("is-invalid");
    if (maxPow.value == "") {
        maxPow.classList.add("is-invalid");
        var errorMaxPow = document.querySelector("#errorMaxPow" + i);
        errorMaxPow.textContent = "Debes introducir la potencia m\u00E1xima del propulsor " + i;
        return false;
    }
    else if (maxPow.valueAsNumber <= 0 || (maxPow.valueAsNumber) % 10 != 0) {
        maxPow.classList.add("is-invalid");
        var errorMaxPow = document.querySelector("#errorMaxPow" + i);
        errorMaxPow.textContent = "Por favor, introduce un valor m\u00FAltiplo de 10.";
        return false;
    }
    return true;
}
