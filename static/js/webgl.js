//компонент для обработки событий: window.resize, mouseMove, mouseScroll
var baseactions = {
  data: function() {
    return {
      canvas: null,
      gl: null,
      program: null,
      shaders: [
        ` attribute vec4 a_position;
          void main() {
            gl_Position = a_position;
            gl_PointSize = 10.0;
          }`,
        `
          uniform lowp vec4 u_color;
          void main() {
            gl_FragColor = u_color;
          }`
      ]
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
//    this.colorbuffer = this.gl.createBuffer();
//    this.coordbuffer = this.gl.createBuffer();
    this.windowResized()
    var clr3comp = hexToGlColor(this.primitivecolor); 
    this.program = webglUtils.createProgramFromSources( this.gl, this.shaders );
//    drawTestFigure( this.gl, this.color, this.program, this.colorbuffer, this.coordbuffer, this.figurecoord );
  },
  methods: {
    windowResized: function(e) {
      if ( true === goog.isDefAndNotNull(this.canvas) ) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        if ( true === goog.isDefAndNotNull( this.gl ) ) {
          this.gl.canvas.width = this.canvas.width;
          this.gl.canvas.height = this.canvas.height;
          this.gl.viewport( 0, 0, this.gl.canvas.width, this.gl.canvas.height );
        }
      }
      if ( true === goog.isDefAndNotNull(this.gl)
        && true === goog.isDefAndNotNull(this.color)
        && true === goog.isDefAndNotNull(this.backgroundcolor)
        && true === goog.isDefAndNotNull(this.program)
        && true === goog.isDefAndNotNull(this.colorbuffer)
        ) {
       setBackgroundColor( this.gl, this.backgroundcolor );
        changeFigureColor( this.gl, this.color, this.program, this.colorbuffer );
      }
    }
  },
  watch: {
    backgroundcolor: function() {
//      setBackgroundColor( this.gl, this.backgroundcolor );
//      changeFigureColor( this.gl, this.color, this.program, this.colorbuffer );
    },
    primitivecolor: function() {
      var clr3comp = hexToGlColor(this.primitivecolor); 
//      this.color[0] = clr3comp.r;
//      this.color[1] = clr3comp.g;
//      this.color[2] = clr3comp.b;
//      this.color[3] = clr3comp.r;
//      this.color[4] = clr3comp.g;
//      this.color[5] = clr3comp.b;
//      setBackgroundColor( this.gl, this.backgroundcolor );
//      changeFigureColor( this.gl, this.color, this.program, this.colorbuffer );
    }
  },
  template: `
  <div class='scenecontainer'>
    <canvas ref='glcanvas'>
    </canvas>
    <div class='choosebackgroundcolor'>
      <input type='color' value='#FFFFFF'>
      <input type='color' value='#000000'>
    </div>
  </div>
  `
};
//      <input type='color' v-model='backgroundcolor' value='#FFFFFF'>
//      <input type='color' v-model='primitivecolor' value='#000000'>

var webgl = new Vue({
  el: '#webglblock',
  data: {},
  components: {
    'baseactions': baseactions
  }
}
);
