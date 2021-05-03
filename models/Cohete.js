"use strict";
var Cohete = /** @class */ (function () {
    function Cohete(c, p) {
        this.propulsores = [];
        this.potenciaActual = 0;
        this.potencias = [];
        this.codigo = c;
        this.propulsores = p;
        for (var i = 0; i < p.length; i++) {
            this.potencias[i] = 0;
        }
    }
    //Método acelerar
    Cohete.prototype.acelerar = function () {
        var flag = false;
        this.potenciaActual = 0;
        for (var i = 0; i < this.propulsores.length; i++) {
            if (!(this.potencias[i] >= this.propulsores[i])) {
                this.potencias[i] += 10;
                flag = true;
            }
            this.potenciaActual += this.potencias[i];
        }
        return flag;
    };
    //Método frenar
    Cohete.prototype.frenar = function () {
        var flag = false;
        this.potenciaActual = 0;
        for (var i = 0; i < this.propulsores.length; i++) {
            if (!(this.potencias[i] <= 0)) {
                this.potencias[i] -= 10;
                flag = true;
            }
            this.potenciaActual += this.potencias[i];
        }
        return flag;
    };
    return Cohete;
}());
