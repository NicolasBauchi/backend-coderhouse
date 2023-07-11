
eventoFormulario()
//cargarCarrito()

addEventListener("DOMContentLoaded", async () => {
    let url = "/api/session/current"


    const response = await fetch(url)
    const data = await response.json();
    console.log("data que recibo de fetch", data);
    let carro = document.getElementById("anchorCarrito")
    let urlCompleta = "/carts/" + data.cart
    carro.href = urlCompleta
})



function eventoFormulario() {
    const formToCarro = document.getElementById("formProdCarrito")
    formToCarro.addEventListener("submit", productForm);
}



async function productForm(evt) {

    evt.preventDefault();
    let datos = {};
    datos.id = document.getElementById("form_id").innerText;
    datos.title = document.getElementById("form_title").innerText;
    datos.description = document.getElementById("form_description").innerText;
    datos.price = document.getElementById("form_price").innerText;
    datos.thumbnail = document.getElementById("form_thumbnail").innerText;
    datos.code = document.getElementById("form_code").innerText;
    datos.servicio = document.getElementById("form_stock").innerText;
    datos.category = document.getElementById("form_category").innerText;
    datos.status = document.getElementById("form_status").innerText;


    //Envio de info - agregar prod al carrito
    let URL = "/api/carts/0/product/" + datos.id;
    console.log("url ", URL);

    const envio = fetch(URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

    })


}
