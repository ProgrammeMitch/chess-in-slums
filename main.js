import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
//import gsap from './node_modules/gsap/index';

//Core Variables
let scene;
let camera;
let renderer;
let controls;
let light;
let plane;
const mouse = { x: undefined, y: undefined };
const spotlight = new THREE.SpotLight(0xfff678);

//Chess Piece Variables
let pawn;
let rook;
let queen;
let king;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xffffff);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    //
    window.addEventListener( 'resize', onWindowResize );

    createControls( camera );

    //light

    scene.add( new THREE.HemisphereLight( 0x8d7c7c, 0x494966, 3 ) );

    addShadowedLight( 90, 70, 5, 0xffffff, 5 );
    addShadowedLight( 90, 30, - 5, 0xffd500, 5 );

    /**light = new THREE.DirectionalLight();
    light.position.set(50, 100, 20);
    light.castShadow = true;
    light.shadow.camera.left = -10;
    light.shadow.camera.right = 10;
    light.shadow.camera.top = 10;
    light.shadow.camera.bottom = -10;*/


    const floorGeometry = new THREE.PlaneGeometry( 1000, 1200 );
    const floorMesh = new THREE.Mesh( floorGeometry, new THREE.MeshStandardMaterial( {
        roughness: 0.8,
        color: 0xffffff,
        metalness: 0.2,
        bumpScale: 1
    } ) );
    floorMesh.receiveShadow = true;
    floorMesh.rotation.x = - Math.PI / 2.0;
    console.log(floorMesh )
    scene.add( floorMesh );

    createPawn()
    createRook()
    createQueen()
    createKing()
    //generatePieces() 
    camera.position.z = 70;
    camera.position.y = 50;
}

function addShadowedLight( x, y, z, color, intensity ) {

    const directionalLight = new THREE.DirectionalLight( color, intensity );
    directionalLight.position.set( x, y, z );
    scene.add( directionalLight );

   directionalLight.castShadow = true;

    const d = 1000;
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;

    directionalLight.shadow.camera.near = 1;
    directionalLight.shadow.camera.far = 1000;

    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    directionalLight.shadow.bias = - 0.001;

}

function createControls( camera ) {
    

    controls = new TrackballControls( camera, renderer.domElement );

    controls.noPan = true;
    controls.noRotate = true;
    controls.maxDistance = 500;
    controls.minDistance = 50;
    console.log(controls.object)
    //controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 0.5;
    //controls.panSpeed = 0.8;

    controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];
    console.log(controls.keys)
}

function createPawn() {
    const pawnLowestBase = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 4, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    pawnLowestBase.position.set(0, 0, 0);

    const pawnMidBase = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 7, 3, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    pawnMidBase.position.set(0, 3, 0);

    const pawnNeck = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 5, 10, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    pawnNeck.position.set(0, 7, 0);

    const pawnHeadBase = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 1, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    pawnHeadBase.position.set(0, 12, 0);

    const pawnHead = new THREE.Mesh(
        new THREE.SphereGeometry(5, 64, 32),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    pawnHead.position.set(0, 15, 0);

    pawn = new THREE.Group();
    pawn.add(pawnLowestBase);
    pawn.add(pawnMidBase);
    pawn.add(pawnNeck);
    pawn.add(pawnHeadBase);
    pawn.add(pawnHead);
    pawn.position.z = 150
    pawn.position.x = -50

    pawn.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
        }
    })

    scene.add(pawn);

    return pawn;
}

function createRook() {
    const rookLowestBase = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 4, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookLowestBase.position.set(20, 0, 0);

    const rookMidBase = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 7, 3, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookMidBase.position.set(20, 3, 0);

    const rookNeck = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 5, 20, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookNeck.position.set(20, 8, 0);

    const rookHeadBase = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 2, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookHeadBase.position.set(20, 18, 0);

    const rookHeadLeftTeeth = new THREE.Mesh(
        new THREE.BoxGeometry(3, 5, 3),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookHeadLeftTeeth.position.set(16, 20, 0);

    const rookHeadRightTeeth = new THREE.Mesh(
        new THREE.BoxGeometry(3, 5, 3),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookHeadRightTeeth.position.set(24, 20, 0);

    const rookHeadCenterTeeth = new THREE.Mesh(
        new THREE.BoxGeometry(3, 5, 3),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    rookHeadCenterTeeth.position.set(20, 20, 0);

    rook = new THREE.Group();
    rook.add(rookLowestBase);
    rook.add(rookMidBase);
    rook.add(rookNeck);
    rook.add(rookHeadBase);
    rook.add(rookHeadLeftTeeth);
    rook.add(rookHeadRightTeeth);
    rook.add(rookHeadCenterTeeth);
    rook.position.z = 320
    rook.position.x = 60

    rook.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true
        }
    })

    scene.add(rook);

    return rook;
}

