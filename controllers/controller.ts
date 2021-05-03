let cohetes: Cohete[] = [];

function crearCohete() {
    //Inputs de código y potencias
    let codigo = document.querySelector("#codigo") as HTMLInputElement;
    let codigoUp = codigo.value;
    codigoUp = codigoUp.toUpperCase();
    const potencias = inputsPotencias();

    //Validamos propulsores, si están OK creamos cohete
    if (!validarPropulsores()) {
        return;
    } else {
        cohetes.push(new Cohete(codigoUp, potencias));
        console.log(cohetes);
        mostrarCohete(cohetes);
        reset();
    }

    //A partir de dos cohetes creados se habilita el juego
    const habilitado = document.querySelector("#habilitado") as HTMLElement;
    const habilitado2 = document.querySelector(".habilitado") as HTMLElement;
    const empezar = document.querySelector("#empezar") as HTMLButtonElement;
    if (cohetes.length >= 2) {
        habilitado.textContent = "¡Ya puedes empezar a jugar! O crear más cohetes.";
        empezar.classList.remove("d-none");
        habilitado2.style.animation = "habilitado";
        habilitado2.style.animationDuration = "1.5s";
    }
}

//Función mostrar cohetes
function mostrarCohete(cohetes: Cohete[]) {
    const informacion = document.querySelector("#informacion") as HTMLElement;
    const coheteContainer = document.createElement("div");
    coheteContainer.classList.add("coheteContainer");
    const coheteTitulo = document.createElement("h6");
    coheteTitulo.classList.add("coheteTitulo", "text-center", "font-weight-bold");
    informacion.prepend(coheteContainer);

    //Título
    coheteTitulo.textContent = `Cohete ${cohetes[cohetes.length - 1].codigo} | Nº de propulsores: ${cohetes[cohetes.length - 1].propulsores.length}`;
    //Potencia máxima
    let max = potenciaMax(cohetes[cohetes.length - 1]);
    const infoMax = document.createElement("p");
    infoMax.classList.add("text-center", "font-weight-bold", "potenciaMaximaTotal");
    coheteContainer.prepend(infoMax);
    infoMax.textContent = `Potencia máxima total: ${max}`;

    //Propulsores
    for (let j = cohetes[cohetes.length - 1].propulsores.length - 1; j >= 0; j--) {
        const coheteInfo = document.createElement("p");
        coheteInfo.classList.add("coheteInfo", "text-center");
        coheteInfo.append(coheteTitulo);
        coheteContainer.prepend(coheteTitulo, coheteInfo);
        coheteInfo.textContent = `Potencia Máxima Propulsor ${j + 1}: ${cohetes[cohetes.length - 1].propulsores[j]}`;
    }

}

//Añadir inputs propulsores
function inputsPropulsores() {

    //Validamos info de código y número de propulsores, si está OK mostrará tantos inputs como propulsores haya para añadir sus potencias máximas
    if (!validarCohete()) {
        return;
    } else {
        const crear = document.querySelector("#crear") as HTMLButtonElement;
        const aceptar = document.querySelector("#aceptar") as HTMLButtonElement;
        aceptar.classList.remove("d-block");
        aceptar.classList.add("d-none");
        crear.classList.remove("d-none");
        // crear.classList.add("d-block");
        const numP = document.querySelector("#numP") as HTMLInputElement;
        numP.disabled = true;
        const codigo = document.querySelector("#codigo") as HTMLInputElement;
        codigo.disabled = true;
        const form2div = document.querySelector("#form2div") as HTMLFormElement;
        const form2 = document.createElement("form");
        form2.classList.add("form2");
        form2div.prepend(form2);

        for (let i = numP.valueAsNumber; i > 0; i--) {
            const grupoP = document.createElement("div");
            const labelP = document.createElement("label");
            const inputP = document.createElement("input");
            const errorP = document.createElement("div");
            grupoP.classList.add("form-group");
            inputP.classList.add("P" + i, "form-control");
            errorP.classList.add("invalid-feedback");
            errorP.id = "errorMaxPow" + i;
            inputP.type = "number";
            form2.prepend(grupoP);
            grupoP.prepend(inputP, labelP, errorP);
            labelP.textContent = `Potencia máxima Propulsor ${i}`;
            inputP.before(labelP);
            errorP.before(inputP);
            inputP.addEventListener("blur", function () {
                inputBoosterPow(i);
            });
        }
        form2div.style.animationName = "formulario2";
        form2div.style.animationDuration = "0.8s";
    }
}

