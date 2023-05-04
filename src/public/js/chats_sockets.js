
console.log("Estableciendo conexión con servidor...");
eventoForm();
const socket = io();

//let usuario = document.getElementById('usuarioName').innerText;
var usuario = ""


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


socket.on("losMensajes", async data => {

    let chat = document.getElementById('losChats');

    let contenido = 
        `<div><b>Usuario:</b> ${data.usuario}</div>
        <div><b>Mensaje:</b> ${data.mensaje}</div>`;

    let mensaje = document.createElement("li");
    mensaje.innerHTML = contenido;

    chat.appendChild(mensaje);





    /* prueba -->
    let chats = ''
    data.forEach(unMsj => {
        chats +=
            `<li><div><b>Usuario:</b> ${unMsj.usuario}</div>
                <div><b>Mensaje:</b> ${unMsj.mensaje}</div></li>`
    })
    chat.innerHTML = chats; */
});




function eventoForm() {
    const doc = document.getElementById("formChat");
    doc.addEventListener("submit", postForm)
}

function postForm(e) {

    e.preventDefault();
    let datos = {};
    datos._id = Math.floor(Math.random() * 100000);
    datos.usuario = document.getElementById('usuarioName').innerText;
    datos.mensaje = document.getElementById("tuMensaje").value;

    document.getElementById("tuMensaje").value = "";

    if (!datos.mensaje) {
        alert("Mensaje vacío? :/ \n No se admiten. Se debe escribir algo en el mensaje.");
        return
    }

    socket.emit('envioMessage', datos);
}
