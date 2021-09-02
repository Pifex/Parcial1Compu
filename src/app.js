// Imports
import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import * as dat from 'dat.gui';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/controls/OrbitControls.js';

// Configuracion basica
let gui = undefined;
let size = 0;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();

// Paleta de colores
const palette = {
  bgColor: '#bfe3dd', // CSS String
};

let plane = undefined;
let spotLight;

// Variables generales
let countCube = undefined;
let countSphere = undefined;
let countAmLight = undefined;
let countDiLight = undefined;
let countPoLight = undefined;
let countSpoLight = undefined;
// let countSphere = undefined;
let GUIFolderCube = 1;
let GUIFolderSphere = 1;
let GUIFolderAmLight = 1;
let GUIFolderDiLight = 1;
let GUIFolderPoLight = 1;
let GUIFolderSpoLight = 1;

// Arreglos de objetos
const objectsCube = [];
const objectsSphere = [];
const objectsAmLight = [];
const objectsDiLight = [];
const objectsPoLight = [];
const objectsSpoLight = [];

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

export function reset() {
  scene.children = [];
  renderer.setSize(0, 0, true);
  countCube = 0;
  GUIFolderCube = 1;
  scene.children = [];
  renderer.setSize(0, 0, true);
  countSphere = 0;
  GUIFolderSphere = 1;
  countAmLight = 0;
  GUIFolderAmLight = 1;
}

export function main(optionSize) {
  reset();
  // Configuracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);

  camera.position.z = 15;
  camera.position.y = 15;

  // Controls
  new OrbitControls(camera, renderer.domElement);

  // Plano por defecto
  defaultPlane(optionSize);

  // GUI
  loadGUI();

  // Light
  setupLights();

  // Render
  animate();
}

//
function defaultPlane(size) {
  const geometry = new THREE.PlaneGeometry(size, size, size, size);
  const material = new THREE.MeshLambertMaterial({
    color: '#483D8B',
    side: THREE.DoubleSide,
    wireframe: false,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.castShadow = true;
  scene.add(plane);
  plane.rotation.x = Math.PI / 2;
}

//
function loadGUI() {
  cleanGUI();
  gui = new dat.GUI();
  gui.open();
}

// Limpia el GUI
export function cleanGUI() {
  const dom = document.querySelector('.dg.main');
  if (dom) dom.remove();
}

//
function setupLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

}

function animate() {
  requestAnimationFrame(animate);
  updateElements();
  renderer.render(scene, camera);
}



//Funcion Update IMPORTANTE

function updateElements() {
  _updateCubes();
  _updateSpheres();
  _updateAmLights();
  _updateDiLights();
  _updatePoLights();
  _updateSpoLights();
}

//

// Creacion de un Cubo en la escena

export function createCubeGeneric() {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0xb8860b,
    wireframe: true,
  });
  const cube = new THREE.Mesh(geometry, material);

  objectsCube.push(cube);
  cube.position.y = 0.5;
  cube.castShadow = true;
  cube.receiveShadow = true;

  cube.GUIcube = _cubeObject();
  _createCubeGUI(cube.GUIcube);


  scene.add(cube);

  countCube = countCube + 1;
}

function _cubeObject() {
  var GUIcube = {
    material: 'Basic',
    materialColor: 0xA9A9A9,
    wireframe: false,
    transparent: false,
    opacity: 1,
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    posX: 0,
    posY: 0.55,
    posZ: 0,
    RotX: 0,
    RotY: 0,
    RotZ: 0,
  };

  return GUIcube;
}

function _createCubeGUI(GUIcube) {
  const folder = gui.addFolder('Cube ' + GUIFolderCube);
  // Material
  folder.addColor(GUIcube, 'materialColor');
  folder.add(GUIcube, 'material', ['Basic', 'Phong', 'Lambert']);
  folder.add(GUIcube, 'wireframe');
  folder.add(GUIcube, 'transparent');
  folder.add(GUIcube, 'opacity', 0, 1);
  // Escala
  folder.add(GUIcube, 'scaleX', 1, Math.PI * 2);
  folder.add(GUIcube, 'scaleY', 1, Math.PI * 2);
  folder.add(GUIcube, 'scaleZ', 1, Math.PI * 2);

  // Posicion
  folder.add(GUIcube, 'posX', -6, Math.PI * 2);
  folder.add(GUIcube, 'posY', 0.5, Math.PI * 2);
  folder.add(GUIcube, 'posZ', -6, Math.PI * 2);

  // Rotacion
  folder.add(GUIcube, 'RotX', -6, Math.PI * 2);
  folder.add(GUIcube, 'RotY', -6, Math.PI * 2);
  folder.add(GUIcube, 'RotZ', -6, Math.PI * 2);

  GUIFolderCube = GUIFolderCube + 1;
}

