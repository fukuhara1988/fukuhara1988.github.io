import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import vertexShader from "./shaders/vertex.glsl";
import planeVertexShader from "./shaders/planevertex.glsl";
import texVertex from "./shaders/texVertex.glsl";
import planeFragmentShader from "./shaders/planefragment.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import texFragment from "./shaders/texFragment.glsl";
import GUI from "lil-gui";
import { clamp } from 'three/src/math/MathUtils';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 3000 );

camera.position.z = 1000;
// camera.position.x = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor(0x0687f9);//
renderer.setClearColor(0x000000);//

// エラーコードを全て表示する為の記述
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
renderer.debug.onShaderError = (gl, program, vertexShader, fragmentShader) => {
	  const vertexShaderSource = gl.getShaderSource(vertexShader);
	  const fragmentShaderSource = gl.getShaderSource(fragmentShader);
	
	  console.groupCollapsed("vertexShader");
	  console.log(vertexShaderSource);
	  console.groupEnd();
	
	  console.groupCollapsed("fragmentShader");
	  console.log(fragmentShaderSource);
	  console.groupEnd();
	};
	//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
	const gl = document.querySelector("#gl-container");
	
	
	// 光源の設定
	// const ambientLight = new THREE.AmbientLight(0xffffff);
	// ambientLight.position.set(5, 0, 5);
	// scene.add(ambientLight);
	
	// const pointLight = new THREE.PointLight(0xffffff, 10);
	// pointLight.position.set(5, 0, 5);
	// const pointLightPosition = new THREE.Vector3(0, 0, 5);
	// pointLight.position.set(pointLightPosition);
	// scene.add(pointLight);

// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(0, 1, 10);
// spotLight.angle = Math.PI / 6;
// spotLight.intensity = 100;
// scene.add(spotLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// directionalLight.position.set(5, 5, 10);
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.PointLightHelper(directionalLight,1);
// scene.add(directionalLightHelper);


// const pointLightHelper = new THREE.PointLightHelper(pointLight,1);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
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
	// lights: true,
	uniforms:{
		colorR:{value:1.0},
		colorG:{value:1.0},
		colorB:{value:1.0},
		alpha:{value:1.0},
		progressText:{value:0.0},
		uTick:{value:0 },
		uScale:{value:1},
		lightColor: {value: new THREE.Color(0xffffff)},
		// lightColor: {value: new THREE.Color(1.0, 1.0, 1.0)},
    lightPosition: {value: new THREE.Vector3(5, 0, 5)},
    // lightPosition: {value: pointLight.position},
		ambientLight: { value:new THREE.Vector4(0.1, 0.1, 0.1, 1.0)},
		viewPosition:{ value:camera.position}
	}
});
// material.side = THREE.DoubleSide; // または THREE.FrontSide や THREE.BackSide


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

				//頂点の数
		const vertexValue = textGeometry.attributes.position.array.length / textGeometry.attributes.position.itemSize;

		const vertexArry = [];
		for(let i = 0;i < vertexValue; i++){
				const vertexrandom = random(0,200);
				vertexArry.push(vertexrandom);
		}
		
		// console.log(vertexValue);
		textGeometry.setAttribute("vertexrandam", new THREE.Float32BufferAttribute(vertexArry, 1));

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
		// skill.position.x = -1.0;
		skill.position.y = -0.5;
		skill.position.z = -0.5;
		scene.background = blur;
		scene.add( skill);

		console.log(geometry);
} );


//＜プレーンジオメトリーの作成＞

async function loadTex(url) {
	const texLoader = new THREE.TextureLoader();
	const texture = await texLoader.loadAsync(url);
	return texture;
}

function random(a, b) {
	return a + (b - a) * Math.random();
}

function setupPlaneGeometry(){
	
	const width = 600,
		height = 300,
		wSeg = width / 2,
		hSeg = height / 2;
			const planeGeome = new THREE.PlaneGeometry(width, height,wSeg , hSeg);

			// function random(a, b) {
			// 		return a + (b - a) * Math.random();
			// }

		// 	//頂点の数
		// const vertexValue = planeGeome.attributes.position.array.length / planeGeome.attributes.position.itemSize;
		
		// const vertexArry = [];
		// for(let i = 0;i < vertexValue; i++){
		// 		const vertexrandom = random(0,200);
		// 		vertexArry.push(vertexrandom);
		// }
		
		// // console.log(vertexValue);
		// planeGeome.setAttribute("vertexrandam", new THREE.Float32BufferAttribute(vertexArry, 1));

		return planeGeome;
}

const planeGeome = setupPlaneGeometry();

	//頂点の数
const vertexValue = planeGeome.attributes.position.array.length / planeGeome.attributes.position.itemSize;

