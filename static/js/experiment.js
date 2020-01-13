goog.provide('meteo.experiment');

meteo.experiment = function( canvas )
{
  this.canvas = canvas;
  this.glcontext = null;
  if ( false === goog.isDefAndNotNull( this.canvas ) ) {
    console.log('ups! i havn\'t canvas!');
  }
  else {
    this.glcontext = this.canvas.getContext('webgl');
  }
  if ( false === goog.isDefAndNotNull( this.glcontext ) ) {
    console.log('ups! i havn\'t webgl context!');
  }
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
    uniform mat4 matrix;
    void main() {
      gl_Position = matrix*position;
    }
  `;
};

meteo.experiment.defaultFshader = function()
{
  return `
    precision mediump float;
    void main() {
      gl_FragColor = vec4( 1.0, 0, 0, 1.0);
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

meteo.experiment.rotmatrix = function()
{
  let rx = meteo.m4.xrotation( meteo.basis.DEG2RAD*12 );
  let ry = meteo.m4.yrotation( meteo.basis.DEG2RAD*12 );
  let rz = meteo.m4.zrotation( meteo.basis.DEG2RAD*12 );
  return rx.multiply(ry).multiply(rz);
};

meteo.experiment.projmatrix = function()
{
  let pers = meteo.m4.perspective( Math.PI/3, 1, 1, 5000 );
  return pers;
};

meteo.experiment.lookat = function()
{
  let look = meteo.m4.lookAt( [ 0, -5000000, 0 ], [  ], [] );
};