function _updateCubes() {
  Object.keys(objectsCube).forEach((i) => {
    const cubeSelected = objectsCube[i];
    //Material cubo
    cubeSelected.GUIcube.material == 'Basic'
      ? (cubeSelected.material = new THREE.MeshBasicMaterial({
          color: cubeSelected.GUIcube.materialColor,
          wireframe: cubeSelected.GUIcube.wireframe,
          transparent: cubeSelected.GUIcube.transparent,
          opacity: cubeSelected.GUIcube.opacity,
        }))
      : cubeSelected.GUIcube.material == 'Lambert'
      ? (cubeSelected.material = new THREE.MeshLambertMaterial({
          color: cubeSelected.GUIcube.materialColor,
          wireframe: cubeSelected.GUIcube.wireframe,
          transparent: cubeSelected.GUIcube.transparent,
          opacity: cubeSelected.GUIcube.opacity,
        }))
      : (cubeSelected.material = new THREE.MeshPhongMaterial({
          color: cubeSelected.GUIcube.materialColor,
          wireframe: cubeSelected.GUIcube.wireframe,
          transparent: cubeSelected.GUIcube.transparent,
          opacity: cubeSelected.GUIcube.opacity,
        }));

    //Escalar cubo
    cubeSelected.geometry = new THREE.BoxGeometry(
      cubeSelected.GUIcube.scaleX,
      cubeSelected.GUIcube.scaleY,
      cubeSelected.GUIcube.scaleZ,
    );

    //Posición
    cubeSelected.position.x = cubeSelected.GUIcube.posX;
    cubeSelected.position.y = cubeSelected.GUIcube.posY;
    cubeSelected.position.z = cubeSelected.GUIcube.posZ;
    
    //Rotacion
    cubeSelected.rotation.x = cubeSelected.GUIcube.RotX;
    cubeSelected.rotation.y = cubeSelected.GUIcube.RotY;
    cubeSelected.rotation.z = cubeSelected.GUIcube.RotZ;

  });
}


// Creacion de una Esfera en la escena

export function createSphereGeneric() {
  const SpGeometry = new THREE.SphereGeometry();
  const material = new THREE.MeshBasicMaterial({
    color: 0xB8860B,
    wireframe: false,
  });
  const Sphere = new THREE.Mesh(SpGeometry, material);

  scene.add(Sphere);
  objectsSphere.push(Sphere);
  Sphere.position.y = 0.5;
  Sphere.castShadow = true;
  Sphere.receiveShadow = true;

  Sphere.GUISphere = _SphereObject();
  _createSphereGUI(Sphere.GUISphere);

  countSphere = countSphere + 1;
}

function _SphereObject() {
  var GUISphere = {
    material: 'Basic',
    materialColor: 0xA9A9A9,
    wireframe: false,
    transparent: false,
    opacity: 1,
    radius: 1,
    posX: 0,
    posY: 1,
    posZ: 0,
    RotX: 0,
    RotY: 0,
    RotZ: 0,
  };

  return GUISphere;
}

function _createSphereGUI(GUISphere) {
  const folder = gui.addFolder('Sphere ' + GUIFolderSphere);
  // Material
  folder.addColor(GUISphere, 'materialColor');
  folder.add(GUISphere, 'material', ['Basic', 'Phong', 'Lambert']);
  folder.add(GUISphere, 'wireframe');
  folder.add(GUISphere, 'transparent');
  folder.add(GUISphere, 'opacity', 0, 1);

  // Escala
  folder.add(GUISphere, 'radius', 1, Math.PI * 2);

  // Posicion
  folder.add(GUISphere, 'posX', -6, Math.PI * 2);
  folder.add(GUISphere, 'posY', 0.5, Math.PI * 2);
  folder.add(GUISphere, 'posZ', -6, Math.PI * 2);

  // Rotacion
  folder.add(GUISphere, 'RotX', -6, Math.PI * 2);
  folder.add(GUISphere, 'RotY', -6, Math.PI * 2);
  folder.add(GUISphere, 'RotZ', -6, Math.PI * 2);

  GUIFolderSphere = GUIFolderSphere + 1;
}

