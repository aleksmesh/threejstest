/*! 
  * \brief Компиляция программы шейдера 
* \param gl - gl-контекст
* \param source - текст программы
* \param type - тип шейдера ( VERTEX_SHADER или FRAGMENT_SHADER )
* \return - WebglShader в случае успешной компилции, иначе - null
*/
var compileShader = function( gl, source, type ) {
  var shader = gl.createShader(type);
  gl.shaderSource( shader, source);
  gl.compileShader(shader);
  var suc = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if ( false === suc ) {
    console.log('Ошибка компиляции шейдера. Описание ошибки =', gl.getShaderInfoLog(shader) );
    return null;
  }
 
  return shader;
};

/*! 
  * \brief - создание программы из двух шейдеров
* \param gl - gl-контекст
* \param vertex - Вершинный шейдер
* \param fragment - фрагментный шейдер
* \return - созданая программа, если все ок, иначе - null
*/
function createProgram( gl, vertex, fragment ) {
  var program = gl.createProgram();
  gl.attachShader(program, vertex );
  gl.attachShader(program, fragment );
  gl.linkProgram(program);
  var suc = gl.getProgramParameter(program, gl.LINK_STATUS);
  if ( false === !suc ) {
    console.log("Ошибка компоновки программы:" + gl.getProgramInfoLog (program) );
    return null;
  }

  return program;
};
