let songs = []
let user

let formularioIdentificacion
let contenedorIdentificacion
let contenedorUsuario
let textoUsuario
let botonLimpiarStorage

let modalAddSong
let botonAddSong
let formulario
let inputId
let inputName
let inputYear
let inputAlbum
let contenedorCanciones
let botonesCloseModalAddSong

class Song {
  constructor(id, name, year, album) {
    this.id = id
    this.name = name.toUpperCase()
    this.year = year
    this.album = album;
    
  }
}

function inicializarElementos() {
  formularioIdentificacion = document.getElementById("formularioIdentificacion")
  inputUsuario = document.getElementById("inputUsuario")
  contenedorIdentificacion = document.getElementById("contenedorIdentificacion")
  contenedorUsuario = document.getElementById("contenedorUsuario")
  textoUsuario = document.getElementById("textoUsuario")

  botonLimpiarStorage = document.getElementById("cleanStorage")
  formulario = document.getElementById("formularioAddSong")
  inputId = document.getElementById("inputId")
  inputName = document.getElementById("inputNameSong")
  inputYear = document.getElementById("inputYear")
  inputAlbum = document.getElementById("inputAlbum")
  contenedorCanciones = document.getElementById("contenedorCanciones")

  botonesCloseModalAddSong = document.getElementsByClassName("btnCloseModalAddSong")
  modalAddSong = document.getElementById("modalAddSong")
  botonAddSong = document.getElementById("AddSong")
  modal = new bootstrap.Modal(modalAddSong)
}


function inicializarEventos() {
  formulario.onsubmit = (event) => validarFormulario(event)
  formularioIdentificacion.onsubmit = (event) => identificarUsuario(event)
  botonLimpiarStorage.onclick = eliminarStorage
  botonAddSong.onclick = openModalAddSong

  for (const boton of botonesCloseModalAddSong) {
    boton.onclick = closeModalAddSong
  }
}

function openModalAddSong() {
  if (user) {
    modal.show();
  } else {
    alert("Enter for add song");
  }
}

function closeModalAddSong() {
  formulario.reset()
  modal.hide()
}


function eliminarStorage() {
  localStorage.clear()
  user = ""
  songs = []
  mostrarFormularioIdentificacion()
  pintarSongs()
}

function identificarUsuario(event) {
  event.preventDefault()
  user = inputUsuario.value
  formularioIdentificacion.reset()
  actualizarUsuarioStorage()
  mostrarTextoUsuario()
}

function mostrarTextoUsuario() {
  contenedorIdentificacion.hidden = true
  contenedorUsuario.hidden = false
  textoUsuario.innerHTML += ` ${user}`
}

function mostrarFormularioIdentificacion() {
  contenedorIdentificacion.hidden = false
  contenedorUsuario.hidden = true
  textoUsuario.innerHTML = ``
}

function validarFormulario(event) {
  event.preventDefault()
  let idSong = inputId.value
  let name = inputName.value
  let year = parseFloat(inputYear.value)
  let album = inputAlbum.value

  const idExiste = songs.some((song) => song.id === idSong)
  if (!idExiste) {
    let song = new Song(idSong, name, year, album,)

    songs.push(song)
    formulario.reset()
    alert("You have added a song")
    actualizarSongsStorage()
    pintarSongs()
  } else {
    alert("This id already exists")
  }
}

function deleteSongs(idSong) {
  let columnDelete = document.getElementById(`column-${idSong}`)
  let indexDelete = songs.findIndex(
    (song) => Number(song.id) === Number(idSong)
  )

  songs.splice(indexDelete, 1);
  columnDelete.remove();
  actualizarSongsStorage();
}

function pintarSongs() {
  contenedorCanciones.innerHTML = "";
  songs.forEach((song) => {
    let column = document.createElement("div");
    column.className = "col-md-4 mt-3";
    column.id = `columna-${song.id}`;
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${song.id}</b>
                </p>
                <p class="card-text">Name:
                    <b>${song.name}</b>
                </p>
                <p class="card-text">Year:
                    <b>${song.year}</b>
                </p>
                <p class="card-text">Album:
                    <b>${song.album}</b>
                </p>
                </div>
                <div class="card-footer">
                  <button class="btn btn-danger" id="botonDelete-${song.id}">Delete</button>
                </div>
            </div>`

    contenedorCanciones.append(column)

    let botonDelete = document.getElementById(`botonDelete-${song.id}`)
    botonDelete.onclick = () => deleteSongs(song.id)
  })
}

function actualizarSongsStorage() {
  let songsJSON = JSON.stringify(songs)
  localStorage.setItem("songs", songsJSON);
}

function actualizarUsuarioStorage() {
  localStorage.setItem("user", user)
}

function getSongStorage() {
  let songsJSON = localStorage.getItem("songs")
  if (songsJSON) {
    songs = JSON.parse(songsJSON)
    pintarSongs()
  }
}

function getUserStorage() {
  let usuarioAlmacenado = localStorage.getItem("user")
  if (usuarioAlmacenado) {
    user = usuarioAlmacenado
    mostrarTextoUsuario()
  }
}

function main() {
  inicializarElementos()
  inicializarEventos()
  getSongStorage()
  getUserStorage()
}

main()
