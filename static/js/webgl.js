//компонент для обработки событий: window.resize, mouseMove, mouseScroll
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

var baseactions = {
  data: function() {
    return {
      backgroundcolor: '#FFFFFF',
      primitivecolor: '#000000',
      primitiveangle: 0.0,
      canvas: null,
      gl: null,
      programinfo: null,
      bufferinfo: null,
      arrays: {
        position: { numComponents: 3, data: [0,0, 200, 200, -200, 200] },
        color:    { numComponents: 4, data: [ 0, 255, 255, 255, ],type: Uint8Array },
        angle: { numComponents: 1, data: [ this.primitiveangle ] }
      },
      shaders: {
        vertex:`
          attribute vec2 position;
          uniform vec2 resolution;
          uniform vec2 translation;
          uniform float angle;
          uniform float pntsize;
          void main() {
            vec2 position2 = position - vec2(0.0, 200.0);
            vec2 rot = vec2( cos(angle), sin(angle) );
            vec2 rotpos = vec2(
              position2.x*rot.x - position2.y*rot.y,
              position2.x*rot.y + position2.y*rot.x
            );
            rotpos += vec2(0.0,200.0);
            vec2 pos = rotpos+translation;
            vec2 normalpos = pos/resolution;
            gl_Position = vec4( normalpos, 0, 1 );
            gl_PointSize = pntsize;
          }`,
        fragment: `
          uniform lowp vec4 u_color;
          void main() {
            gl_FragColor = u_color;
          }`
      }
    }
  },
  created() {
    window.addEventListener('resize', this.windowResized )
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResized )
  },
  mounted() {
    this.canvas = this.$refs.glcanvas;
    this.gl = this.canvas.getContext('webgl');
    this.windowResized()
    var clr3comp = hexToGlColor(this.primitivecolor);
    this.bufferinfo = twgl.createBufferInfoFromArrays( this.gl, this.arrays );
    this.programinfo = twgl.createProgramInfo( this.gl, [ this.shaders.vertex, this.shaders.fragment ] );
    this.gl.useProgram( this.programinfo.program );
    this.windowResized();
    requestAnimationFrame( this.drawFigures );
  },
  methods: {
    setBackgroundColor: function() {
      var clr = hexToGlColor(this.backgroundcolor);
      this.gl.clearColor( clr.r, clr.g, clr.b, clr.a );
      this.gl.clear( this.gl.COLOR_BUFFER_BIT );
    },
    drawFigures: function() {
      this.setBackgroundColor();
      twgl.setBuffersAndAttributes( this.gl, this.programinfo, this.bufferinfo );
      var clr = hexToGlColor(this.primitivecolor)
      var uniform = {
        u_color: [ clr.r, clr.g, clr.b, clr.a ],
        resolution: [this.gl.canvas.width,this.gl.canvas.height],
        translation:[00,00],
        angle: Math.PI*this.primitiveangle,
        pntsize: 10
      };
      twgl.setUniforms( this.programinfo.uniformSetters, uniform );
//      this.gl.drawArrays( this.gl.POINTS, 0, this.bufferinfo.numElements );
//      twgl.drawBufferInfo( this.gl, this.bufferinfo, this.gl.POINTS, this.bufferinfo.numElements );
      twgl.drawBufferInfo( this.gl, this.bufferinfo, this.gl.TRIANGLES, this.bufferinfo.numElements );
      requestAnimationFrame( this.drawFigures );
      this.primitiveangle -= 0.002
      if ( 0.0 > this.primitiveangle ) {
        this.primitiveangle = 2.0;
      }
    },
    windowResized: function(e) {
      if ( true === goog.isDefAndNotNull(this.canvas) ) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if ( true === goog.isDefAndNotNull( this.programinfo) ) {
          this.gl.canvas.width = this.canvas.width;
          this.gl.canvas.height = this.canvas.height;
          this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );
          this.setBackgroundColor();
          this.drawFigures();
        }
//        this.canvas.width = window.innerWidth;
//        this.canvas.height = window.innerHeight;
//        twgl.resizeCanvasToDisplaySize( this.gl.canvas );
//        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
      }
    }
  },
  watch: {
    backgroundcolor: function() {
//      this.setBackgroundColor();
//      this.drawFigures();
    },
    primitivecolor: function() {
//      this.setBackgroundColor();
//      this.drawFigures();
    },
    primitiveangle: function() {
//      this.setBackgroundColor();
//      this.drawFigures();
    }
  },
  template: `
  <div class='scenecontainer'>
    <canvas ref='glcanvas'>
    </canvas>
    <div class='choosebackgroundcolor'>
      <input type='color' v-model='backgroundcolor' value='#FFFFFF'>
      <input type='color' v-model='primitivecolor' value='#000000'>
      <input type='range' v-model='primitiveangle' min='0' max='2' value='0' step='0.001' >
    </div>
  </div>
  `
};

var webgl = new Vue({
  el: '#webglblock',
  data: {},
  components: {
    'baseactions': baseactions
  }
}
);
