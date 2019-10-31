//компонент для обработки событий: window.resize, mouseMove, mouseScroll
var baseactions = {
  data: function() {
    return {
      canvas: null,
      gl: null,
      program: null,
      backgroundcolor: '#FFFFFF',
      primitivecolor: '#000000',
      color: new Float32Array([1,0,0,1])
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
    this.program = createProgram(this.gl);
    drawTestFigure( this.gl, this.color, this.program );
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
    },
    primitivecolor: function() {
      var clr3comp = hexToGlColor(this.primitivecolor); 
      this.color[0] = clr3comp.r;
      this.color[1] = clr3comp.g;
      this.color[2] = clr3comp.b;
      this.color[3] = clr3comp.a;
//      changeFigureColor( this.gl, clr3comp, this.program );
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
