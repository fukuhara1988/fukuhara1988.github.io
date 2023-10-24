import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import GUI from "lil-gui";
import { clamp } from 'three/src/math/MathUtils';
// import glslify from "rollup-plugin-glslify";


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor(0x0687f9);//
renderer.setClearColor(0x000000);//
// renderer.setSize( 500, 500 );

const gl = document.querySelector("#gl-container");


// 光源の設定
const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.set(0, 1, 4);
// scene.add(pointLight);

const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(0, 1, 10);
spotLight.angle = Math.PI / 6;
spotLight.intensity = 100;
scene.add(spotLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(0, 2, 10);
// scene.add(directionalLight);

const directionalLightHelper = new THREE.PointLightHelper(directionalLight,1);
// scene.add(directionalLightHelper);


const pointLightHelper = new THREE.PointLightHelper(pointLight,1);
const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
// scene.add(pointLightHelper);

gl.appendChild(renderer.domElement);


//<テキストジオメトリーの表示>
const loader = new FontLoader();

const material = new THREE.ShaderMaterial({
	vertexShader:vertexShader,
	fragmentShader:fragmentShader,
	// wireframe:true,
	// shadowSide:THREE.BackSide,
	uniforms:{
		colorR:{value:1.0},
		colorG:{value:1.0},
		colorB:{value:1.0},
		alpha:{value:1.0},
		progress:{value:0.0},
		uTick:{value:0 }
	}
});

// const material = new THREE.MeshStandardMaterial({
// 	color:0xffffff,
// 	roughness:1,
// 	metalness:0.2
// })

const geometry = [];

loader.load( './fonts/helvetiker_regular.typeface.json', function ( font ) {

	function setupGeometry(text){
		const textGeometry = new TextGeometry( text, {
			font: font,
			size: 1,
			height: 1,
			curveSegments: 20,
			bevelEnabled: true,
			bevelThickness: 0.01,
			bevelSize: 0.01,
			bevelOffset: 0,
			bevelSegments: 50
		} );

		return textGeometry;
	}
	
	const helloGeometry = setupGeometry("hello");
	helloGeometry.center();
	const hello = new THREE.Mesh( helloGeometry, material );
	geometry.push(hello);
	hello.name = "hello";
	hello.position.x = -2.0;
	scene.add( hello );

	// <スキルジオメトリーの表示>
	const skillGeometry = setupGeometry("skill");

		const skill = new THREE.Mesh( skillGeometry, material);
		geometry.push(skill);
		skill.name = "skill";
		skill.position.x = 0.5;
		skill.position.y = -0.5;
		scene.background = blur;
		scene.add( skill);

} );

//<各オブジェクトをクリックするとリンクに飛ぶ>

//<Raycastingの実装>
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycast();
}

function raycast() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects( scene.children );
	// console.log(intersects);

	
	for ( let i = 0; i < intersects.length; i ++ ) {
		
		// intersects[ i ].object.material.color.set( 0xff0000 );
		// console.log(intersects[0].object.name);
		if(intersects[i].object.name === "text"){
			// console.log("text");
			console.log(intersects[i].object);
			window.open("https://www.google.com");
		}
		if(intersects[i].object.name === "skill"){
			// console.log("skill")
			console.log(intersects[i].object);
			window.open("https://www.yahoo.co.jp/");
		}
		// if(intersects[i].object.name !== "text"|"skill"){
		// 	console.log("null");
		// }
	}

}

//<パーティクルの作成>

//ランダムな値を生成する関数
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function random(min, max , isInt = false){//min；生成する最小値、max；生成する最大値、isInt：整数にするかどうか(デフォルトは少数)
	let value = Math.random() * (max - min) + min;
	value = isInt ? Math.round(value) : value;
	return value;
}
//乱数を返す関数
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function random1(a, b){
	return Math.round(a + (b - a) * Math.random());
};
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
console.log(random(1, 100));
const particleMeshArry = [];
const particleGometory = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const particlevalue = 300;
for(let i = 0; i < particlevalue; i++){
	// console.log(rdmcolor());
	
	const color = new THREE.Color(
		random(0.1, 1),
		random(0.1, 1),
		random(0.1, 1)
		);

		const posRange = 5;
		const pos = {
			x: random(-posRange, posRange),
			y: random(-posRange, posRange),
			z: random(-posRange, posRange),
		}
		// console.log(color);
		const particleMaterial = new THREE.MeshBasicMaterial({color});
		const particleMesh = new THREE.Mesh(particleGometory, particleMaterial);

		particleMesh.position.set(pos.x, pos.y, pos.z);
		particleMesh.rotateZ(Math.PI / 4);
	
	particleMeshArry.push(particleMesh);
	scene.add(particleMesh);
}

//<オービットコントロールズの実装>
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.z = 5;

//＜lil-gui＞の実装
const gui = new GUI();
gui.add(material.uniforms.colorR, "value", 0, 1, 0.01).name("colorR");
gui.add(material.uniforms.colorG, "value", 0, 1, 0.01).name("colorG");
gui.add(material.uniforms.colorB, "value", 0, 1, 0.01).name("colorB");
gui.add(material.uniforms.alpha, "value", 0, 1, 0.01).name("alpha");
gui.add(material.uniforms.progress, "value", 0, 1, 0.01).name("progress");
// console.log(geometry);

let time = 0;
let tick = 0;

//画面への描画
function animate() {
	requestAnimationFrame( animate );

	
	// raycast();
	renderer.render( scene, camera );
	// camera.position.z -= 0.001;
	// skill.position.z += 0.01;
	time += 0.02;
	tick++;
	material.uniforms.uTick.value = tick;
	for(let i = 0; i < particlevalue; i = i + 2){
		particleMeshArry[i].scale.set(Math.cos(time) * 0.5 + 0.5, Math.cos(time) * 0.5 + 0.5, Math.cos(time) * 0.5 + 0.5);
	}
	for(let i = 1; i < particlevalue; i = i + 2){
		particleMeshArry[i].scale.set(Math.sin(time) * 0.5 + 0.5, Math.sin(time) * 0.5 + 0.5, Math.sin(time) * 0.5 + 0.5);
	}
}
animate();
// raycast;
window.addEventListener( 'click', onPointerMove );


