class Cohete {
    codigo: string;
    propulsores: number[] = [];
    potenciaActual: number = 0;
    potencias: number[] = [];

    constructor(c: string, p: number[]) {
        this.codigo = c;
        this.propulsores = p;

        for (let i = 0; i < p.length; i++) {
            this.potencias[i] = 0;
        }
    }

    //Método acelerar
    acelerar() {
        let flag: boolean = false;
        this.potenciaActual = 0;
        for (let i = 0; i < this.propulsores.length; i++) {
            if (!(this.potencias[i] >= this.propulsores[i])) {
                this.potencias[i] += 10;
                flag = true;
            }
            this.potenciaActual += this.potencias[i];
        }
        
        return flag;
    }

    //Método frenar
    frenar() {
        let flag: boolean = false;
        this.potenciaActual = 0;
        for (let i = 0; i < this.propulsores.length; i++) {
            if (!(this.potencias[i] <= 0)) {
                this.potencias[i] -= 10;
                flag = true;
            }
            this.potenciaActual += this.potencias[i];
        }

        return flag;
    }
}