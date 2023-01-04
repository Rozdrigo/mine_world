const express = require('express');
const fileSystem = require('fs');

const noise = require("./noise");
const image = require("./image");

const app = express();

function getPathFiles(diretorio){
    var pathFilesList = fileSystem.readdirSync(diretorio);
    return pathFilesList;
}

//Paginas
app.get("/", (req, res) => res.sendFile(__dirname + "/pages/index.html"));
app.get("/index.js", (req, res) => res.sendFile(__dirname + "/pages/index.js"));
app.get("/js/three.js", (req, res) => res.sendFile(__dirname + "/js/three.js"));
app.get("/js/jquery.js", (req, res) => res.sendFile(__dirname + "/js/jquery.js"));
app.get("/js/buffergeometricutils.js", (req, res) => res.sendFile(__dirname + "/js/buffergeometricutils.js"));

//Recursos
app.get("/textures/GrassBottom.jpg", (req, res) => res.sendFile(__dirname + "/textures/GrassBottom.jpg"));
app.get("/textures/GrassSide.jpg", (req, res) => res.sendFile(__dirname + "/textures/GrassSide.jpg"));
app.get("/textures/GrassTop.jpg", (req, res) => res.sendFile(__dirname + "/textures/GrassTop.jpg"));
app.get("/textures/Sand.jpg", (req, res) => res.sendFile(__dirname + "/textures/Sand.jpg"));
app.get("/textures/ThreeBottom.jpg", (req, res) => res.sendFile(__dirname + "/textures/ThreeBottom.jpg"));
app.get("/textures/ThreeSide.jpg", (req, res) => res.sendFile(__dirname + "/textures/ThreeSide.jpg"));
app.get("/textures/Leaf.jpg", (req, res) => res.sendFile(__dirname + "/textures/Leaf.jpg"));
app.get("/textures/Water.jpg", (req, res) => res.sendFile(__dirname + "/textures/Water.jpg"));

//Recursos não estaticos
const dirs = getPathFiles("maps");
function dinamic_routes(dir){
    app.get("/" + dir, (req, res) => res.sendFile(__dirname + "/" + dir));
}

//Serviços
app.get("/noise", (req, res) => {
    var size = req.query.size;
    var base = req.query.base;
    res.status(200).send(noise.vectorNoise(size, base));
});
app.get("/makeImage", (req, res) => {
    var map = req.query.matriz;
    var response = image.makeImage(map);
    setTimeout(()=>{
        dinamic_routes(response);
        res.status(200).send( response );
    }, 500)
});

app.listen(3000, () => print("Aplicação rodando..."))

var print = (x) => console.log(x);