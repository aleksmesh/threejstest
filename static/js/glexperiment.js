var hexToGlColor =function(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var clr = result ? {
    r: parseInt(result[1], 16)/255.0,
    g: parseInt(result[2], 16)/255.0,
    b: parseInt(result[3], 16)/255.0,
    a: 1.0
  } : null;
  return clr;
};

var setBackgroundColor = function( gl, hex )
{
  var color = hexToGlColor(hex);
  if ( false === goog.isDefAndNotNull(color) ) {
    return;
  }
  gl.clearColor( color.r, color.g, color.b, color.a );
  gl.clear( gl.COLOR_BUFFER_BIT );
};

function initShaders( gl, vertex, fragment ) {

  var shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertex);
  gl.attachShader(shaderProgram, fragment);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.log("Unable to initialize the shader program.", gl.getProgramInfoLog(shaderProgram) );
    return null;
  }

  gl.useProgram(shaderProgram);
  return shaderProgram;
}

var createProgram = function(gl)
{
  var vertextxt = `
    attribute vec4 a_position;
//    attribute vec4 a_color;
//    varying lowp vec4 v_color;

    void main() {
//      gl_Position = vec4( 0.0, 0.0, 0.0, 1.0 );
      gl_Position = a_position;
      gl_PointSize = 10.0;
//      v_color = a_color;
    }`;
  var fragmenttxt = `
    uniform lowp vec4 u_color;
    void main() {
 //     if ( distance(gl_PointCoord, vec2(0.5)) > 0.5 ) {
 //       discard;
 //     }
      gl_FragColor = u_color;
    }`;

  var vertex = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource( vertex, vertextxt );
  gl.compileShader(vertex);
  var fragment = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource( fragment, fragmenttxt );
  gl.compileShader(fragment);
  var program = initShaders( gl, vertex, fragment );
  if ( null === program ) {
    console.log('Ошибка компиляции шейдеров!');
    return;
  }
  return program;
}

var drawTestFigure = function(gl, figurecolor, program, colorbuffer, coordbuffer, figurecoord )
{
//  gl.bindBuffer( gl.ARRAY_BUFFER, colorbuffer );
//  gl.bufferData( gl.ARRAY_BUFFER, figurecolor, gl.STATIC_DRAW );
//  gl.vertexAttribPointer( vertexcolor, 3, gl.FLOAT, false, 0, 0 );
//  gl.enableVertexAttribArray(vertexcolor);

  var vertexcoord = gl.getAttribLocation( program, 'a_position' );
  gl.bindBuffer( gl.ARRAY_BUFFER, coordbuffer );
  gl.bufferData( gl.ARRAY_BUFFER, figurecoord, gl.STATIC_DRAW );
  gl.vertexAttribPointer( vertexcoord, 2, gl.FLOAT, false, 0, 0 );
  gl.enableVertexAttribArray(vertexcoord);
  var vertexcolor = gl.getUniformLocation( program, 'u_color' );
  gl.uniform4f( vertexcolor, figurecolor[0], figurecolor[1],figurecolor[2],1 );
  

  gl.drawArrays( gl.POINTS, 0, 4 );
};

var changeFigureColor = function( gl, figurecolor, program, colorbuffer )
{
//  gl.bindBuffer( gl.ARRAY_BUFFER, colorbuffer );
//  gl.bufferData( gl.ARRAY_BUFFER, figurecolor, gl.STATIC_DRAW );
  var vertexcolor = gl.getUniformLocation( program, 'u_color' );
  gl.uniform4f( vertexcolor, figurecolor[0], figurecolor[1],figurecolor[2],1 );
  gl.drawArrays( gl.POINTS, 0, 4 );
};
