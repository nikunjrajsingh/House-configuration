import * as THREE from '/build/three.module.js';
import { GLTFLoader} from './jsm/loaders/GLTFLoader.js';
import {OrbitControls} from './jsm/controls/OrbitControls.js';
console.log(OrbitControls);
// console.log(GLTFLoader);
// console.log(THREE);

let scene; 
let camera;
let renderer;
let house;
let model_container = document.querySelector('.web-gl');


const init = () => {
     scene = new THREE.Scene();
    //  console.log(scene);

     const fov = 40;
     const aspect = window.innerWidth / window.innerHeight;
     const near = 0.1;
     const far = 1000;

      camera = new THREE.PerspectiveCamera(fov, aspect, near, far); 
    //   console.log(camera);
    camera.position.set(0, 0, 25);
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
       canvas: model_container
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    const controls = new OrbitControls(camera, renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

     const loader = new GLTFLoader();
     loader.load('./model/scene.gltf', (gltf)=>{
       house = gltf.scene.children[0];
       house.scale.set(0.4, 0.4, 0.4);
       house.position.set(0, -1.3, 0);
      //  house.rotation.x = Math.PI / -3;
       scene.add(gltf.scene); 
     });

     animate();

    

}

const render =()=>{
    renderer.render(scene, camera);
}

const animate = ()=>{
    requestAnimationFrame(animate);
    render()
}

const windowResize = ()=>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

window.addEventListener('resize', windowResize, false);

window.onload = init;