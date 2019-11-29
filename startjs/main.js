var UNITWIDTH = 90; // Width of a cubes in the maze
var UNITHEIGHT = 150; // Height of the cubes in the maze
var PLAYERSPEED = 800.0; // How fast the player moves
var widthOffset = UNITHEIGHT / 2;

var clock;
var camera, controls, scene, renderer;
var mapSize;

var totalCubesWide;
var collidableObjects = [];

var PLAYERCOLLISIONDISTANCE = 20;

// Flag to determine if the player can move and look around
var controlsEnabled = false;

// Flags to determine which direction the player is moving
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

// Velocity vector for the player
var playerVelocity = new THREE.Vector3();

var cube, ear2, ear3, ear4, ear, cube2, cube3, 
cube4, cube5, cube6, cube7, cube8, body, leg, leg2, leg3, leg4, tail;

var gl;
var points;


var cubeGeometry9 = new THREE.BoxGeometry(5,4,5);
var cubeMeterial9 = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
cube = new THREE.Mesh(cubeGeometry9, cubeMeterial9);
cube.castShadow = true;
cube.position.x = 0;
cube.position.y = 10;
cube.position.z = 10;

var cubeGeometry = new THREE.BoxGeometry(2,4,2);
var cubeMeterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
ear = new THREE.Mesh(cubeGeometry, cubeMeterial);
ear.castShadow = true;
ear.position.x = -1.5;
ear.position.y = 14;
ear.position.z = 8.5;

ear2 = new THREE.Mesh(cubeGeometry, cubeMeterial);
ear2.castShadow = true;
ear2.position.x = 1.5;
ear2.position.y = 14;
ear2.position.z = 8.5;

var cubeGeometry = new THREE.BoxGeometry(1,3,1);
var cubeMeterial = new THREE.MeshPhongMaterial({color: 0xFAD8DD});
ear3 = new THREE.Mesh(cubeGeometry, cubeMeterial);
ear3.castShadow = true;
ear3.position.x = -1.5;
ear3.position.y = 14;
ear3.position.z = 9.1;

var ear4 = new THREE.Mesh(cubeGeometry, cubeMeterial);
ear4.castShadow = true;
ear4.position.x = 1.5;
ear4.position.y = 14;
ear4.position.z = 9.1;

/// make nose
var cubeGeometry2 = new THREE.BoxGeometry(0.8,0.8,1);
var cubeMeterial2 = new THREE.MeshPhongMaterial({color: 0xECC9E2});
cube2 = new THREE.Mesh(cubeGeometry2, cubeMeterial2);
cube2.castShadow = true;
cube2.position.x = 0;
cube2.position.y = 9.8;
cube2.position.z = 12.5;

/// make eyes
var cubeGeometry3 = new THREE.BoxGeometry(0.8,1.5,1);
var cubeMeterial3 = new THREE.MeshPhongMaterial({color: 0xFC725A});
cube3 = new THREE.Mesh(cubeGeometry3, cubeMeterial3);
cube3.castShadow = true;
cube3.position.x = 1;
cube3.position.y = 10.8;
cube3.position.z = 12.1;

cube4 = new THREE.Mesh(cubeGeometry3, cubeMeterial3);
cube4.castShadow = true;
cube4.position.x = -1;
cube4.position.y = 10.8;
cube4.position.z = 12.1;

var cubeGeometry5 = new THREE.BoxGeometry(0.3,0.3,1);
var cubeMeterial5 = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
cube5 = new THREE.Mesh(cubeGeometry5, cubeMeterial5);
cube5.castShadow = true;
cube5.position.x = 0.95;
cube5.position.y = 10.6;
cube5.position.z = 12.1;

cube6 = new THREE.Mesh(cubeGeometry5, cubeMeterial5);
cube6.castShadow = true;
cube6.position.x = 1.13;
cube6.position.y = 11.1;
cube6.position.z = 12.1;

cube7 = new THREE.Mesh(cubeGeometry5, cubeMeterial5);
cube7.castShadow = true;
cube7.position.x = -1.05
cube7.position.y = 10.6;
cube7.position.z = 12.1;

cube8 = new THREE.Mesh(cubeGeometry5, cubeMeterial5);
cube8.castShadow = true;
cube8.position.x = -0.87
cube8.position.y = 11.1;
cube8.position.z = 12.1;