const vertexArry = [];
for(let i = 0;i < vertexValue; i++){
		const vertexrandom = random(0,200);
		vertexArry.push(vertexrandom);
}

// console.log(vertexValue);
planeGeome.setAttribute("vertexrandam", new THREE.Float32BufferAttribute(vertexArry, 1));

const planeMate = new THREE.ShaderMaterial({
	vertexShader:planeVertexShader,
	fragmentShader:planeFragmentShader,
	// wireframe:true,
	// shadowSide:THREE.BackSide,
	transparent:true,
	side: THREE.DoubleSide,
	uniforms:{
		colorR:{value:1.0},
		colorG:{value:1.0},
		colorB:{value:1.0},
		alpha:{value:1.0},
		progressPlane:{value:0.0},
		uTexture1:{value:await loadTex("/image/marek-piwnicki-Wmt2ZUrUdEY-unsplash-min (カスタム).jpg")},
		uTexture2:{value:await loadTex("/image/ander-pena-REAMd8gKbPc-unsplash (1).jpg")},
		// uTick:{value:0 }
	}
});

const planeMesh = new THREE.Mesh(planeGeome, planeMate);
// const planeMesh = new THREE.Points(planeGeome, planeMate);
planeMesh.position.z = -1000;
scene.add(planeMesh);

// const sphereGeome = new THREE.BoxGeometry(1 , 1);
// const sphereMate = material;

// const bufferGeome = new THREE.BufferGeometry();
// const pointTextBuffer = new THREE.BufferGeometry();
// const pointParticleBuffer = new THREE.BufferGeometry();
// bufferGeome.setAttribute("position", planeGeome.getAttribute("position"));
// bufferGeome.setAttribute("plane", planeGeome.getAttribute("position"));
// bufferGeome.setAttribute("sphere", sphereGeome.getAttribute("position"));
// console.log(bufferGeome);

// const sphereMesh = new THREE.Mesh(sphereGeome,sphereMate);
// sphereMesh.rotateY(10);
// sphereMesh.position.z = 5;
// scene.add(sphereMesh);

// const pointMesh = new THREE.Points()

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
// function random(min, max , isInt = false){//min；生成する最小値、max；生成する最大値、isInt：整数にするかどうか(デフォルトは少数)
// 	let value = Math.random() * (max - min) + min;
// 	value = isInt ? Math.round(value) : value;
// 	return value;
// }
//乱数を返す関数
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
function random1(a, b){
	return a + (b - a) * Math.random();
};
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// console.log(random(1, 100));
const particleMeshArry = [];
const particleGometory = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const particlevalue = 1000;
for(let i = 0; i < particlevalue; i++){
	// console.log(rdmcolor());
	
	const color = new THREE.Color(
		random1(0.1, 1),
		random1(0.1, 1),
		random1(0.1, 1)
		);

		const posRange = 10;
		const pos = {
			x: random1(-posRange, posRange),
			y: random1(-posRange, posRange),
			z: random1(-posRange, posRange),
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
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const gui = new GUI();
gui.add(material.uniforms.colorR, "value", 0, 1, 0.01).name("colorR");
gui.add(material.uniforms.colorG, "value", 0, 1, 0.01).name("colorG");
gui.add(material.uniforms.colorB, "value", 0, 1, 0.01).name("colorB");
gui.add(material.uniforms.alpha, "value", 0, 1, 0.01).name("alpha");
gui.add(material.uniforms.progressText, "value", 0, 1, 0.01).name("progressText");
gui.add(planeMate.uniforms.progressPlane, "value", 0, 1, 0.01).name("progressPlane");

//ーーーーーーーーーーーーーーーーーーーー
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
	// for(let i = 0; i < particlevalue; i = i + 2){
	// 	particleMeshArry[i].scale.set(Math.cos(time) * 0.5 + 0.5, Math.cos(time) * 0.5 + 0.5, Math.cos(time) * 0.5 + 0.5);
	// }
	// for(let i = 1; i < particlevalue; i = i + 2){
	// 	particleMeshArry[i].scale.set(Math.sin(time) * 0.5 + 0.5, Math.sin(time) * 0.5 + 0.5, Math.sin(time) * 0.5 + 0.5);
	// }

	// let pr = material.uniforms.progressText.value;
	// geometry[0].scale.x = material.uniforms.progressText.value;
	// geometry[0].scale.y = material.uniforms.progressText.value;
	// geometry[0].scale.z = material.uniforms.progressText.value;
	// geometry[0].scale.y = pr;
	// geometry[0].scale.z = pr;
}
animate();
// raycast;
window.addEventListener( 'click', onPointerMove );


