goog.require('goog.math');
goog.require('meteo.m4');
goog.require('meteo.basis');
goog.require('meteo.experiment');

var webgl = new Vue({
  el: '#experiment',
  data: function() {
    return {
      canvas: null,
      glcontext: null,
      experiment: null,
      lat: 0,
      lon: 0,
      distance: meteo.basis.EARTH_RADIUS*3,
      zrotation: 0,
      xtranslate: 0,
      ytranslate: 0,
      ztranslate: -6,
      fovy: 75,
      near: 1,
      fary: meteo.basis.EARTH_RADIUS*4,
      moveactive: false,
      deltax: 0,
      deltay: 0
    }
  },
  created() {
    window.addEventListener('resize', this.windowResized )
    window.addEventListener('mousedown', this.mouseDown )
    window.addEventListener('mouseup', this.mouseUp )
    window.addEventListener('mousemove', this.mouseMove )
    window.addEventListener('mousewheel', this.mouseWheel )
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResized )
    window.removeEventListener('mousedown', this.mouseDown)
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('mousewheel', this.mouseWheel)
  },
  watch: {
    xrotation: function(val) {
//      console.log('uh', val);
    }
  },
  mounted() {
    this.canvas = this.$refs['glcanvas'];
    this.windowResized();
    this.experiment = new meteo.experiment( this.canvas );
    this.experiment.createProgramInfo( meteo.experiment.defaultVshader(),
                           meteo.experiment.defaultFshader() );
    this.renderWorld();

  },
  methods: {
    windowResized: function(e) {
      if (  false === goog.isDefAndNotNull(this.canvas) ) {
        return;
      }
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },
    mouseDown: function(e) {
      console.log('i\'m pressed');
      this.moveactive = true;
    },
    mouseUp: function(e) {
      console.log('i\'m released!');
      this.moveactive = false;
    },
    mouseMove: function(e) {
      if ( false === this.moveactive ) {
        return;
      }
      this.lon -= e.movementX;
      this.lat += e.movementY;
      requestAnimationFrame( this.renderWorld );
    },
    mouseWheel: function(e) {
      this.distance += Math.sign( e.deltaY )*100000;
      requestAnimationFrame( this.renderWorld );
    },
    renderWorld: function() {
      let model = meteo.experiment.projmatrix( this.fovy,
                                               this.experiment.glcontext.canvas.clientWidth,
                                               this.experiment.glcontext.canvas.clientHeight,
                                               this.near,
                                               this.fary );;
      let view = meteo.experiment.lookat( this.lat, this.lon, this.distance );
      let res = view.multiply(model);
      let uniforms = {
        mvp: [],
      };

      for ( let i = 0; i < 4; ++i ) {
        for ( let j = 0; j < 4; ++j ) {
          uniforms.mvp.push( res.getValueAt( i, j ) );
        }
      }

      this.experiment.glcontext.clearColor( 0.2, 0.2, 0.2, 1 );
      this.experiment.glcontext.clearDepth(1.0);
      this.experiment.glcontext.enable( this.experiment.glcontext.DEPTH_TEST );
      this.experiment.glcontext.enable( this.experiment.glcontext.CULL_FACE);
      this.experiment.glcontext.depthFunc(this.experiment.glcontext.LEQUAL);
//      this.experiment.glcontext.depthFunc(this.experiment.glcontext.NOTEQUAL);
      this.experiment.glcontext.clear( this.experiment.glcontext.COLOR_BUFFER_BIT | this.experiment.glcontext.DEPTH_BUFFER_BIT );
      this.experiment.glcontext.useProgram( this.experiment.programinfo.program );


      const bufferinfo4 = twgl.createBufferInfoFromArrays( this.experiment.glcontext, this.experiment.arrays );
      twgl.setBuffersAndAttributes( this.experiment.glcontext, this.experiment.programinfo, bufferinfo4 );
      twgl.setUniforms( this.experiment.programinfo, uniforms );
      twgl.drawBufferInfo( this.experiment.glcontext, bufferinfo4, this.experiment.glcontext.TRIANGLES );
    }
  },
}
);