//make body
var bodyGeometry = new THREE.BoxGeometry(5,2,6);
var bodyMeterial = new THREE.MeshPhongMaterial({color: 0xF8F8F8});
body = new THREE.Mesh(bodyGeometry, bodyMeterial);
body.castShadow = true;
body.position.x = 0;
body.position.y = 7;
body.position.z = 9;

var legGeometry = new THREE.BoxGeometry(1.5,1,2);
var legMeterial = new THREE.MeshPhongMaterial({color: 0xFFF2F1});
leg = new THREE.Mesh(legGeometry, legMeterial);
leg.castShadow = true;
leg.position.x = 1.5;
leg.position.y = 5.5;
leg.position.z = 11.5

leg2 = new THREE.Mesh(legGeometry, legMeterial);
leg2.castShadow = true;
leg2.position.x = -1.5;
leg2.position.y = 5.5;
leg2.position.z = 11.5

leg3 = new THREE.Mesh(legGeometry, legMeterial);
leg3.castShadow = true;
leg3.position.x = 1.5;
leg3.position.y = 5.5;
leg3.position.z = 6.5

leg4 = new THREE.Mesh(legGeometry, legMeterial);
leg4.castShadow = true;
leg4.position.x = -1.5;
leg4.position.y = 5.5;
leg4.position.z = 6.5

var tailGeometry = new THREE.BoxGeometry(1,1,1);
var tailMeterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
tail = new THREE.Mesh(tailGeometry, tailMeterial);
tail.castShadow = true;
tail.position.x = 1.5;
tail.position.y = 7.4;
tail.position.z = 5;

var item = [ear, ear2, ear3, ear4, cube, cube2, cube3, cube4, cube5, cube6, cube7, cube8, body, leg, leg2, leg3, leg4, tail];
for (var i = 0; i < item.length; i++)
{
	item[i].position.y = item[i].position.y - 1;
	item[i].position.x = item[i].position.x - 10;
}

var step = 0;

   window.onload = function init()
   {
      var canvas = document.getElementById( "gl-canvas" );
    
      gl = WebGLUtils.setupWebGL( canvas );
      if ( !gl ) { alert( "WebGL isn't available" ); }

    
    
      var vertices = [
          vec2( -0.5, -0.5 ),
          vec2(  -0.5,  0.5 ),
          vec2(  0.5, 0.5 ),
          vec2( 0.5, -0.5)
      ];


      gl.viewport( 0, 0, canvas.width, canvas.height );
      gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    
      var program = initShaders( gl, "vertex-shader", "fragment-shader" );
      gl.useProgram( program );

    
      var bufferId = gl.createBuffer();
      gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
      gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );


      var vPosition = gl.getAttribLocation( program, "vPosition" );
      gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
      gl.enableVertexAttribArray( vPosition );

      square();

	  document.getElementById("Manual").onclick = function () {
      console.log(event.button);
        
		};

   document.getElementById("Game").onclick = function () {
    console.log(event.button);

	// Get the pointer lock state
	getPointerLock();
	// Set up the game
	init2();
	// Start animating the scene
	animate();

    };

   }; //windo


function square() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

// Get the pointer lock and start listening for if its state changes
function getPointerLock() {
  document.onclick = function () {
    container.requestPointerLock();
  }
  document.addEventListener('pointerlockchange', lockChange, false); 
}

// Switch the controls on or off
function lockChange() {
    // Turn on controls
    if (document.pointerLockElement === container) {
        blocker.style.display = "none";
        controls.enabled = true;
        controlsEnabled = true;
    // Turn off the controls
    } else {
      // Display the blocker and instruction
        blocker.style.display = "";
        controls.enabled = false;
        controlsEnabled = false;
    }
}

// Set up the game
function init2() {

var aud = document.getElementById("myAudio");

function play() {
  aud.play();
}


aud.play(); // this will do the trick :)

  // Set clock to keep track of frames
  clock = new THREE.Clock();
  // Create the scene where everything will go
  scene = new THREE.Scene();

  // Add some fog for effects
  scene.fog = new THREE.FogExp2(0xB0E0E6, 0.0015);

  // Set render settings
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(scene.fog.color);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Render to the container
  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  // Set camera position and view details
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
  camera.position.y = 20; // Height the camera will be looking from
  camera.position.x = 0;
  camera.position.z = 0;

  // Add the camera to the controller, then add to the scene
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());

  // Check to see if keys are being pressed to move the player
  listenForPlayerMovement();

  // Add the walls(cubes) of the maze
  createMazeWalls();
  // Add ground plane
  createGround();
  // Add boundry walls that surround the maze
  createPerimWalls();
  // Add rabbit
  createRabbit();
  // Add lights to the scene
  addLights();

  // Listen for if the window changes sizes
  window.addEventListener('resize', onWindowResize, false);

}