function _updateSpheres() {
  Object.keys(objectsSphere).forEach((i) => {
    const SphereSelected = objectsSphere[i];
    //material cubo
    SphereSelected.GUISphere.material == 'Basic'
      ? (SphereSelected.material = new THREE.MeshBasicMaterial({
          color: SphereSelected.GUISphere.materialColor,
          wireframe: SphereSelected.GUISphere.wireframe,
          transparent: SphereSelected.GUISphere.transparent,
          opacity: SphereSelected.GUISphere.opacity,
        }))
      : SphereSelected.GUISphere.material == 'Lambert'
      ? (SphereSelected.material = new THREE.MeshLambertMaterial({
          color: SphereSelected.GUISphere.materialColor,
          wireframe: SphereSelected.GUISphere.wireframe,
          transparent: SphereSelected.GUISphere.transparent,
          opacity: SphereSelected.GUISphere.opacity,
        }))
      : (SphereSelected.material = new THREE.MeshPhongMaterial({
          color: SphereSelected.GUISphere.materialColor,
          wireframe: SphereSelected.GUISphere.wireframe,
          transparent: SphereSelected.GUISphere.transparent,
          opacity: SphereSelected.GUISphere.opacity,
        }));

    //Escalar cubo
    SphereSelected.geometry = new THREE.SphereGeometry(
      SphereSelected.GUISphere.radius,
    );

    //Posición
    SphereSelected.position.x = SphereSelected.GUISphere.posX;
    SphereSelected.position.y = SphereSelected.GUISphere.posY;
    SphereSelected.position.z = SphereSelected.GUISphere.posZ;
    
    //Rotacion
    SphereSelected.rotation.x = SphereSelected.GUISphere.RotX;
    SphereSelected.rotation.y = SphereSelected.GUISphere.RotY;
    SphereSelected.rotation.z = SphereSelected.GUISphere.RotZ;

  });
}


// Codigo Creacion de Luz Ambiental


export function createAmLightGeneric() {
  const AmLight = new THREE.AmbientLight(0xA71F8B); 
  scene.add( AmLight );

  objectsAmLight.push(AmLight)

AmLight.GUIAmLight = _AmLightObject();
_createAmLightGUI(AmLight.GUIAmLight);

countAmLight = countAmLight + 1;
}


function _AmLightObject() {
var GUIAmLight = {
  color: 0xFFFAF0,
  intensity: 1,
  };

return GUIAmLight;
}

function _createAmLightGUI(GUIAmLight) {
const folder = gui.addFolder('AmbientLight ' + GUIFolderAmLight);
// Props
folder.addColor(GUIAmLight, 'color');
folder.add(GUIAmLight, 'intensity', 0, 1);

GUIFolderAmLight = GUIFolderAmLight + 1;
}


function _updateAmLights()    {
Object.keys(objectsAmLight).forEach((i) => {
  const AmLightSelected = objectsAmLight[i];

  AmLightSelected.color.setHex(AmLightSelected.GUIAmLight.color);
  AmLightSelected.intensity = AmLightSelected.GUIAmLight.intensity;
  
});
}


// Codigo Creacion de Luz Direccional

  export function createDiLightGeneric() {
  const DiLight = new THREE.DirectionalLight(0xA71F8B); 
  DiLight.position.set( 0, 1, 0 );
  DiLight.castShadow = true;

  objectsDiLight.push(DiLight)

scene.add( DiLight );
DiLight.GUIDiLight = _DiLightObject();
_createDiLightGUI(DiLight.GUIDiLight);

countDiLight = countDiLight + 1;
  }

  function _DiLightObject() {
  var GUIDiLight = {
    color: 0xFFFAF0,
    intensity: 1,
    castShadow: true,
    posX: 0,
    posY: 1,
    posZ: 0,
    };
  
  return GUIDiLight;
  }

  function _createDiLightGUI(GUIDiLight) {
    const folder = gui.addFolder('DirectionalLight ' + GUIFolderDiLight);
    // Props
    folder.addColor(GUIDiLight, 'color');
    folder.add(GUIDiLight, 'intensity', 0, 1);
    // Posicion
    folder.add(GUIDiLight, 'posX', -6, Math.PI * 2);
    folder.add(GUIDiLight, 'posY', 0, Math.PI * 2);
    folder.add(GUIDiLight, 'posZ', -6, Math.PI * 2);
    
    GUIFolderDiLight = GUIFolderDiLight + 1;
    }

  function _updateDiLights()    {
      Object.keys(objectsDiLight).forEach((i) => {
        const DiLightSelected = objectsDiLight[i];
      
        DiLightSelected.color.setHex(DiLightSelected.GUIDiLight.color);
        DiLightSelected.intensity = DiLightSelected.GUIDiLight.intensity;
        

            //Posición
        DiLightSelected.position.x = DiLightSelected.GUIDiLight.posX;
        DiLightSelected.position.y = DiLightSelected.GUIDiLight.posY;
        DiLightSelected.position.z = DiLightSelected.GUIDiLight.posZ;
      });
      }


