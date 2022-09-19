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


// function mostrarMenu() {
//     let opcion = prompt(
//       "Bienvenido, seleccione una opción \n1. Agregar cancion a la lista\n2. Eliminar cancion de la lista\n3. Salir del menu"
//     );
//     return opcion;
//   }

//   mostrarMenu()


  
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

const tuLista = []

let opcion

do {
    opcion = parseInt(prompt("Bienvenido, seleccione una opción \n1.Best Songs\n2.Crea tu propia lista lista\n3.Ver tu selección \n4 Salir del menu"))


    switch (opcion) {
        case 1:

            function mostrarMenu() {
                let mensaje = "Best Songs"
                let count = 1

                for (let song of bestSongs) {
                    mensaje += `\n${count}. ${song}`
                    count++
                }
                //  mensaje += `\n${count}. Finalizar`
                return mensaje
            }

            alert(mostrarMenu())

            break
        case 2:
            let song = prompt("Escribe el nombre de la canción")
            tuLista.push(song)
            console.log(tuLista)

            break
        case 3:

            function nuevaLista() {
                let mensaje = "Tu selección"
                let count = 1

                for (let song of tuLista) {
                    mensaje += `\n${count}. ${song}`
                    count++
                }
                return mensaje
            }
            alert(nuevaLista())
            break

        case 4:
            alert("Gracias por tu visita")

    }

} while (opcion !== 4)


// for (let index = 0; index < bestSongs.length; index++) {
//     console.log("index: "+ index + " : "+ bestSongs [index])
//    }

// const allSongs = bestSongs.concat (otherSongs)
// console.log (allSongs)



// let elementoEncontrado = bestSongs.find(
//   (elemento) => elemento === "Lonely"
// )
// console.log(elementoEncontrado)


// let newList = bestSongs.map((elemento) => ({
// elemento,
// }));

// console.log(newList)

// function main(){
//   crearUsuario()
//   mostrarMenu()
// }

// main()

console.log(document)

console.log(document.head)
console.log(document.body)



const playList = [
    {
        id: 1,
        name: "We Are The Champions",

    },

    {
        id: 2,
        name: "Lonely",

    },

    {
        id: 3,
        name: "Bohemian Rhapsody",
    },

    {
        id: 4,
        name: "Show Must Go On",
    },

    {
        id: 5,
        name: "We Will Rock You",
    },

]

const contenedorCanciones = document.getElementById("contenedor-canciones")


for (const cancion of playList) {
  let column = document.createElement("div");
  column.className = "col-md-6 mt-4 ";
  column.id = `columna-${cancion.id}`;
  column.innerHTML = `
      <div class="card">
          <div class="card-body">
          <p class="card-text"> Name: <b>${cancion.name}</b></p>
          </div>
      </div>`

  contenedorCanciones.append(column);
}
