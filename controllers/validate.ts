function validarCohete() {
    const codigo = inputCode();
    const numP = inputBooster();

    if (codigo && numP) {
        return true;
    } else {
        return false;
    }
}

function validarPropulsores() {
    let respuestasP: boolean[] = [];
    let flag: boolean = true;
    const numP = document.querySelector("#numP") as HTMLInputElement;
    
    for (let i = 0; i < numP.valueAsNumber; i++) {
        respuestasP[i] = inputBoosterPow(i+1);

        if (respuestasP[i]) {
            flag = true;
        } else {
            flag = false;
        }
    }

    if (flag) {
        return true;
    } else {
        return false;
    }
}

function inputCode() {
    const code = document.querySelector("#codigo") as HTMLInputElement;
    code.classList.remove("is-invalid");
    if (code.value == "") {
        code.classList.add("is-invalid");
        let errorCode = document.querySelector("#errorCode") as HTMLElement;
        errorCode.textContent = "Debes introducir un código.";
        return false;
    } else if (code.value.length < 8) {
        code.classList.add("is-invalid");
        let errorCode = document.querySelector("#errorCode") as HTMLElement;
        errorCode.textContent = "Debe contener al menos 8 caracteres";
        return false;
    }
    return true;
}

function inputBooster() {
    const numP = document.querySelector("#numP") as HTMLInputElement;
    numP.classList.remove("is-invalid");
    if (numP.value == "") {
        numP.classList.add("is-invalid");
        const errorNumP = document.querySelector("#errorNumP") as HTMLElement;
        errorNumP.textContent = "Debes introducir un número.";
        return false;
    } else if (numP.valueAsNumber <= 0 || (numP.valueAsNumber)%1 != 0) {
        numP.classList.add("is-invalid");
        const errorNumP = document.querySelector("#errorNumP") as HTMLElement;
        errorNumP.textContent = "Por favor, introduce un número válido (1, 2 ,3...).";
        return false;
    }
    return true;
}

function inputBoosterPow(i: number) {
    const maxPow = document.querySelector(".P" + i) as HTMLInputElement;
    maxPow.classList.remove("is-invalid");
    if (maxPow.value == "") {
        maxPow.classList.add("is-invalid");
        const errorMaxPow = document.querySelector("#errorMaxPow"+i) as HTMLElement;
        errorMaxPow.textContent = `Debes introducir la potencia máxima del propulsor ${i}`;
        return false;
    } else if (maxPow.valueAsNumber <= 0 || (maxPow.valueAsNumber)%10 != 0) {
        maxPow.classList.add("is-invalid");
        const errorMaxPow = document.querySelector("#errorMaxPow"+i) as HTMLElement;
        errorMaxPow.textContent = `Por favor, introduce un valor múltiplo de 10.`;
        return false;
    }
    return true;
}