// Add event listeners for player movement key presses
function listenForPlayerMovement() {
  // Listen for when a key is pressed
  // If it's a specified key, mark the direction as true since moving
  var onKeyDown = function(event) {

    switch (event.keyCode) {

      case 38: // up
      case 87: // w
        moveForward = true;
        break;

      case 37: // left
      case 65: // a
        moveLeft = true;
        break;

      case 40: // down
      case 83: // s
        moveBackward = true;
        break;

      case 39: // right
      case 68: // d
        moveRight = true;
        break;

    }

  };

  // Listen for when a key is released
  // If it's a specified key, mark the direction as false since no longer moving
  var onKeyUp = function(event) {

    switch (event.keyCode) {

      case 38: // up
      case 87: // w
        moveForward = false;
        break;

      case 37: // left
      case 65: // a
        moveLeft = false;
        break;

      case 40: // down
      case 83: // s
        moveBackward = false;
        break;

      case 39: // right
      case 68: // d
        moveRight = false;
        break;
    }
  };

  // Add event listeners for when movement keys are pressed and released
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
}

// Add lights to the scene
function addLights() {
  var lightOne = new THREE.DirectionalLight(0xffffff);
  lightOne.position.set(1, 1, 1);
  scene.add(lightOne);

  var lightTwo = new THREE.DirectionalLight(0xffffff, .4);
  lightTwo.position.set(1, -1, -1);
  scene.add(lightTwo);

  var lightThree = new THREE.AmbientLight(0x222222);
  lightThree.position.set(1, 0, 0);
  scene.add(lightThree);
}

