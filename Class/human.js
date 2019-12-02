
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

var humanGeo = new THREE.Object3D();
var humanFaceOb = new THREE.Object3D();
var humanBodyOb = new THREE.Object3D();
var humanArmOb1 = new THREE.Object3D();
var humanArmOb2 = new THREE.Object3D();
var humanFootOb1 = new THREE.Object3D();
var humanFootOb2 = new THREE.Object3D();

var humanGeoMult = humanGeo.modelViewMatrix;
var humanFaceMult = humanFaceOb.modelViewMatrix;
var humanBodyMult = humanBodyOb.modelViewMatrix;

var modelViewMatrix, projectionMatrix;

var duration = 0;


window.onload = function init() {

    //For bouncing balls;
    var step = 0;
    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    //Show Axis
    var axes = new THREE.AxisHelper(10);
    scene.add(axes);

    //Let's make a plane
    var planeGeometry = new THREE.PlaneGeometry(60, 30, 1, 1);
    var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xCCCCCC });
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);

	humanFace();

	humanHead(6, 1, 6, 0, 21, 0);
	humanHead(1.7, 1.5, 6, 0, 20, 0);
	humanHead(1.7, 1.5, 6, 2, 20, 0);
	humanHead(1.7, 1.5, 6, -2, 20, 0);
	humanHead(6, 5, 4, 0, 18, -1);
	humanHead(5, 0.8, 5, 0, 21.8, 0);

	humanHead(1, 1, 1, -2, 22, 0);
	humanHead(1, 1.5, 1, 3, 21, -1);
	humanHead(1, 1, 1, -3, 20, 1);
	humanHead(1, 1.3, 1, -3, 19, -1);
	humanHead(1, 1.3, 1, 3, 18, -2);
	humanHead(1, 1, 1, 2, 19, -3);
	humanHead(1, 1, 1, -1, 17, -3);

	humanEye1(1.2);
    humanEye1(-1.2);
	humanGlass(1.2);
	humanGlass(-1.2);
	humanMouse();
    humanEar(2.45);
    humanEar(-2.45);
    humanNose();

	humanBody();
	humanT();
	humanVest(3.5, 6, 5.2, 2, 10, 0);
	humanVest(3.5, 6, 5.2, -2, 10, 0);
	humanVest(2.8, 2.3, 5.2, 2.2, 14, 0);
	humanVest(2.8, 2.3, 5.2, -2.2, 14, 0);
    humanVest(6, 8.3, 1, 0, 11, -2.1);

	humanFoot(4, 10.5, 0, 0x2E2E2E, humanArmOb1);
    humanFoot(-4, 10.5, 0, 0x2E2E2E, humanArmOb2);
	humanFoot(2, 3, 0, 0x0B2161, humanFootOb1);
    humanFoot(-2, 3, 0, 0x0B2161, humanFootOb2);

	humanBodyOb.add(humanGeo);
	humanBodyOb.add(humanFaceOb);
	humanBodyOb.add(humanArmOb1);
	humanBodyOb.add(humanArmOb2);
	humanBodyOb.add(humanFootOb1);
	humanBodyOb.add(humanFootOb2);
    
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(-40, 30, 60);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 5120;
    spotLight.shadow.mapSize.height = 5120;
    scene.add(spotLight);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    document.getElementById("threejs_scene").appendChild(renderer.domElement);

	humanBodyOb.position.x = 0;
	humanBodyOb.position.y = 0;
	humanBodyOb.position.z = 0;

	var angle = 0;
    var renderScene = new function renderScene() {
        requestAnimationFrame(renderScene);

		humanBodyOb.rotation.y += 0.01
		humanFaceOb.translateY(15);
	humanFaceOb.rotation.x += 0.01;
	humanFaceOb.translateY(-15);
        //cube animation
		
		
/*		if (duration%3 >= 0 && duration%3 < 1) {

			angle = +0.05;
		}
		if (duration%4 >= 0 && duration%4 < 1) {

			angle = -0.05;
		}*/
		humanWalk();
		scene.add(humanBodyOb);

        renderer.render(scene, camera);
    }
}

