addEventListener("DOMContentLoaded", async () => {
    let url = "/api/session/current"


    const response = await fetch(url)
    const data = await response.json();
    let comprar = document.getElementById("finalizarCompra")
    let urlCompleta = "/api/carts/" + data.cart + "/purchase"
    comprar.href = urlCompleta

})