// Create the maze walls using cubes that are mapped with a 2D array
function createMazeWalls() {
  // Maze wall mapping, assuming matrix
  // 1's are cubes, 0's are empty space
  var map = [
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, ],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, ],
    [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, ],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, ],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, ],
    [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, ],
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, ],
    [0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, ],
    [0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, ],
    [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, ],
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, ], // center passage
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, ],
    [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, ],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, ],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, ],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, ],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, ],
    [1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, ],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, ]
  ];

  // wall details
  var wallGeo = new THREE.BoxGeometry(UNITWIDTH, UNITHEIGHT, UNITWIDTH);
  var wallMat = new THREE.MeshPhongMaterial({
    color: 0xFFC0CB,
    shading: THREE.FlatShading
  });

  // Used to keep cubes within boundry walls
  widthOffset = UNITWIDTH / 2;
  // Used to set cube on top of the place since a cube's position is at its center
  heightOffset = UNITHEIGHT / 2;

  totalCubesWide = map[0].length;

  // Place walls where `1`s are
  for (var i = 0; i < totalCubesWide; i++) {
    for (var j = 0; j < map[i].length; j++) {
      if (map[i][j]) {
        var wall = new THREE.Mesh(wallGeo, wallMat);
        wall.position.z = (i - totalCubesWide / 2) * UNITWIDTH + widthOffset;
        wall.position.y = heightOffset;
        wall.position.x = (j - totalCubesWide / 2) * UNITWIDTH + widthOffset;
        scene.add(wall);

      scene.add(wall);
        // Used later for collision detection
        collidableObjects.push(wall);
      }
    }
  }

  var mapAble = [
   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, ],
    [1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, ],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, ], // center passage
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, ],
    [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, ],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, ],
    [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, ],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, ],
    [1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, ],
    [1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, ],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, ],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ]];

	swidthOffset = widthOffset / 4;

	// make many tree and flower
   for(var i = 0; i < 5; i++)
   {
      xpos = Math.floor(Math.random() * totalCubesWide);
      zpos = Math.floor(Math.random() * totalCubesWide);
      while (mapAble[zpos][xpos] == 1)
      {
         xpos = Math.floor(Math.random() * totalCubesWide);
         zpos = Math.floor(Math.random() * totalCubesWide);
      } 

      xposit = (xpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + swidthOffset;
      zposit = (zpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + swidthOffset;
      createTree(xposit, zposit);
   }

   for(var i = 0; i < 15; i++)
   {
      xpos = Math.floor(Math.random() * totalCubesWide);
      zpos = Math.floor(Math.random() * totalCubesWide);
      while (mapAble[zpos][xpos] == 1)
      {
         xpos = Math.floor(Math.random() * totalCubesWide);
         zpos = Math.floor(Math.random() * totalCubesWide);
      } 

      xposit = (xpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + swidthOffset;
      zposit = (zpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + swidthOffset;
      createTree2(xposit, zposit);
   }

   for(var i = 0; i < 15; i++)
   {
      xpos = Math.floor(Math.random() * totalCubesWide);
      zpos = Math.floor(Math.random() * totalCubesWide);
      while (mapAble[zpos][xpos] == 1)
      {
         xpos = Math.floor(Math.random() * totalCubesWide);
         zpos = Math.floor(Math.random() * totalCubesWide);
      } 

      xposit = (xpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + widthOffset;
      zposit = (zpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + widthOffset;
      createTree3(xposit, zposit);
   }

   for(var i = 0; i < 30; i++)
   {
      xpos = Math.floor(Math.random() * totalCubesWide);
      zpos = Math.floor(Math.random() * totalCubesWide);
      while (mapAble[zpos][xpos] == 1)
      {
         xpos = Math.floor(Math.random() * totalCubesWide);
         zpos = Math.floor(Math.random() * totalCubesWide);
      } 

      xposit = (xpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + swidthOffset;
      zposit = (zpos - Math.floor(totalCubesWide / 2)) * UNITWIDTH + swidthOffset;
      createFlower(xposit, zposit);
   }

}

function createTree(xpo, zpo) {
   var geometry,
   geometry2,
    group;

   geometry = new THREE.BoxGeometry(8, 8, 8 );
   geometry2 = new THREE.BoxGeometry(7, 7, 7);

   var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
   var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
   var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
   var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

   var stem = new THREE.Mesh( geometry2, stemMaterial );
   stem.position.set( xpo, 2, zpo );
   stem.scale.set( 0.3, 1.5, 0.3 );

   var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave01.position.set( xpo + 2.5, 14.6, zpo + 2.5 );
   squareLeave01.scale.set( 0.8, 0.8, 0.8 );

   var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave02.position.set( xpo -3.4, 12.3, zpo -3.4 );
   squareLeave02.scale.set( 0.7, 0.7, 0.7 );

   var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave03.position.set( xpo + 3.4, 12.7, zpo - 3.5 );
   squareLeave03.scale.set( 0.7, 0.7, 0.7 );

   var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
   leaveDark.position.set( xpo, 12.2, zpo);
   leaveDark.scale.set( 1, 2, 1    );

   var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
   leaveLight.position.set( xpo, 12.2, zpo );
   leaveLight.scale.set( 1.1, 0.5, 1.1 );

   var item = [stem, squareLeave01, squareLeave02, squareLeave03, leaveDark, leaveLight];

   for (var i = 0; i < 6; i++)
   {
      item[i].position.y = item[i].position.y + 4;
   }

   var tree = new THREE.Group();
   tree.add( leaveDark );
   tree.add( leaveLight );
   tree.add( squareLeave01 );
   tree.add( squareLeave02 );
   tree.add( squareLeave03 );
   tree.add( stem );

     scene.add( tree );
}

function createTree2(xpo, zpo) {
   var geometry,
   geometry2,
    group;

   geometry = new THREE.BoxGeometry(21, 21, 21);
   geometry2 = new THREE.BoxGeometry(20, 20, 20);

   var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
   var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
   var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
   var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

   var stem = new THREE.Mesh( geometry2, stemMaterial );
   stem.position.set( xpo, 16, zpo );
   stem.scale.set( 0.3, 1.5, 0.3 );

   var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave01.position.set( xpo + 6.5, 37.6, zpo + 6.5 );
   squareLeave01.scale.set( 0.8, 0.8, 0.8 );

   var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave02.position.set( xpo -8.4, 35.3, zpo -8.4 );
   squareLeave02.scale.set( 0.7, 0.7, 0.7 );

   var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave03.position.set( xpo + 8.4, 35.7, zpo - 8.4 );
   squareLeave03.scale.set( 0.7, 0.7, 0.7 );

   var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
   leaveDark.position.set( xpo, 35.2, zpo );
   leaveDark.scale.set( 1, 2, 1 );

   var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
   leaveLight.position.set( xpo, 35.2, zpo );
   leaveLight.scale.set( 1.1, 0.5, 1.1 );

   var item = [stem, squareLeave01, squareLeave02, squareLeave03, leaveDark, leaveLight];

   var tree2 = new THREE.Group();
   tree2.add( leaveDark );
   tree2.add( leaveLight );
   tree2.add( squareLeave01 );
   tree2.add( squareLeave02 );
   tree2.add( squareLeave03 );
   tree2.add( stem );

     scene.add( tree2 );
}

function createTree3(xpo, zpo) {
   var geometry,
   geometry2,
    group;

   geometry = new THREE.BoxGeometry(51, 51, 51);
   geometry2 = new THREE.BoxGeometry(50, 50, 50);

   var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
   var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
   var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
   var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );

   var stem = new THREE.Mesh( geometry2, stemMaterial );
   stem.position.set( xpo, 40, zpo );
   stem.scale.set( 0.3, 1.5, 0.3 );

   var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave01.position.set(xpo + 13.5, 82.6, zpo + 13.5 );
   squareLeave01.scale.set( 0.8, 0.8, 0.8 );

   var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave02.position.set( xpo -20.4, 80.3, zpo -20.4 );
   squareLeave02.scale.set( 0.7, 0.7, 0.7 );

   var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
   squareLeave03.position.set( xpo + 20.4, 80.7, zpo - 20.4 );
   squareLeave03.scale.set( 0.7, 0.7, 0.7 );

   var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
   leaveDark.position.set( xpo, 80.2, zpo );
   leaveDark.scale.set( 1, 2, 1 );

   var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
   leaveLight.position.set(xpo , 80.2, zpo );
   leaveLight.scale.set( 1.1, 0.5, 1.1 );

   var item = [squareLeave01, squareLeave02, squareLeave03, leaveDark, leaveLight];
   for (var i = 0; i < 5; i++)
   {
      item[i].position.y = item[i].position.y + 7;
   }

   var tree = new THREE.Group();
   tree.add( leaveDark );
   tree.add( leaveLight );
   tree.add( squareLeave01 );
   tree.add( squareLeave02 );
   tree.add( squareLeave03 );
   tree.add( stem );

     scene.add( tree );
}


function createFlower(xpo, zpo) {
   var geometry = new THREE.BoxGeometry(5,5,5);
   var stemMaterial = new THREE.MeshLambertMaterial( { color: 0xE46666 } );
   var floMaterial = new THREE.MeshLambertMaterial( { color: 0xFFC2C2} );
   var floMaterial2 = new THREE.MeshLambertMaterial( { color: 0xFFA7A7} );

   var stem = new THREE.Mesh( geometry, stemMaterial );
   stem.position.set( xpo, 5, zpo );
   stem.scale.set( 0.3, 1.5, 0.3 );

   var flo = new THREE.Mesh( geometry, floMaterial );
   flo.position.set( xpo, 7.5, zpo );
   flo.scale.set( 0.9, 0.9, 1 );

   var flow = new THREE.Mesh( geometry, floMaterial );
   flow.position.set( xpo -1, 10, zpo );
   flow.scale.set( 0.7, 0.7, 1.0 );

   var flow2 = new THREE.Mesh( geometry, floMaterial2 );
   flow2.position.set( xpo - 2.5, 11, zpo );
   flow2.scale.set( 0.7, 0.7, 0.5 );
   //flow2.rotateOnAxis(axis, 20);

   var flow3 = new THREE.Mesh( geometry, floMaterial2 );
   flow3.position.set( xpo + 1, 17, zpo );
   flow3.scale.set( 0.7, 0.7, 0.5 );

   var item = [stem, flo, flow, flow2, flow3];

   var flower = new THREE.Group();
   flower.add(stem);
   flower.add(flo);
   flower.add(flow);
   flower.add(flow2);
   flower.add(flow3);

   scene.add(flower);
}


function createRabbit() {
   scene.add(ear);
   scene.add(ear2);
   scene.add(ear3);
   scene.add(ear4);
   scene.add(cube);
   scene.add(cube2);
   scene.add(cube3);
   scene.add(cube4);
   scene.add(cube5);
   scene.add(cube6);
   scene.add(cube7);
   scene.add(cube8);
   scene.add(body);
   scene.add(leg);
   scene.add(leg2);
   scene.add(leg3);
   scene.add(leg4);
   scene.add(tail);
}

// Create the ground plane that the maze sits on top of
function createGround() {
  // Create the ground based on the map size the matrix/cube size produced
  mapSize = totalCubesWide * UNITWIDTH;
  // ground
  var groundGeo = new THREE.PlaneGeometry(mapSize, mapSize);
  var groundMat = new THREE.MeshPhongMaterial({
    color: 0xDDA0DD,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
  });

  var ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.set(0, 1, 0);
  ground.rotation.x = degreesToRadians(90);
  scene.add(ground);
}

// Make the four perimeter walls for the maze
function createPerimWalls() {
    var halfMap = mapSize / 2;  // Half the size of the map
    var sign = 1;               // Used to make an amount positive or negative

    // Loop through twice, making two perimeter walls at a time
    for (var i = 0; i < 2; i++) {
        var perimGeo = new THREE.PlaneGeometry(mapSize, UNITHEIGHT);
        // Make the material double sided
        var perimMat = new THREE.MeshPhongMaterial({ color: 0x464646, side: THREE.DoubleSide });
        // Make two walls
        var perimWallLR = new THREE.Mesh(perimGeo, perimMat);
        var perimWallFB = new THREE.Mesh(perimGeo, perimMat);

        // Create left/right walls
        perimWallLR.position.set(halfMap * sign, UNITHEIGHT / 2, 0);
        perimWallLR.rotation.y = degreesToRadians(90);
        scene.add(perimWallLR);
        collidableObjects.push(perimWallLR);
        // Create front/back walls
        perimWallFB.position.set(0, UNITHEIGHT / 2, halfMap * sign);
        scene.add(perimWallFB);
        collidableObjects.push(perimWallFB);

        sign = -1; // Swap to negative value
    }
}

// Update the camera and renderer when the window changes size
function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {
   render();
   requestAnimationFrame(animate);
   // Get the change in time between frames
   var delta = clock.getDelta();

   animatePlayer(delta);
   
   step += 0.1;
   for (var i = 0; i < item.length; i++)
   {
      item[i].position.y = item[i].position.y + (0.2 * Math.cos(step));
      item[i].position.z = item[i].position.z + 0.2;
   }

}


// Render the scene
function render() {
  renderer.render(scene, camera);
}

// Animate the player camera
function animatePlayer(delta) {
  // Gradual slowdown
  playerVelocity.x -= playerVelocity.x * 10.0 * delta;
  playerVelocity.z -= playerVelocity.z * 10.0 * delta;

   if(detectPlayerCollision() == false){
      if (moveForward) {
         playerVelocity.z -= PLAYERSPEED * delta;
      } 
      if (moveBackward) {
         playerVelocity.z += PLAYERSPEED * delta;
      } 
      if (moveLeft) {
         playerVelocity.x -= PLAYERSPEED * delta;
      } 
      if (moveRight) {
         playerVelocity.x += PLAYERSPEED * delta;
      }
      controls.getObject().translateX(playerVelocity.x * delta);
      controls.getObject().translateZ(playerVelocity.z * delta);

      } else {
         // collision or no movement key being pressed. Stop movement
         playerVelocity.x = 0;
         playerVelocity.z = 0;
      } //end of else
  
} //end of 'animatePlayer' function

// detectPlayerCollision
function detectPlayerCollision() {
    // The rotation matrix to apply to our direction vector
    // Undefined by default to indicate ray should coming from front
    var rotationMatrix;
    // Get direction of camera
    var cameraDirection = controls.getDirection(new THREE.Vector3(0, 0, 0)).clone();

    // Check which direction we're moving (not looking)
    // Flip matrix to that direction so that we can reposition the ray
    if (moveBackward) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(180));
    }
    else if (moveLeft) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(90));
    }
    else if (moveRight) {
        rotationMatrix = new THREE.Matrix4();
        rotationMatrix.makeRotationY(degreesToRadians(270));
    }

    // Player is not moving forward, apply rotation matrix needed
    if (rotationMatrix !== undefined) {
        cameraDirection.applyMatrix4(rotationMatrix);
    }

    // Apply ray to player camera
    var rayCaster = new THREE.Raycaster(controls.getObject().position, cameraDirection);

    // If our ray hit a collidable object, return true
    if (rayIntersect(rayCaster, PLAYERCOLLISIONDISTANCE)) {
        return true;
    } else {
        return false;
    }
}
//detectPlayerCollision() depend on rayIntersect()
function rayIntersect(ray, distance) {
    var intersects = ray.intersectObjects(collidableObjects);
    for (var i = 0; i < intersects.length; i++) {
        // Check if there's a collision
        if (intersects[i].distance < distance) {
            return true;
        }
    }
    return false;
}

// Converts degrees to radians
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

// Converts radians to degrees
function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}