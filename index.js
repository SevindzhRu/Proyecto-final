
Swal.fire(
  'Welcome!',
  'You have entered to the best player',
  'success'
)

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
let inputAlbum
let inputWatch
let contenedorCanciones
let botonesCloseModalAddSong

class Song {
  constructor(id, name, watch, album) {
    this.id = id
    this.name = name.toUpperCase()
    this.album = album;
    this.watch = watch;
    
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
  inputAlbum = document.getElementById("inputAlbum")
  inputWatch = document.getElementById ("inputWatch")
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

// Operador avanzado

function openModalAddSong() {
  user?modal.show():Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'Enter for add song!'
  })
  //alert("Enter for add song")
  // if (user) {
  //   modal.show();
  // } else {
  //   alert("Enter for add song");
  // }
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
  let album = inputAlbum.value
  let watch = inputWatch.value

  const idExiste = songs.some((song) => song.id === idSong)
  if (!idExiste) {
    let song = new Song(idSong, name, watch, album,)
    songs.push(song)
    formulario.reset()
     
Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your have added a song',
  showConfirmButton: false,
  timer: 1500
})
    // alert("You have added a song")
    actualizarSongsStorage()
    pintarSongs()
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'This ID alredy exists!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    // alert("This id already exists")
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
    column.id = `column-${song.id}`;
    let videoId = song.watch.split ("=")[1];
    column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${song.id}</b>
                </p>
                <p class="card-text">Name:
                    <b>${song.name}</b>
                </p>
                <p class="card-text">Album:
                    <b>${song.album}</b>
                </p>
                <p class="card-text">watch:
                <b>${song.watch}</b>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}"
                title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
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

async function showSongs() {
  try {
    const response = await fetch(
      "https://63442f3bdcae733e8fd98eaa.mockapi.io/songs"
    );
    const data = await response.json();
    songs = [...data];
    pintarSongs();
  } catch (error) {
    console.log(error);
  }
}

function main() {
  inicializarElementos()
  inicializarEventos()
  showSongs()
  getSongStorage()
  getUserStorage()
}

main()