//Recoger inputs potencias
function inputsPotencias() {
    const numP = document.querySelector("#numP") as HTMLInputElement;
    let potencias: number[] = [];
    for (let i = 1; i <= numP.valueAsNumber; i++) {
        let valorPotencia = document.querySelector(".P" + i) as HTMLInputElement;
        potencias.push(valorPotencia.valueAsNumber);
    }
    return potencias;
}

//Función cálculo potencia máxima
function potenciaMax(cohete: Cohete) {
    const potencias = cohete.propulsores;
    let max = 0;
    for (let i = 0; i < potencias.length; i++) {
        let valor = potencias[i];
        max += valor;
    }
    return max;
}

//Función reseteo
function reset() {
    const inputCodigo = document.querySelector("#codigo") as HTMLInputElement;
    inputCodigo.disabled = false;
    inputCodigo.value = "";
    const numP = document.querySelector("#numP") as HTMLInputElement;
    numP.disabled = false;
    numP.value = "";
    const form2 = document.querySelector(".form2") as HTMLFormElement;
    form2.remove();
    const aceptar = document.querySelector("#aceptar") as HTMLButtonElement;
    aceptar.classList.remove("d-none");
    const crear = document.querySelector("#crear") as HTMLButtonElement;
    crear.classList.remove("d-block");
    crear.classList.add("d-none");
    const form2div = document.querySelector("#form2div") as HTMLFormElement;
    form2div.style.animation = "";
    form2div.style.animationDuration = "";
}

//Función mostrar al empezar
function mostrarJuego() {
    const form1 = document.querySelector(".form1") as HTMLFormElement;
    form1.remove();
    const aceptar = document.querySelector("#aceptar") as HTMLButtonElement;
    aceptar.remove();
    const habilitado = document.querySelector("#habilitado") as HTMLElement;
    habilitado.remove();
    const botonEmpezar = document.querySelector("#empezar") as HTMLButtonElement;
    botonEmpezar.remove();
    const informacion = document.querySelector("#informacion") as HTMLElement;
    informacion.remove();
    const controles = document.querySelector("#controles") as HTMLElement;
    controles.classList.remove("d-none");
    let random = randomNum();
    let ptos: number = 0;
    const puntosTotal = document.querySelector(".puntosTotal") as HTMLElement;
    puntosTotal.classList.remove("d-none");
    const puntosTotalParag = document.querySelector("#puntosTotal") as HTMLParagraphElement;
    puntosTotalParag.textContent = `${ptos} pts`;
    const objetivoDiv = document.querySelector(".objetivo") as HTMLElement;
    objetivoDiv.classList.remove("d-none");
    const objetivo = document.querySelector("#objetivo") as HTMLHeadingElement;
    objetivo.textContent = `Objetivo: ${random}`;
    let randomPtos: [number, number] = [random, ptos];

    for (let i = 0; i < cohetes.length; i++) {
        const controlContainer = document.createElement("div");
        controlContainer.classList.add("controlContainer");
        const potenciaActual = document.createElement("p");
        potenciaActual.classList.add("potenciaActual");
        potenciaActual.id = "potenciaActual" + (i + 1);
        potenciaActual.textContent = `Potencia Actual: ${cohetes[i].potenciaActual}`;
        const coheteCode = document.createElement("h6");
        const rocket = document.createElement("div");
        rocket.classList.add("rocket", "fas", "fa-rocket");
        rocket.id = "rocket" + (i + 1);
        rocket.style.animation = "rocket linear 0.8s infinite";
        rocket.style.textShadow = "0px 0px 10px white";
        rocket.style.color = "white";
        const maxTotalPow = potenciaMax(cohetes[i]);
        coheteCode.textContent = `Cohete: ${cohetes[i].codigo} | Potencia máxima: ${maxTotalPow}`;
        const frenar = document.createElement("button");
        frenar.classList.add("frenar");
        frenar.id = "frenar" + (i + 1);
        frenar.textContent = "<< Frenar";
        const acelerar = document.createElement("button");
        acelerar.classList.add("acelerar");
        acelerar.id = "acelerar" + (i + 1);
        acelerar.textContent = "Acelerar >>";
        controlContainer.prepend(frenar, acelerar, potenciaActual, coheteCode, rocket);
        controles.prepend(controlContainer);
        frenar.before(coheteCode);
        coheteCode.before(rocket);
    }
    return randomPtos;
}

