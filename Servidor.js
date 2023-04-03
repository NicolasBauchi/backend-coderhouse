const http = require("http");

const server = http.createServer((request, response) => {
    response.end("Mi primer hola mundo desde backend node.");
});
let port = 8090;
server.listen(port, () => {
    console.log("Escuchando puerto " + port);
})