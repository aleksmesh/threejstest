goog.require('goog.math');
goog.require('meteo.m4');
goog.require('meteo.basis');
goog.require('meteo.experiment');

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
//    if ( false === goog.isDefAndNotNull( this.canvas ) ) {
//      console.log('ups! i havn\'t canvas!');
//    }
//    else {
//      this.glcontext = this.canvas.getContext('webgl');
//    }
//    let test = meteo.m4.translation( 10, 11, 12 );
//    let transp = test.getTranspose();
//    console.log( test, transp );
//    test.multiply(0);
//    test = meteo.m4.xrotation( goog.math.toRadians(30) );
//    console.log(test);
//    test.multiply(0);
//    test = meteo.m4.yrotation( goog.math.toRadians(30) );
//    console.log(test);
//    test.multiply(0);
//    test = meteo.m4.zrotation( goog.math.toRadians(30) );
//    console.log(test);
//    test.multiply(0);
//    test = meteo.m4.scaling( 10, 11, 12 );
//    console.log( 'okpok =', test);
//    let gp = new meteo.basis.GeoPoint( 60.0, 30.0 );
//    let p3d = meteo.basis.geopoint2point3d(gp);
//    console.log('p3d =', p3d );
//    if ( false === goog.isDefAndNotNull( this.glcontext ) ) {
//      console.log('ups! i havn\'t webgl context!');
//    }
    this.windowResized();
    let exp = new meteo.experiment( this.canvas );
    exp.latitudes = meteo.experiment.latitudeRings();
    for ( let i = 0; i < exp.latitudes.length; ++i ) {
      exp.latarrays.push( meteo.basis.geoarray2point3drray(exp.latitudes[i]) );
    }
    exp.createProgramInfo( meteo.experiment.defaultVshader(),
                           meteo.experiment.defaultFshader() );
    let lot_of_arrays = [];
    for ( let i = 0; i < exp.latarrays.length; ++i ) {
      let arrays = {
        position: exp.latarrays[i]
      };
      lot_of_arrays.push(arrays);
    }
    let mrot = meteo.experiment.rotmatrix();
    let mper = meteo.experiment.projmatrix();
    let mres = mrot.multiply(mper);
    let okpok = {
      matrix: []
    };
    for ( let i = 0; i < 4; ++i ) {
    for ( let j = 0; j < 4; ++j ) {
      okpok.matrix.push( mres.array_[i][j] );
    }
    }
    let animate = function() {
      exp.glcontext.enable( exp.glcontext.DEPTH_TEST );
      exp.glcontext.clearColor( 1, 1, 1, 1 );
      exp.glcontext.clearDepth( 1.0 );
      exp.glcontext.clear( exp.glcontext.COLOR_BUFFER_BIT | exp.glcontext.DEPTH_BUFFER_BIT );
      const bufferinfo = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[12] );
      exp.glcontext.useProgram( exp.programinfo.program );
      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo );
      twgl.setUniforms( exp.glcontext, okpok );
      twgl.drawBufferInfo( exp.glcontext, bufferinfo, exp.glcontext.LINES  );
//      twgl.setUniforms( programinfo,  );

      requestAnimationFrame(animate);
    };
    animate();
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
