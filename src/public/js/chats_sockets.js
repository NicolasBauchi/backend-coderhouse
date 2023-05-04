console.log("Estableciendo conexión con servidor...");
eventoForm();
const socket = io();

const chat = document.getElementById('losChats');
const usuario = document.getElementById('usuarioName').innerText;
var chats = ''
socket.on("losMensajes", async data => {
   
    
    await data.forEach(unMsj => {
        chats +=
            `<li><div><b>Usuario:</b> ${unMsj.usuario}</div>
                <div><b>Mensaje:</b> ${unMsj.mensaje}</div></li>`
    })

    
    
   
    /*  else {
        chats +=
            `<li><div><b>Usuario:</b> ${data.usuario}</div>
                <div><b>Mensaje:</b> ${data.mensaje}</div></li>`
    } */
});
chat.innerHTML = chats;

function eventoForm() {
    const doc = document.getElementById("formChat");
    doc.addEventListener("submit", postForm)
}

function postForm(e) {

    e.preventDefault();
    let datos = {};
    datos.usuario = usuario;
    datos.mensaje = document.getElementById("tuMensaje").value;
    document.getElementById("tuMensaje").innerText = " ";

    if (!datos.mensaje) {
        alert("Mensaje vacío? :/ \n No se admiten. Se debe escribir algo en el mensaje.");
        return
    }

    socket.emit('envioMessage', datos);
}
