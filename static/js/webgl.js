//компонент для обработки событий: window.resize, mouseMove, mouseScroll
var baseactions = {
  data: function() {
    return {
      canvas: null,
      gl: null,
      backgroundcolor: '#FFFFFF',
      primitivecolor: '#000000'
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
  },
  methods: {
    windowResized: function(e) {
      if ( true === goog.isDefAndNotNull(this.canvas) ) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      }
    },
    setBackgroundColor: function(value) {
      console.log(value);
      console.log(this.backgroundcolor);
    }
  },
  watch: {
    backgroundcolor: function() {
      console.log('nu hz shtoto');
      setBackgroundColor( this.gl, this.backgroundcolor );
    },
    primitivecolor: function() {
      console.log('piska!', this.primitivecolor);
      var clr3comp = hexToGlColor(this.primitivecolor); 
      console.log('okpok =', clr3comp);
      drawTestFigure( this.gl, clr3comp );
      var colors = new Float32Array([
            1.0, 0.0, 0.0, // Vertex A (r,g,b)
            0.0, 1.0, 0.0, // Vertex B (r,g,b)
            0.0, 0.0, 1.0  // Vertex C (r,g,b)
        ]);
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
