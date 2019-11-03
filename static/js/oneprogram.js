//компонент для обработки событий: window.resize, mouseMove, mouseScroll
var baseactions = {
  data: function() {
    return {
      canvas: null,
      gl: null,
      program: null,
      backgroundcolor: '#FFFFFF',
      primitivecolor: '#0000FF',
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
    this.colorbuffer = this.gl.createBuffer();
    this.windowResized()
    var clr3comp = hexToGlColor(this.primitivecolor); 
    this.program = createProgram(this.gl);
    drawTestFigure( this.gl, this.color, this.program, this.colorbuffer );
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
      setBackgroundColor( this.gl, this.backgroundcolor );
      changeFigureColor( this.gl, this.color, this.program, this.colorbuffer );
    },
    primitivecolor: function() {
      var clr3comp = hexToGlColor(this.primitivecolor); 
      this.color[0] = clr3comp.r;
      this.color[1] = clr3comp.g;
      this.color[2] = clr3comp.b;
//      this.color[3] = clr3comp.a;
      console.log(this.color);
      setBackgroundColor( this.gl, this.backgroundcolor );
      changeFigureColor( this.gl, this.color, this.program, this.colorbuffer );
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