function humanWalk() {
	duration+=0.1
	if (duration <2)
	{
		angle = 0.02;
	}
	if (duration%2 >= 0 && duration%2 < 1)
	{
		angle = 0.05;
	}
	if (duration%4 >= 0 && duration%4 < 1) {
		angle = -0.05;
	}
	
	humanArmOb1.translateY(14);
	humanArmOb2.translateY(14);
	humanFootOb1.translateY(7);
	humanFootOb2.translateY(7);

	humanArmOb1.rotation.x += angle;
	humanArmOb2.rotation.x -= angle;
	humanFootOb1.rotation.x -= angle;
	humanFootOb2.rotation.x += angle;

	humanArmOb1.translateY(-14);
	humanArmOb2.translateY(-14);
	humanFootOb1.translateY(-7);
	humanFootOb2.translateY(-7);
}
function rotateArm(object, axis, radians) {
	var m = new THREE.Matrix4();
	m.makeRotationAxis(axis.normalize(), radians);
	object.modelViewMatrix.multiply(m);
	object.rotation.setFromRotationMatrix(object.modelViewMatrix);
	console.log(humanGeo);
	//humanGeoMult = mult(humanGeo.translateOnAxis(0, 5, 0, 1), humanGeo.rotateOnAxis(1, 0, 0, 1));
	//m = mult(m, humanGeo.translateOnAxis(0, 5, 0, -1));
	//humanGeoMult = mult(m, humanGeoMult);
	

	//humanGeoMult = humanGeo.modelViewMatrix;
	//humanGeo.updateMatrix(mult(humanGeo.translateOnAxis(0, 5, 0, 1), humanGeo.rotateOnAxis(1, 0, 0, 1)));
	//humanGeo.updateMatrix(humanGeoMult, humanGeo.translateOnAxis(0, -5, 0, 1))
}
function humanHead(x1, y1, z1, x2, y2, z2) {
	var cubeGeometry = new THREE.BoxGeometry(x1, y1, z1);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x1D1616 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = x2;
    cube.position.y = y2;
    cube.position.z = z2;
    humanFaceOb.add(cube);
}

function humanFace() {
    var cubeGeometry = new THREE.BoxGeometry(5.5, 5, 5.5);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0xF6E3CE });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 18;
    cube.position.z = 0;
    humanFaceOb.add(cube);
}
function humanMouse() {
    var cubeGeometry = new THREE.BoxGeometry(2, 0.2, 1);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x1D1616 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 16.5;
    cube.position.z = 2.5;
    humanFaceOb.add(cube);
}
function humanEar(p) {
    var cubeGeometry = new THREE.BoxGeometry(1.2, 1, 1);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0xF6E3CE });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = p;
    cube.position.y = 18;
    cube.position.z = 0.6;
    humanFaceOb.add(cube);
}
function humanBody() {
    var cubeGeometry = new THREE.BoxGeometry(7, 8, 5);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0xF6E3CE });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 11;
    cube.position.z = 0;
    humanBodyOb.add(cube);
}
function humanFoot(x, y, z, c, obj) {
    var cubeGeometry = new THREE.BoxGeometry(2.3, 8, 2.5);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: c });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;
	console.log(obj);
    obj.add(cube);
}
function humanEye1(x) {
    var cubeGeometry = new THREE.BoxGeometry(1, 0.2, 1);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x190707 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = x;
    cube.position.y = 18.5;
    cube.position.z = 2.5;
    humanFaceOb.add(cube);
}
function humanGlass(x) {
    var TorusGeometry = new THREE.TorusGeometry(1, 0.1, 2, 20);
    var TorusMeterial = new THREE.MeshPhongMaterial({ color: 0x1D1616 });
    var Torus = new THREE.Mesh(TorusGeometry, TorusMeterial);
    Torus.castShadow = true;
    Torus.position.x = x;
    Torus.position.y = 18.5;
    Torus.position.z = 3.2;
    humanFaceOb.add(Torus);
}
function humanNose() {
    var cubeGeometry = new THREE.BoxGeometry(0.2, 0.2, 1);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 17.5;
    cube.position.z = 2.5;
    humanFaceOb.add(cube);
}
function humanVest(x1, y1, z1, x2, y2, z2) {
	var cubeGeometry = new THREE.BoxGeometry(x1, y1, z1);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x0B0B3B });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = x2;
    cube.position.y = y2;
    cube.position.z = z2;
    humanBodyOb.add(cube);
}
function humanT() {
	var cubeGeometry = new THREE.BoxGeometry(7, 7.5, 5.05);
    var cubeMeterial = new THREE.MeshPhongMaterial({ color: 0x2E2E2E });
    var cube = new THREE.Mesh(cubeGeometry, cubeMeterial);
    cube.castShadow = true;
    cube.position.x = 0;
    cube.position.y = 10.5;
    cube.position.z = 0;
    humanBodyOb.add(cube);
}
// renderScene();
