
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
  
    seleccionarUnidad() {
      console.log(`${this.nombre} ha sido seleccionada.`);
    }
  
    atacar(objetivo) {
      if (!(objetivo instanceof Unidad)) {
        throw new Error("Solo se puede atacar a otra Unidad.");
      }
      console.log(`${this.nombre} ataca a ${objetivo.nombre}`);
      objetivo.recibirDanio(this.poder);
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
  }
  
  class Efecto extends Carta {
    constructor(nombre, costo, descripcion, atributo, valor) {
      super(nombre, costo);
      this.descripcion = descripcion;
      this.atributo = atributo;
      this.valor = valor;
    }
  
    aplicar(objetivo) {
      if (!(objetivo instanceof Unidad)) {
        throw new Error("Solo se puede aplicar el efecto a una unidad.");
      }
      console.log(`${this.nombre} aplica el efecto en ${objetivo.nombre}: ${this.descripcion}`);
      objetivo.modificarAtributo(this.atributo, this.valor);
    }
  }
  
  // Jugadores y cartas
  const jugador1 = "Jugador 1";
  const jugador2 = "Jugador 2";
  
  const ninjaRojo = new Unidad("Ninja Cinturón Rojo", 3, 3, 4);
  const ninjaNegro = new Unidad("Ninja Cinturón Negro", 4, 5, 4);
  
  const algoritmoDificil = new Efecto("Algoritmo Difícil", 2, "Aumenta la resistencia del objetivo en 3", "resistencia", 3);
  const rechazoPromesa = new Efecto("Rechazo de Promesa no Controlada", 1, "Reduce la resistencia del objetivo en 2", "resistencia", -2);
  const programacionPareja = new Efecto("Programación en Pareja", 3, "Aumenta el poder del objetivo en 2", "poder", 2);
  
  // Simulación
  console.log(`${jugador1} invoca a:`);
  ninjaRojo.seleccionarUnidad();
  algoritmoDificil.aplicar(ninjaRojo);
  console.log(ninjaRojo);
  
  console.log(`${jugador2} invoca a:`);
  ninjaNegro.seleccionarUnidad();
  rechazoPromesa.aplicar(ninjaRojo);
  console.log(ninjaRojo);
  
  console.log(`${jugador1} aplica efecto:`);
  programacionPareja.aplicar(ninjaRojo);
  console.log(ninjaRojo);
  
  ninjaRojo.atacar(ninjaNegro);
  console.log(ninjaNegro);
  