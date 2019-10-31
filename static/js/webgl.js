//компонент для обработки событий: window.resize, mouseMove, mouseScroll
var baseactions = {
  data: function() {
    return {
      canvas: null,
      gl: null,
      program: null,
      backgroundcolor: '#FFFFFF',
      primitivecolor: '#0000FF',
      color: new Float32Array([0,1,1]),
      colorbuffer: null
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
