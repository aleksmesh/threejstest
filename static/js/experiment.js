goog.provide('meteo.experiment');

meteo.experiment = function( canvas )
{
  this.canvas = canvas;
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
};

meteo.experiment.prototype.createProgramInfo = function( vshader, fshader )
{
  this.programinfo = twgl.createProgramInfo( this.glcontext, [ vshader, fshader ], );
};

meteo.experiment.defaultVshader = function()
{
  return `
    attribute vec4 ajop;
    uniform vec4 ujop;
    varying  vec4 vjop;
    void main() {
      gl_Position = ajop + ujop;
      vjop = ajop + ujop;
    }
  `;
};

meteo.experiment.defaultFshader = function()
{
  return `
    precision mediump float;
    varying vec4 vjop;
    void main() {
      vec4 color = vjop * 0.5 + 0.5;
      gl_FragColor = color;
    }
  `;
};
