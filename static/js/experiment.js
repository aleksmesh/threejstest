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
  this.arrays = meteo.experiment.initTestSphere();
};

meteo.experiment.prototype.createProgramInfo = function( vshader, fshader )
{
  this.programinfo = twgl.createProgramInfo( this.glcontext, [ vshader, fshader ], );
};

meteo.experiment.initTestSphere = function() {
  let arrays3 = {
    position: [
    ],
    color: [
    ]
  };
  let r = meteo.basis.EARTH_RADIUS;
  for ( let i = 0; i <= 355; i+= 10 ) {
    let lon0 = i*meteo.basis.DEG2RAD;
    let lond = (i+10)*meteo.basis.DEG2RAD;
    let sinlon0 = Math.sin(lon0);
    let coslon0 = Math.cos(lon0);
    let sinlond = Math.sin(lond);
    let coslond = Math.cos(lond);
    for ( let j = 0; j <= 85; j+=5 ) {
      let lat0 = j*meteo.basis.DEG2RAD;
      let latd = (j+5)*meteo.basis.DEG2RAD;
      let sinlat0 = Math.sin(lat0);
      let coslat0 = Math.cos(lat0);
      let sinlatd = Math.sin(latd);
      let coslatd = Math.cos(latd);
      let x = r*coslat0*sinlon0;
      let y = r*sinlat0;
      let z = r*coslat0*coslon0;
      arrays3.position.push(x);
      arrays3.position.push(y);
      arrays3.position.push(z);
      x = r*coslat0*sinlond;
      z = r*coslat0*coslond;
      arrays3.position.push(x);
      arrays3.position.push(y);
      arrays3.position.push(z);
      x = r*coslatd*sinlon0;
      y = r*sinlatd;
      z = r*coslatd*coslon0;
      arrays3.position.push(x);
      arrays3.position.push(y);
      arrays3.position.push(z);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
    }
  }
  return arrays3;
};

meteo.experiment.defaultVshader = function()
{
  return `
    attribute vec4 position;
    attribute vec4 color;
    varying lowp vec4 vcolor;
    uniform mat4 mvp;
    void main() {
      gl_Position = mvp*position;
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
  let okpok  = ry.multiply(rx);
  let jokmok = okpok.multiply(rz);
  return jokmok;
};

meteo.experiment.projmatrix = function( fov, width, height, near, far )
{
//  let pers = meteo.m4.perspective( Math.PI/3, 1980/1024, 0, 1 );
  let pers = meteo.m4.perspective( fov*Math.PI/180, width/height, parseInt(near), parseInt(far) );
  return pers;
};

meteo.experiment.lookat = function( lat, lon, dist )
{
  let lonrad = meteo.basis.DEG2RAD*lon;
  let latrad =  meteo.basis.DEG2RAD*lat;
  let cam = [ dist*Math.sin( lonrad )*Math.cos(latrad), dist*Math.sin(latrad), dist*Math.cos(lonrad)*Math.cos(latrad) ];
  let up = [ 0, dist*Math.cos(latrad), -dist*Math.sin(latrad) ];
  let look = meteo.m4.lookAt( cam, [ 0, 0, 0 ], up );
  let viewm = look.getInverse();
  return viewm;
};
