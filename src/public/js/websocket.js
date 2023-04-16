console.log("Conexion con Socket");
eventoForm();
const socket = io();
const ulistado = document.getElementById('ul_listado')

socket.on('formProd', data => {
    let prods = ''
    data.forEach(unProd => {
        prods +=
            `<li><div><b>ID:</b> ${unProd.id}</div>
                <div><b>Title:</b> ${unProd.title}</div>
                <div><b>Description:</b> ${unProd.description}</div>
                <div><b>Price:</b> ${unProd.price}</div>
                <div><b>Thumbnail:</b> ${unProd.thumbnail}</div>
                <div><b>Code:</b> ${unProd.code}</div>
                <div><b>Stock:</b> ${unProd.stock}</div>
                <div><b>Category:</b> ${unProd.category}</div>
                <div><b>Status:</b> ${unProd.status}</div> </li>`
    })
    ulistado.innerHTML = prods
})




function eventoForm() {
    const doc = document.getElementById("formularioAgregarProd");
    doc.addEventListener("submit", postForm)
}

function postForm(e) {

    e.preventDefault();
    let datos = {};
    datos.title = document.getElementById("title").value;
    datos.description = document.getElementById("description").value;
    datos.price = document.getElementById("price").value;
    datos.thumbnail = document.getElementById("thumbnail").value;
    datos.code = document.getElementById("code").value;
    datos.stock = document.getElementById("stock").value;
    datos.category = document.getElementById("category").value;

    if (!datos.title) {
        alert("No puede estar vacio TITLE");
        return
    }

    /* let jsonData = JSON.stringify(datos);
    socket.emit('agregarProducto', jsonData); */

    
    socket.emit('agregarProducto', datos);


}


