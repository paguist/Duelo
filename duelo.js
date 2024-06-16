class Carta {
  constructor(nombre, costo) {
    this.nombre = nombre;
    this.costo = costo;
  }
}

class Unidad extends Carta {
  constructor(nombre, costo, poder, resistencia) {
    super(nombre, costo);
    this.poder = poder;
    this.resistencia = resistencia;
  }

  invocar() {
    console.log(`El jugador convoca a "${this.nombre}"`);
  }

  atacar(objetivo) {
    if (!(objetivo instanceof Unidad)) {
      throw new Error("Solo se puede atacar a otra unidad.");
    }
    console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
    objetivo.recibirDaño(this.poder);
  }

  recibirDaño(daño) {
    this.resistencia -= daño;
  }

  modificarAtributo(atributo, valor) {
    if (atributo === "poder") {
      this.poder += valor;
    } else if (atributo === "resistencia") {
      this.resistencia += valor;
    } else {
      throw new Error("Atributo desconocido.");
    }
  }

  mostrarEstado() {
    console.log(`${this.nombre} - Poder: ${this.poder}, Resistencia: ${this.resistencia}`);
  }
}

class Efecto extends Carta {
  constructor(nombre, costo, texto, stat, magnitud) {
    super(nombre, costo);
    this.texto = texto;
    this.stat = stat;
    this.magnitud = magnitud;
  }

  aplicar(objetivo) {
    if (!(objetivo instanceof Unidad)) {
      throw new Error("Solo se puede aplicar el efecto a una unidad.");
    }
    console.log(`El jugador juega "${this.nombre}" en "${objetivo.nombre}": ${this.texto}`);
    objetivo.modificarAtributo(this.stat, this.magnitud);
  }
}

// Jugadores 
const jugador1 = "Jugador 1";
const jugador2 = "Jugador 2";

const ninjaRojo = new Unidad("Ninja Cinturón Rojo", 3, 3, 4);
const ninjaNegro = new Unidad("Ninja Cinturón Negro", 4, 5, 4);

const algoritmoDificil = new Efecto("Algoritmo Difícil", 2, "Aumentar la resistencia del objetivo en 3", "resistencia", 3);
const rechazoPromesa = new Efecto("Rechazo de promesa no manejado", 1, "Reducir la resistencia del objetivo en 2", "resistencia", -2);
const programacionPareja = new Efecto("Programación en pareja", 3, "Aumentar el poder del objetivo en 2", "poder", 2);

// Simulando el juego
console.log(`${jugador1} - Turno 1:`);
ninjaRojo.invocar();
algoritmoDificil.aplicar(ninjaRojo);
ninjaRojo.mostrarEstado();

console.log(`${jugador2} - Turno 2:`);
ninjaNegro.invocar();
rechazoPromesa.aplicar(ninjaRojo);
ninjaRojo.mostrarEstado();

console.log(`${jugador1} - Turno 3:`);
programacionPareja.aplicar(ninjaRojo);
ninjaRojo.atacar(ninjaNegro);
ninjaRojo.mostrarEstado();
ninjaNegro.mostrarEstado();

  