const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb, 1);

document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();

//Texturas
const Dirt = [
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
];
const Grass = [
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassSide.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassSide.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassTop.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassSide.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/GrassSide.jpg') }),
];
const Sand = [
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Sand.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Sand.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Sand.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Sand.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Sand.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Sand.jpg') }),
];
const Three = [
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/ThreeSide.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/ThreeSide.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/ThreeBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/ThreeBottom.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/ThreeSide.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/ThreeSide.jpg') }),
];
const Leaf = [
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Leaf.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Leaf.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Leaf.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Leaf.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Leaf.jpg') }),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Leaf.jpg') }),
]
const Water = [
    new THREE.MeshBasicMaterial({ color: 0x4040ff, opacity: 0, transparent: true}),
    new THREE.MeshBasicMaterial({ color: 0x4040ff, opacity: 0, transparent: true}),
    new THREE.MeshBasicMaterial({ map: loader.load('/textures/Water.jpg'), opacity: 0.5, transparent: true}),
    new THREE.MeshBasicMaterial({ color: 0x4040ff, opacity: 0, transparent: true}),
    new THREE.MeshBasicMaterial({ color: 0x4040ff, opacity: 0, transparent: true}),
    new THREE.MeshBasicMaterial({ color: 0x4040ff, opacity: 0, transparent: true}),
]

function observer_object_on_move(element, action) {
    var initialpos = null
    var pressed = false;
    element.addEventListener('touchstart', () => pressed = true);
    element.addEventListener('touchend', () => {
        pressed = false;
        initialpos = null;
    })
    element.addEventListener('touchmove', function (e) {
        if (pressed) {
            if (initialpos == null) {
                initialpos = { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
            }
            var varianceX = initialpos.x - e.changedTouches[0].screenX
            var varianceY = initialpos.y - e.changedTouches[0].screenY
            //Executa a função recebida passando os seguintes parametros;
            action(varianceX, varianceY, e.changedTouches[0].screenX, e.changedTouches[0].screenY);
        }
    });
}
function move_player_while_press(element, a, b) {
    element.on("touchstart", () => {
        var touched = true;
        console.log("tocou")
        element.on("touchend", () => {
            touched = false;
        })
        element.on("touchcancel", () => {
            touched = false;
        })
        setInterval(() => {
            if (touched) {
                var angle = sigmoid(camera.rotation.y / 2) * 360;
                var latros = { x: -1, y: -1 }
                var diference = { x: 0, y: 0 }
                if (angle >= 0 && angle < 90) {
                    latros = { x: 1, y: 1 }
                } else if (angle > 90 && angle < 180) {
                    latros = { x: -1, y: -1 }
                } else if (angle >= 180 && angle < 270) {
                    latros = { x: -1, y: -1 }
                } else {
                    latros = { x: -1, y: 1 }
                }
                camera.translateOnAxis(new THREE.Vector3(1, 0, 0), latros.x * a);
                camera.translateOnAxis(new THREE.Vector3(0, 0, 1), latros.y * b);
            }
        }, 1);
    })
}
function three_func(x, y, z, matriz) {
    for (var i = 0; i < 4; i++) {
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        geometry.translate(x, y + 1 + i, z);
        cube = new THREE.Mesh(geometry, Three);
        scene.add(cube);
    }
    for (var k = 0; k < 3; k++) {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 5; j++) {
                let geometry = new THREE.BoxGeometry(1, 1, 1);
                geometry.translate(x - 2 + i, y + 4 + k, z - 2 + j);
                cube = new THREE.Mesh(geometry, Leaf);
                scene.add(cube);
                matriz[(x - 2 + i)][(z - 2 + j)] = 10;
            }
        }
    }
    for (var k = 0; k < 2; k++) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                let geometry = new THREE.BoxGeometry(1, 1, 1);
                geometry.translate(x - 2 + i + 1, y + 4 + k + 3, z - 2 + j + 1);
                cube = new THREE.Mesh(geometry, Leaf);
                scene.add(cube);
                matriz[(x - 2 + i + 1)][(z - 2 + j + 1)] = 11;
            }
        }
    }
    return matriz;
}
function sigmoid(z) {
    //Uma função sigmoid transforma o valor recebido em um numero entre zero e um;
    return 1 / (1 + Math.exp(-z));
}