function createQueen() {
    const queenLowestBase = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 4, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenLowestBase.position.set(40, 0, 0);

    const queenMidBase = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 7, 3, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenMidBase.position.set(40, 3, 0);

    const queenNeck = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 5, 20, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenNeck.position.set(40, 8, 0);

    const queenHeadBase = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 2, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenHeadBase.position.set(40, 18, 0);

    const queenHeadStart = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 4, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenHeadStart.position.set(40, 20, 0);

    const queenHeadBreak = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 1, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenHeadBreak.position.set(40, 22, 0);

    const queenHeadFinal = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 3, 5, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenHeadFinal.position.set(40, 25, 0);

    const queenCrown = new THREE.Mesh(
        new THREE.SphereGeometry(3, 64, 32),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    queenCrown.position.set(40, 28, 0);

    queen = new THREE.Group();
    queen.add(queenLowestBase);
    queen.add(queenMidBase);
    queen.add(queenNeck);
    queen.add(queenHeadBase);
    queen.add(queenHeadStart);
    queen.add(queenHeadBreak);
    queen.add(queenHeadFinal);
    queen.add(queenCrown);
    queen.position.z = 450
    queen.position.x = -90

    queen.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true
        }
    })

    scene.add(queen);

    return queen;
}

function createKing() {

    const kingLowestBase = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 10, 4, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingLowestBase.position.set(-20, 0, 0);

    const kingMidBase = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 7, 3, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingMidBase.position.set(-20, 3, 0);

    const kingNeck = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 5, 20, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingNeck.position.set(-20, 8, 0);

    const kingHeadBase = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 2, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingHeadBase.position.set(-20, 18, 0);

    const kingHeadBaseEnd = new THREE.Mesh(
        new THREE.CylinderGeometry(5, 5, 1, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingHeadBaseEnd.position.set(-20, 19.5, 0);

    const kingHeadStart = new THREE.Mesh(
        new THREE.CylinderGeometry(4, 4, 6, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingHeadStart.position.set(-20, 23, 0);

    const kingHeadBreak = new THREE.Mesh(
        new THREE.CylinderGeometry(6, 6, 2, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingHeadBreak.position.set(-20, 27, 0);

    const kingHeadFinal = new THREE.Mesh(
        new THREE.CylinderGeometry(3, 3, 1, 42, 1),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingHeadFinal.position.set(-20, 28, 0);

    const kingCrownVertical = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 6),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingCrownVertical.position.set(-20, 32, 0);
    kingCrownVertical.rotateY(190)

    const kingCrownHorizontal = new THREE.Mesh(
        new THREE.BoxGeometry(3, 7, 3),
        new THREE.MeshPhongMaterial({ color: 0x566D7E })
    );
    kingCrownHorizontal.position.set(-20, 32, 0);

    king = new THREE.Group();
    king.add(kingLowestBase);
    king.add(kingMidBase);
    king.add(kingNeck);
    king.add(kingHeadBase);
    king.add(kingHeadBaseEnd);
    king.add(kingHeadStart);
    king.add(kingHeadBreak);
    king.add(kingHeadFinal);
    king.add(kingCrownVertical);
    king.add(kingCrownHorizontal);
    king.position.x = 60

    king.traverse((node) => {
        if (node.isMesh) {
            node.castShadow = true
        }
    })

    scene.add(king)

    return king;
}

addEventListener('mousemove', () => {
    mouse.x = (event.clientX / innerWidth) * 2 - 1,
        mouse.y = (event.clientX / innerWidth) * 2 + 1
})

addEventListener('scrollend', () => {

    console.log(controls.object)
})

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    camera.position.y = 10;

    //king.rotation.x += 0.01;
    //rook.rotation.y += 0.001;

    /**gsap.to(pawn.rotation, {
        x: mouse.y * 0.3,
        y: mouse.x * 0.4,
        duration: 1
    })

    gsap.to(rook.rotation, {
        x: mouse.y * 0.3,
        y: mouse.x * 0.4,
        duration: 1
    })

    gsap.to(king.rotation, {
        x: mouse.y * 0.3,
        y: mouse.x * 0.4,
        duration: 1
    })

    gsap.to(queen.rotation, {
        x: mouse.y * 0.3,
        y: mouse.x * 0.4,
        duration: 1
    })
*/

    renderer.render(scene, camera);
}

function onWindowResize() {

    const aspect = window.innerWidth / window.innerHeight;

    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    controls.handleResize();

}

init()
animate()