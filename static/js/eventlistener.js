goog.require('goog.math');
goog.require('m4');
goog.require('geo');

var webgl = new Vue({
  el: '#glcanvas',
  data: function() {
    return {
      canvas: null,
      glcontext: null
    }
  },
  created() {
    window.addEventListener('resize', this.windowResized )
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResized )
  },
  mounted() {
    this.canvas = this.$el;
    if ( false === goog.isDefAndNotNull( this.canvas ) ) {
      console.log('ups! i havn\'t canvas!');
    }
    else {
      this.glcontext = this.canvas.getContext('webgl');
    }
//    let test = m4.translation( 10, 11, 12 );
//    let transp = test.getTranspose();
//    console.log( test, transp );
//    test.multiply(0);
//    test = m4.xrotation( goog.math.toRadians(30) );
//    console.log(test);
//    test.multiply(0);
//    test = m4.yrotation( goog.math.toRadians(30) );
//    console.log(test);
//    test.multiply(0);
//    test = m4.zrotation( goog.math.toRadians(30) );
//    console.log(test);
//    test.multiply(0);
//    test = m4.scaling( 10, 11, 12 );
//    console.log( 'okpok =', test);
    let gp = new geo.GeoPoint( 60.0, 30.0 );
    let p3d = geo.geopoint2point3d(gp);
    console.log('p3d =', p3d );
    if ( false === goog.isDefAndNotNull( this.glcontext ) ) {
      console.log('ups! i havn\'t webgl context!');
    }
    this.windowResized();
//    this.gl = this.canvas.getContext('webgl');
//    this.windowResized()
//    var clr3comp = hexToGlColor(this.primitivecolor);
//    this.bufferinfo = twgl.createBufferInfoFromArrays( this.gl, this.arrays );
//    this.programinfo = twgl.createProgramInfo( this.gl, [ this.shaders.vertex, this.shaders.fragment ] );
//    this.gl.useProgram( this.programinfo.program );
//    this.windowResized();
//    requestAnimationFrame( this.drawFigures );
  },
  methods: {
    windowResized: function(e) {
      if (  false === goog.isDefAndNotNull(this.canvas) ) {
        return;
      }
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.$nextTick( () => {
        console.log( this.canvas.width, this.canvas.height, this.canvas.clientWidth, this.canvas.clientHeight );
      });
    }
  },
}
);