//Función empezar, inicia el juego
function empezar() {

    let datos = mostrarJuego();
    let random = datos[0];
    let ptos = datos[1];
    const objetivo = document.querySelector("#objetivo") as HTMLHeadingElement;
    const controles = document.querySelector("#controles") as HTMLElement;
    const again = document.querySelector(".again") as HTMLElement;

    for (let i = 0; i < cohetes.length; i++) {
        let acelerar = document.querySelector("#acelerar" + (i + 1)) as HTMLButtonElement;
        acelerar.addEventListener("click", function () {
            const potenciaActual = document.querySelector("#potenciaActual" + (i + 1)) as HTMLParagraphElement;
            let max = aceleracion(i);
            if (!max) {
                potenciaActual.textContent = `¡¡POTENCIA MÁXIMA ${cohetes[i].potenciaActual}!!`;
            } else {
                potenciaActual.textContent = `Potencia Actual: ${cohetes[i].potenciaActual}`;
            }
            //animación
            rocket(i, potenciaMax(cohetes[i]), cohetes[i].potenciaActual);
            let sumaAc = sumaActual();
            let estado = juego(random, sumaAc, ptos);
            if (estado[0]) {
                random = randomNum();
                objetivo.textContent = `Objetivo: ${random}`;
                ptos = estado[1];
            }
            if (estado[1] === 100) {
                objetivo.textContent = "¡COMPLETADO!";
                objetivo.style.animation = "completado linear 0.8s infinite";
                objetivo.style.marginTop = "100px";
                controles.classList.remove("d-flex");
                controles.classList.add("d-none");
                again.classList.remove("d-none");
                again.classList.add("d-flex")
            }
        });

        let frenar = document.querySelector("#frenar" + (i + 1)) as HTMLButtonElement;
        frenar.addEventListener("click", function () {
            const potenciaActual = document.querySelector("#potenciaActual" + (i + 1)) as HTMLParagraphElement;
            let min = frenos(i);
            
            if (!min) {
                potenciaActual.textContent = `¡¡POTENCIA MÍNIMA!!`;
            } else {
                potenciaActual.textContent = `Potencia Actual: ${cohetes[i].potenciaActual}`;
            }
            //animación
            rocket(i, potenciaMax(cohetes[i]), cohetes[i].potenciaActual);
            let sumaFr = sumaActual();
            let estado = juego(random, sumaFr, ptos);
            if (estado[0]) {
                random = randomNum();
                objetivo.textContent = `Objetivo: ${random}`;
                ptos = estado[1];
            }
            if (estado[1] === 100) {
                objetivo.textContent = "¡COMPLETADO!";
                objetivo.style.animation = "completado linear 0.8s infinite";
                objetivo.style.marginTop = "100px";
                controles.classList.remove("d-flex");
                controles.classList.add("d-none");
                again.classList.remove("d-none");
                again.classList.add("d-flex")
            }
        });
    }
}

function aceleracion(i: number) {
    let max = cohetes[i].acelerar();
    console.log(cohetes[i]);
    return max;
}

function frenos(i: number) {
    let min = cohetes[i].frenar();
    console.log(cohetes[i]);
    return min;
}

//Función número aleatorio
function randomNum() {
    let sumaP: number = 0;
    let random: number;
    let saltos: number = 0;

    for (let i = 0; i < cohetes.length; i++) {
        sumaP += potenciaMax(cohetes[i]);
    }
    for (let i = sumaP; i > 10; i -= 10) {
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
    let sumaActual: number = 0;
    let i: number = 0;
    while (i < cohetes.length) {
        sumaActual += cohetes[i].potenciaActual;
        i++;
    }
    console.log(sumaActual);
    return sumaActual;
}

function juego(random: number, sumaActual: number, ptos: number) {
    const puntos = document.querySelector(".puntos") as HTMLElement;
    puntos.removeAttribute("style");
    const puntosTotalParag = document.querySelector("#puntosTotal") as HTMLParagraphElement;
    let estado: [boolean, number];
    let flag: boolean = false;
    if (random === sumaActual) {
        puntos.classList.remove("d-none");
        puntos.style.animation = "puntos";
        puntos.style.animationDuration = "1s";
        setTimeout(quitarEstilo, 1500);
        ptos += 10;
        flag = true;
    } else {
        puntos.removeAttribute("style");
    }

    puntosTotalParag.textContent = `${ptos} pts`;
    estado = [flag, ptos];
    return estado;
}

function quitarEstilo() {
    const puntos = document.querySelector(".puntos") as HTMLElement;
    puntos.removeAttribute("style");
    puntos.classList.add("d-none");

}

//Animación cohetes, cambia movimiento y color
function rocket(i: number, potenciaMax: number, potenciaActual: number) {
    const rocket = document.querySelector("#rocket" + (i + 1)) as HTMLElement;
    rocket.removeAttribute("style");
    let tramos: number[] = [];
    let salto = potenciaMax / 4; //cuatro tramos
    let num = 0;
    for (let i = 0; i < 5; i++) {
        tramos[i] = num;
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