let edad : number = 20;
let altura: number = 1.80;

let nombre: string = "Juan";
let apellido: string = "Quinonez";

let estaActivo: boolean = true;

let nombres: string[] = ["Juan", "Pedro", "Daniela"];

class Persona {
    nombre: string;
    apellido: string;
    edad: number;
    altura: number;
    estaActivo: boolean;

    constructor(nombre: string, apellido: string, edad: number, altura: number, estaActivo: boolean) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.altura = altura;
        this.estaActivo = estaActivo;
    }

    mostrarNombreCompleto() {
        console.log(this.nombre + " " + this.apellido);
    }

    mostrarDetalles() {
        console.log(`Nombre: ${this.nombre} ${this.apellido}, Edad: ${this.edad}, Altura: ${this.altura}, Activo: ${this.estaActivo}`);
    }
}
