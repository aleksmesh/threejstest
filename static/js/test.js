var camera, scene, renderer,
geometry, material, mesh;

var loader;

var xrotation = 0.0;
var yrotation = 0.0;
var rotateactive = false;
var radius = 400;

var startdx = 0;
var startdy = 0;

var init = function() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 3000;

  geometry = new THREE.SphereGeometry( radius, 200, 200, 0);//, Math.PI*0.5, Math.PI*0.1, Math.PI*0.25 );
//  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );
  loader = new THREE.TextureLoader();
 
  material = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF,
  map: loader.load('static/img/mercator-strange.jpg'),
});


  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );

  window.addEventListener('mousedown', function(e) { mouseDown(e) }, false );
  window.addEventListener('mouseup', function(e) { mouseUp(e) }, false );
  window.addEventListener('mousemove', function(e) { mouseMove(e) }, false );
  window.addEventListener('wheel', function(e) { mouseWheel(e) }, false );
}

var animate = function() {
  requestAnimationFrame( animate );
  render();
}

var render = function() {
  renderer.render( scene, camera );
}

var mouseDown = function(e)
{
  startdx = e.clientX;
  startdy = e.clientY;
  rotateactive = true;
};

var mouseUp = function(e)
{
  rotateactive = false;
};

var mouseMove = function(e)
{
  if ( false === rotateactive ) {
    return;
  }
  xrotation += Math.PI*0.001*(e.clientX - startdx);
  yrotation += Math.PI*0.001*(e.clientY - startdy);
  mesh.rotation.y = xrotation;
  mesh.rotation.x = yrotation;
  startdx = e.clientX;
  startdy = e.clientY;
};

var mouseWheel = function(e)
{
  mesh.scale.x += -0.001*e.deltaY;
  mesh.scale.y += -0.001*e.deltaY;
  mesh.scale.z += -0.001*e.deltaY;
};

init();
animate();