//Geração de mundo
const size = 24; //Tamanho da geração de mapa;
$.ajax({
    url: "/noise",
    type: 'get',
    data: {
        size: size,
        base: 10
    },
    success: function (matriz) {
        matriz.map((array, x) => {
            array.map((y, z) => {

                //Gerando grama e areia;
                let geometry = new THREE.BoxGeometry(1, 1, 1);
                geometry.translate(x, y, z);

                if (y < 4) {
                    let cube = new THREE.Mesh(geometry, Sand);
                    scene.add(cube);
                    let _geometry = new THREE.BoxGeometry(1, 1, 1);
                    _geometry.translate(x, 4, z);
                    let _cube = new THREE.Mesh(_geometry, Water);
                    scene.add(_cube);
                }else {
                    let cube = new THREE.Mesh(geometry, Grass);
                    cube.castShadow = true;
                    cube.receiveShadow = true;          
                    scene.add(cube);
                }

                //Gerando terras sem grama;
                for (var i = y - 1; i > 0; i--) {
                    let _geometry = new THREE.BoxGeometry(1, 1, 1);
                    _geometry.translate(x, i, z);
                    let _cube = new THREE.Mesh(_geometry, Dirt);
                    scene.add(_cube);
                }
            })
        });

        if(matriz[4][4] > 4){
            matriz = three_func(4, matriz[4][4], 4, matriz);
        }

        $.ajax({
            url: "/makeImage",
            type: 'get',
            data: { matriz },
            success: function (dir) {
                $("body").append(`
                    <img style="width: 150px; transform: rotate(90deg); heigth:150px; position: absolute; top: 5px; right: 5px; border: white solid 2px;" src="${dir}"/>
                `);
            }
        });

        camera.position.set(size / 2, 10, size / 2);
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(size / 2, 80, size / 2);
        scene.add(spotLight);
    }
});

observer_object_on_move(document.getElementById("moviment"), (a, b) => {
    var angle = sigmoid(camera.rotation.y / 2) * 360;
    var weight = { x: -1, y: -1 }
    if (angle >= 0 && angle < 90) {
        weight = { x: 1, y: 1 }
    } else if (angle > 90 && angle < 180) {
        weight = { x: -1, y: -1 }
    } else if (angle >= 180 && angle < 270) {
        weight = { x: -1, y: -1 }
    } else {
        weight = { x: -1, y: 1 }
    }
    camera.translateOnAxis(new THREE.Vector3(1, 0, 0), weight.x * a / 900);
    camera.translateOnAxis(new THREE.Vector3(0, 0, 1), weight.y * b / 900);
});
observer_object_on_move(document.getElementById("rotation"), (a, b) => {
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), a / 7000);
    camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), (1) * b / 4000);
});

move_player_while_press($("#up"), 0, 0.2);
move_player_while_press($("#down"), 0, -0.2);
move_player_while_press($("#rigth"), -0.2, 0);
move_player_while_press($("#left"), 0.2, 0);

//Função recursiva de render;
function render() {
    $('#f3').html(`Rotation: X: ${(camera.rotation.x)
        .toString().slice(0, 4)}, Y: ${(camera.rotation.y)
            .toString().slice(0, 4)}, Z: ${(camera.rotation.z)
                .toString().slice(0, 4)} G: ${(sigmoid(camera.rotation.y / 2) * 360)
                    .toString().slice(0, 6)}°`);
    renderer.render(scene, camera);
    requestAnimationFrame(render)
}
render();