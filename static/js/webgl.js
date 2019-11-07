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
      canvas: null,
      gl: null,
      programinfo: null,
      bufferinfo: null,
      arrays: {
        position: { numComponents: 2, data: [100,100, 200, 200, -200, 200, 200, -200] },
        color:    { numComponents: 4, data: [ 0, 255, 255, 255, ],type: Uint8Array }
      },
      shaders: {
        vertex:`
          attribute vec2 a_position;
          uniform vec2 resolution;
          uniform vec2 translation;
          uniform vec2 rotation;
          void main() {
            vec2 rotpos = vec2(
              a_position.x*rotation.y + a_position.y*rotation.x,
              a_position.y*rotation.y - a_position.x*rotation.x
            );
            vec2 pos = rotpos+translation;
            vec2 normalpos = pos/resolution*2.0 - 1.0;
            gl_Position = vec4( normalpos*vec2(1,-1), 0, 1 );
            gl_PointSize = 10.0;
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
    this.bufferinfo = webglUtils.createBufferInfoFromArrays( this.gl, this.arrays );
    this.programinfo = webglUtils.createProgramInfo( this.gl, [ this.shaders.vertex, this.shaders.fragment ] );
    this.gl.useProgram( this.programinfo.program );
    this.windowResized();
  },
  methods: {
    setBackgroundColor: function() {
      var clr = hexToGlColor(this.backgroundcolor);
      this.gl.clearColor( clr.r, clr.g, clr.b, clr.a );
      this.gl.clear( this.gl.COLOR_BUFFER_BIT );
    },
    drawFigures: function() {
      webglUtils.setBuffersAndAttributes( this.gl, this.programinfo, this.bufferinfo );
      var clr = hexToGlColor(this.primitivecolor)
      var uniform = {
        u_color: [ clr.r, clr.g, clr.b, clr.a ],
        resolution: [this.gl.canvas.width,this.gl.canvas.height],
        translation:[500,500],
        rotation:[1,0]
      };
      webglUtils.setUniforms( this.programinfo.uniformSetters, uniform );
      this.gl.drawArrays( this.gl.POINTS, 0, this.bufferinfo.numElements );
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
      }
    }
  },
  watch: {
    backgroundcolor: function() {
      this.setBackgroundColor();
      this.drawFigures();
    },
    primitivecolor: function() {
      this.setBackgroundColor();
      this.drawFigures();
    }
  },
  template: `
  <div class='scenecontainer'>
    <canvas ref='glcanvas'>
    </canvas>
    <div class='choosebackgroundcolor'>
      <input type='color' v-model='backgroundcolor' value='#FFFFFF'>
      <input type='color' v-model='primitivecolor' value='#000000'>
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
