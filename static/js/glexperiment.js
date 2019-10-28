var hexToGlColor =function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var a = result ? {
    r: parseInt(result[1], 16)/255.0,
    g: parseInt(result[2], 16)/255.0,
    b: parseInt(result[3], 16)/255.0,
    a: 1.0
  } : null;
  console.log(a);
};

var setBackgroundColor = function( gl, hex )
{
  var color = hexToGlColor(hex);
  if ( false === goog.isDefAndNotNull(color) ) {
    return;
  }
  gl.clearColor( color.r, color.g, color.b, color.alpha );
  gl.clear( gl.COLOR_BUFFER_BIT );
};

function initShaders( gl, vertex, fragment ) {

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertex);
  gl.attachShader(shaderProgram, fragment);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log("Unable to initialize the shader program.", gl.getProgramInfoLog(shaderProgram) );
    return;
  }

  gl.useProgram(shaderProgram);
  return shaderProgram;
}

var drawTestFigure = function(gl, figurecolor )
{
  var vertextxt = `
    attribute vec4 a_color;
    varying vec4 v_color;

    void main() {
      gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );
      gl_PointSize = 10.0;
      v_color = a_color;
    }`;
  var fragmenttxt = `
//    precision medium float;
//    varying vec4 v_color;

    void main() {
      gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
//      gl_FragColor = v_color;
    }`;
  var vertex = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource( vertex, vertextxt );
  gl.compileShader(vertex);
  var fragment = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource( fragment, fragmenttxt );
  gl.compileShader(fragment);
  var program = initShaders( gl, vertex, fragment );
 
//  if ( false === initShaders( gl, vertex, fragment ) ) {
//    return;
//  }
  gl.drawArrays( gl.POINTS, 0, 1 );
  var clr = gl.getAttribLocation( program, 'a_color' );
  gl.enableVertexAttribArray(clr);
//  var clr2 = gl.getAttribLocation( program, 'v_color' );
//  gl.enableVertexAttribArray(clr2);
  console.log('acolor =', clr);
//  console.log('acolor2 =', clr2);
};
