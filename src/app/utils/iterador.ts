export class Iterador {
    private minimo: number;
    private maximo: number;

    constructor(min: number, max: number) {
        this.minimo = min;
        this.maximo = max;
    }


    *[Symbol.iterator]() {
        for (let i = this.minimo; i <= this.maximo; i++) {
            yield i; // Genera el valor actual
        }}

}
