class Usuario {
    constructor(nombre, apellido, edad, pais, ciudad, esQueenFan) {
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.pais = pais
        this.ciudad = ciudad
        this.esQueenFan = esQueenFan
    }
}

function crearUsuario() {
  let nombre = prompt("Ingresa tu nombre")
  let apellido = prompt("Ingresa tu apellido")
  let edad = prompt("Ingresa tu edad")
  let pais = prompt("Ingresa tu pais")
  let ciudad = prompt("Ingresa tu ciudad")
  let esQueenFan = prompt("¿Eres fan de Queen? (Si/No)")

  if (esQueenFan.toLocaleLowerCase () === "si") {
    esQueenFan = true
  } else {
    alert ("Te recomiendo escucharlos")
  }

  const objetoUsuario = new Usuario(
    nombre,
    apellido,
    edad,
    pais,
    ciudad,
    esQueenFan
  );
  return objetoUsuario
}

const usuarioUno = crearUsuario()
console.info(usuarioUno)


function mostrarMenu() {
    let opcion = prompt(
      "Bienvenido, seleccione una opción \n1. Agregar cancion a la lista\n2. Eliminar cancion de la lista\n3. Salir del menu"
    );
    return opcion;
  }

  mostrarMenu()
  
  const bestSongs = [
    "Bohemian Rhapsody",
    "We Are The Champions",
    "We Will Rock You",
    "I Want To Break Free",
    "Radio Ga Ga",
    "Lonely",
    "The Show Must Go On",
    "Killer Queen",
    "Somebody To Love",
    "Dont Stop Me Now"
]

let otherSongs = [
    "Another One Bites The Dust",
    "Love Of My Life",
    "A King Of Magic",
    "Under Pressure",
    "Crazy Little Thing Colled Love"
]

console.log(bestSongs)

for (let index = 0; index < bestSongs.length; index++) {
    console.log("index: "+ index + " : "+ bestSongs [index])
   }

const allSongs = bestSongs.concat (otherSongs)
console.log (allSongs)



let elementoEncontrado = bestSongs.find(
  (elemento) => elemento === "Lonely"
)
console.log(elementoEncontrado)


let newList = bestSongs.map((elemento) => ({
elemento,
}));

console.log(newList)

// function main(){
//   crearUsuario()
//   mostrarMenu()
// }

// main()
