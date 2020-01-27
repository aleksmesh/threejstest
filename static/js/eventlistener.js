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
      xrotation: 0,
      yrotation: 0,
      zrotation: 0,
      xtranslate: 0,
      ytranslate: 0,
      ztranslate: -6,
      fovy: 75,
      near: 1,
      fary: 100,
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

    var colors = [
      [0.4,  1.0,  0.0,  1.0],    // Front face: white
      [1.0,  0.0,  0.0,  1.0],    // Back face: red
      [0.0,  0.6,  0.2,  1.0],    // Top face: green
      [0.7,  0.0,  0.4,  1.0],    // Bottom face: blue
      [0.7,  0.5,  0.0,  1.0],    // Right face: yellow
      [0.7,  0.0,  0.2,  1.0]     // Left face: purple
    ];


    let arrays = {
      position: [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ],
    indices:[
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23    // left
    ],
    color: []
    };
    let arrays2 = {
      position: [
        -2,  0,  0,
         2,  0,  0,
         0, -2,  0,
         0,  2,  0,
         0,  0, -2,
         0,  0,  2,
      ],
      color: [
        1,1,0,1,
        1,1,0,1,
        1,1,0,1,
        1,1,0,1,
        1,1,0,1,
        1,1,0,1,
      ]
    };
    let arrays3 = {
      position: [
      ],
      color: [
      ]
    };
    let r = 3;
    for ( let i = 0; i <= 355; i+= 10 ) {
      let lon0 = i*meteo.basis.DEG2RAD;
      let lond = (i+10)*meteo.basis.DEG2RAD;
      let sinlon0 = Math.sin(lon0);
      let coslon0 = Math.cos(lon0);
      let sinlond = Math.sin(lond);
      let coslond = Math.cos(lond);
      for ( let j = 0; j <= 85; j+=5 ) {
        let lat0 = j*meteo.basis.DEG2RAD;
        let latd = (j+5)*meteo.basis.DEG2RAD;
        let sinlat0 = Math.sin(lat0);
        let coslat0 = Math.cos(lat0);
        let sinlatd = Math.sin(latd);
        let coslatd = Math.cos(latd);
        let x = r*coslat0*sinlon0;
        let y = r*sinlat0;
        let z = r*coslat0*coslon0;
        arrays3.position.push(x);
        arrays3.position.push(y);
        arrays3.position.push(z);
        x = r*coslat0*sinlond;
        z = r*coslat0*coslond;
        arrays3.position.push(x);
        arrays3.position.push(y);
        arrays3.position.push(z);
        x = r*coslatd*sinlon0;
        y = r*sinlatd;
        z = r*coslatd*coslon0;
        arrays3.position.push(x);
        arrays3.position.push(y);
        arrays3.position.push(z);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
        arrays3.color.push(lat0/(Math.PI/2),lon0/(Math.PI*2),0,1);
      }
    }

    for (j=0; j<6; j++) {
      var c = colors[j];

      for (var i=0; i<4; i++) {
        arrays['color'] = arrays['color'].concat(c);
      }
    }

    let vu = this;
    let animate = function() {
      let model = meteo.experiment.projmatrix( vu.fovy, exp.glcontext.canvas.clientWidth, exp.glcontext.canvas.clientHeight, vu.near, vu.fary );//.;
      let view = meteo.experiment.rotmatrix( (vu.xrotation + vu.deltax ), ( vu.yrotation + vu.deltay ), vu.zrotation );
      view = view.multiply(  meteo.m4.translation( vu.xtranslate, vu.ytranslate,vu.ztranslate) );
      let res = view.multiply(model);
      let uniforms = {
        mvp: [],
      };

      for ( let i = 0; i < 4; ++i ) {
        for ( let j = 0; j < 4; ++j ) {
          uniforms.mvp.push( res.getValueAt( i, j ) );
        }
      }

      exp.glcontext.clearColor( 0.2, 0.2, 0.2, 1 );
      exp.glcontext.clearDepth(1.0);
      exp.glcontext.enable( exp.glcontext.DEPTH_TEST );
      exp.glcontext.enable( exp.glcontext.CULL_FACE);
      exp.glcontext.depthFunc(exp.glcontext.LEQUAL);
//      exp.glcontext.depthFunc(exp.glcontext.NOTEQUAL);
      exp.glcontext.clear( exp.glcontext.COLOR_BUFFER_BIT | exp.glcontext.DEPTH_BUFFER_BIT );
      exp.glcontext.useProgram( exp.programinfo.program );

      const bufferinfo = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[13] );
      const bufferinfo2 = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[9] );
      const bufferinfo3 = twgl.createBufferInfoFromArrays( exp.glcontext, arrays );

      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo3 );
      twgl.setUniforms( exp.programinfo, uniforms );
      twgl.drawBufferInfo( exp.glcontext, bufferinfo3, exp.glcontext.TRIANGLES );

      const bufferinfo4 = twgl.createBufferInfoFromArrays( exp.glcontext, arrays3 );
      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo4 );
      twgl.setUniforms( exp.programinfo, uniforms );
      twgl.drawBufferInfo( exp.glcontext, bufferinfo4, exp.glcontext.TRIANGLES );

      requestAnimationFrame(animate);
    };
    animate();
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
//      this.xrotation += this.deltax;
//      this.yrotation += this.deltay;
//      this.deltax = 0;
//      this.deltay = 0;
    },
    mouseMove: function(e) {
      if ( false === this.moveactive ) {
        return;
      }
      this.xrotation += e.movementY;
      this.yrotation += e.movementX;
      if ( 45 < this.xrotation ) {
        this.xrotation = 45;
      }
      if ( -45 > this.xrotation ) {
        this.xrotation = -45;
      }
//      console.log('i\'m moved!', this.deltax, this.deltay, e.movementX, e.movementY );
    },
    mouseWheel: function(e) {
      this.fovy += Math.sign( e.deltaY )*1.8;
      console.log( e.deltaY );
    }
  },
}
);
