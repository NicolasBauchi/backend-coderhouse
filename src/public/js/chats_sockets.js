
console.log("Estableciendo conexión con servidor...");
eventoForm();
//Conexion handshake con el servidor
const socket = io();

var usuario = ""

//Pido Nombre usuario al cliente:
swal.fire({
    title: 'Identificate',
    input: 'text',
    text: 'Ingresar el nombre de usuario.',
    inputValidator: (value) => {
        return !value && 'El nombre de usuario es obligatorio'
    },
    allowOutsideClick: false,
    allowEscapeKey: false
}).then(result => {
    usuario = result.value
    document.getElementById('usuarioName').innerText = usuario;
})

//Recibo los mensajes desde el servidor:
socket.on("losMensajes", data => {

    let chat = document.getElementById('losChats');

    let contenido = 
        `<div><b>Usuario:</b> ${data.user}</div>
        <div><b>Mensaje:</b> ${data.message}</div>`;

    let mensaje = document.createElement("li");
    mensaje.innerHTML = contenido;

    chat.appendChild(mensaje);

});



//Evento para obtener mensaje del INPUT del cliente.
function eventoForm() {
    const doc = document.getElementById("formChat");
    doc.addEventListener("submit", postForm)
}

function postForm(e) {

    e.preventDefault();
    let datos = {};
    /* datos._id = Math.floor(Math.random() * 100000); */
    datos.user = document.getElementById('usuarioName').innerText;
    datos.message = document.getElementById("tuMensaje").value;

    document.getElementById("tuMensaje").value = "";

    if (!datos.message) {
        alert("Mensaje vacío? :/ \n No se admiten. Se debe escribir algo en el mensaje.");
        return
    }

    //envio mensaje al servidor:
    socket.emit('envioMessage', datos);
}