// Codigo Creacion de Spotlight

 export function createSpoLightGeneric() {
  const SpoLight = new THREE.SpotLight(0xA71F8B, 1); 
  SpoLight.position.set(0, 10, 0);
  SpoLight.angle = Math.PI / 4;
  SpoLight.penumbra = 0.1;
  SpoLight.decay = 2;
  SpoLight.distance = 200;
  SpoLight.castShadow = true;


  objectsSpoLight.push(SpoLight)
  scene.add(SpoLight);


SpoLight.GUISpoLight = _SpoLightObject();
_createSpoLightGUI(SpoLight.GUISpoLight);

countSpoLight = countSpoLight + 1;
 }

  function  _SpoLightObject() {
  var GUISpoLight = {
    color: 0xFFFAF0,
    intensity: 1,
    castShadow: true,
    posX: 0,
    posY: 10,
    posZ: 0,
    angle: Math.PI / 4,
    penumbra: 0.1,
    decay: 2,
    distance: 200,
    };
  
  return GUISpoLight;
  }

  function _createSpoLightGUI(GUISpoLight) {
    const folder = gui.addFolder('SpotLight ' + GUIFolderSpoLight);
    // Props
    folder.addColor(GUISpoLight, 'color');
    folder.add(GUISpoLight, 'intensity', 0, 1);
    folder.add(GUISpoLight, 'penumbra', 0, 1);
    folder.add(GUISpoLight, 'decay', 1, 2);
    // Posicion
    folder.add(GUISpoLight, 'posX', -6, Math.PI * 2);
    folder.add(GUISpoLight, 'posY', 0, Math.PI * 2);
    folder.add(GUISpoLight, 'posZ', -6, Math.PI * 2);
    folder.add(GUISpoLight, 'angle', Math.PI / 4, Math.PI / 2);
    
    GUIFolderSpoLight = GUIFolderSpoLight + 1;
    }


    function _updateSpoLights()    {
      Object.keys(objectsSpoLight).forEach((i) => {
        const SpoLightSelected = objectsSpoLight[i];
      
        SpoLightSelected.color.setHex(SpoLightSelected.GUISpoLight.color);
        SpoLightSelected.intensity = SpoLightSelected.GUISpoLight.intensity;
        SpoLightSelected.penumbra = SpoLightSelected.GUISpoLight.penumbra;
        SpoLightSelected.decay = SpoLightSelected.GUISpoLight.decay;
        

            //Posición
        SpoLightSelected.position.x = SpoLightSelected.GUISpoLight.posX;
        SpoLightSelected.position.y = SpoLightSelected.GUISpoLight.posY;
        SpoLightSelected.position.z = SpoLightSelected.GUISpoLight.posZ;
        SpoLightSelected.angle = SpoLightSelected.GUISpoLight.angle;
      });
      }

// Creacion de Point Light

export function createPoLightGeneric() {
  const PoLight = new THREE.PointLight(0xA71F8B, 1, 100 ); 
  PoLight.position.set( 3, 3, 3 );
  scene.add( PoLight );
  objectsPoLight.push(PoLight)
  
  

PoLight.GUIPoLight = _PoLightObject();
_createPoLightGUI(PoLight.GUIPoLight);

countPoLight = countPoLight + 1;
}


function _PoLightObject() {
var GUIPoLight = {
 color: 0xFFFAF0,
 intensity: 1,
 posX: 3,
 posY: 3,
 posZ: 3,
 decay: 1,
 distance: 0,
  };

return GUIPoLight;
}

function _createPoLightGUI(GUIPoLight) {
const folder = gui.addFolder('PointLight ' + GUIFolderPoLight);
// Material
folder.addColor(GUIPoLight, 'color');
folder.add(GUIPoLight, 'intensity', 0, 1);
folder.add(GUIPoLight, 'posX', -6, Math.PI * 2);
folder.add(GUIPoLight, 'posY', -5, Math.PI * 2);
folder.add(GUIPoLight, 'posZ', -6, Math.PI * 2);
folder.add(GUIPoLight, 'decay', 0, 2);
folder.add(GUIPoLight, 'distance', 0, 1);

GUIFolderPoLight = GUIFolderPoLight + 1;
}


function _updatePoLights()    {
Object.keys(objectsPoLight).forEach((i) => {
 const PoLightSelected = objectsPoLight[i];

  PoLightSelected.color.setHex(PoLightSelected.GUIPoLight.color);
  PoLightSelected.intensity = PoLightSelected.GUIPoLight.intensity;
  PoLightSelected.position.x = PoLightSelected.GUIPoLight.posX;
  PoLightSelected.position.y = PoLightSelected.GUIPoLight.posY;
  PoLightSelected.position.z = PoLightSelected.GUIPoLight.posZ;
  PoLightSelected.decay = PoLightSelected.GUIPoLight.decay;
  PoLightSelected.distance = PoLightSelected.GUIPoLight.distance;
 
});
}