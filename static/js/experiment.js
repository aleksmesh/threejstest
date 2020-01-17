goog.provide('meteo.experiment');

meteo.experiment = function( canvas )
{
  this.canvas = canvas;
  this.glcontext = null;
  if ( false === goog.isDefAndNotNull( this.canvas ) ) {
    console.log('ups! i havn\'t canvas!');
  }
  else {
    this.glcontext = this.canvas.getContext('webgl', { antialias: true } );
  }
  if ( false === goog.isDefAndNotNull( this.glcontext ) ) {
    console.log('ups! i havn\'t webgl context!');
  }
  console.log( 'atribs =', this.glcontext.getContextAttributes() );
  this.programinfo = null;
  this.latitudes = null;
  this.latarrays = [];
};

meteo.experiment.prototype.createProgramInfo = function( vshader, fshader )
{
  this.programinfo = twgl.createProgramInfo( this.glcontext, [ vshader, fshader ], );
};

meteo.experiment.defaultVshader = function()
{
  return `
    attribute vec4 position;
    attribute vec4 color;
//    mat4 matrix = mat4( 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 );
    varying lowp vec4 vcolor;
    uniform mat4 matr;
    uniform mat4 huyatr;
    void main() {
//        gl_Position = huyatr*position;
        gl_Position = matr*huyatr*position;
//      gl_Position = position;
      vcolor = color;
    }
  `;
};

meteo.experiment.defaultFshader = function()
{
  return `
    precision mediump float;
    varying lowp vec4 vcolor;
    void main() {
      gl_FragColor = vcolor;
//      gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
    }
  `;
};

meteo.experiment.latitudeRings = function()
{
  let polys = [];
  for ( let i = -90; i <= 90; i+=5  ) {
    let poly = [];
    for ( let j = -180; j <= 180; j+=10 ) {
      poly.push( new meteo.basis.GeoPoint( i, j ) );
    }
    polys.push( poly );
  }
  return polys;
};

meteo.experiment.rotmatrix = function( rxa, rya, rza )
{
  let rx = meteo.m4.xrotation( meteo.basis.DEG2RAD*rxa );
  let ry = meteo.m4.yrotation( meteo.basis.DEG2RAD*rya );
  let rz = meteo.m4.zrotation( meteo.basis.DEG2RAD*rza );
  let okpok  = rx.multiply(ry);
  let jokmok = okpok.multiply(rz);
  return jokmok;
};

meteo.experiment.projmatrix = function( fov, width, height, near, far )
{
//  let pers = meteo.m4.perspective( Math.PI/3, 1980/1024, 0, 1 );
  let pers = meteo.m4.perspective( fov*Math.PI/180, width/height, parseInt(near), parseInt(far) );
  return pers;
};

meteo.experiment.lookat = function()
{
  let pos  = [ 1, 0, 0 ];
  let cam = meteo.m4.xrotation( meteo.basis.DEG2RAD*90 );
  cam = cam.multiply( meteo.m4.scaling( 0.2, 0.2, 0.2 ) );
  cam = cam.multiply( meteo.m4.translation( 0, 0, 0 ) );
  let campos = [ cam.getValueAt( 3, 0 ), cam.getValueAt( 3, 1 ), cam.getValueAt( 3, 2 ) ];
  let up = [ 0, 1, 0 ];
  let look = meteo.m4.lookAt( campos, [ 0, 0, 1 ], up );
  let viewm = look.getInverse();
  return viewm;
};
