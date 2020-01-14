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
      ztranslate: 0,
    }
  },
  created() {
    window.addEventListener('resize', this.windowResized )
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResized )
  },
  watch: {
    xrotation: function(val) {
      console.log('uh', val);
    }
  },
  mounted() {
    this.canvas = this.$refs['glcanvas'];
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

    let arrays = {
      position: [
      // Передняя грань
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      
      // Задняя грань
      -1.0, -1.0, -1.0,
      -1.0,  1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0, -1.0, -1.0,
      
      // Верхняя грань
      -1.0,  1.0, -1.0,
      -1.0,  1.0,  1.0,
       1.0,  1.0,  1.0,
       1.0,  1.0, -1.0,
      
      // Нижняя грань
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0, -1.0,  1.0,
      -1.0, -1.0,  1.0,
      
      // Правая грань
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,
       1.0,  1.0,  1.0,
       1.0, -1.0,  1.0,
      
      // Левая грань
      -1.0, -1.0, -1.0,
      -1.0, -1.0,  1.0,
      -1.0,  1.0,  1.0,
      -1.0,  1.0, -1.0
    ],
    indices:[
      0,  1,  2,      0,  2,  3,    // front
      4,  5,  6,      4,  6,  7,    // back
      8,  9,  10,     8,  10, 11,   // top
      12, 13, 14,     12, 14, 15,   // bottom
      16, 17, 18,     16, 18, 19,   // right
      20, 21, 22,     20, 22, 23    // left
    ],
    color: [
      0.0,  0.0,  0.0,  1.0,    // Front face: white
      1.0,  0.0,  0.0,  1.0,    // Back face: red
      1.0,  1.0,  0.0,  1.0,    // Top face: green
      0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
      1.0,  1.0,  0.0,  1.0,    // Right face: yellow
      1.0,  0.0,  1.0,  1.0,     // Left face: purple
      1.0,  0.0,  0.0,  1.0,    // Front face: white
      0.0,  0.0,  0.0,  1.0,    // Back face: red
      0.0,  1.0,  0.0,  1.0,    // Top face: green
      0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
      1.0,  1.0,  0.0,  1.0,    // Right face: yellow
      1.0,  0.0,  1.0,  1.0,     // Left face: purple
      1.0,  0.0,  0.0,  1.0,    // Front face: white
      0.0,  0.0,  0.0,  1.0,    // Back face: red
      0.0,  1.0,  0.0,  1.0,    // Top face: green
      0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
      1.0,  1.0,  0.0,  1.0,    // Right face: yellow
      1.0,  0.0,  1.0,  1.0,     // Left face: purple
      0.0,  0.0,  0.0,  1.0,    // Front face: white
      1.0,  0.0,  0.0,  1.0,    // Back face: red
      0.0,  1.0,  0.0,  1.0,    // Top face: green
      0.0,  0.0,  1.0,  1.0,    // Bottom face: blue
      1.0,  1.0,  0.0,  1.0,    // Right face: yellow
      1.0,  0.0,  1.0,  1.0,     // Left face: purple
    ]
    };



    let vu = this;
    let animate = function() {
      console.log( vu.xtranslate, vu.ytranslate,vu.ztranslate);

//      let mrot = meteo.experiment.projmatrix().multiply( meteo.m4.translation(-3.6, 2,0.70) ).multiply(meteo.experiment.rotmatrix()).multiply( meteo.m4.scaling(0.2,0.2,0.2) );
      let mrot = meteo.experiment.projmatrix().multiply(meteo.experiment.rotmatrix( vu.xrotation, vu.yrotation, vu.zrotation )).multiply(
        meteo.m4.translation( vu.xtranslate, vu.ytranslate,vu.ztranslate)        
        ).multiply( meteo.m4.scaling(0.2,0.2,0.2) );
      let mper = meteo.experiment.projmatrix();
      let mres = mrot.multiply(mper);
      let lookat = meteo.experiment.lookat();
      let viewproj = mper.multiply(lookat);
      let uniforms = {
        matr: []
      };
      for ( let i = 0; i < 4; ++i ) {
        for ( let j = 0; j < 4; ++j ) {
          uniforms.matr.push( mrot.getValueAt( i, j ) );
//          uniforms.matr.push( viewproj.getValueAt( i, j ) );
        }
      }

      exp.glcontext.enable( exp.glcontext.DEPTH_TEST );
      exp.glcontext.clearColor( 1, 1, 1, 1 );
//      exp.glcontext.clearDepth( 1.0 );
      exp.glcontext.clear( exp.glcontext.COLOR_BUFFER_BIT | exp.glcontext.DEPTH_BUFFER_BIT );
      const bufferinfo = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[13] );
      const bufferinfo2 = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[9] );
      const bufferinfo3 = twgl.createBufferInfoFromArrays( exp.glcontext, arrays );
//      twgl.createUniformSetters( exp.glcontext, exp.programinfo.program );
      exp.glcontext.useProgram( exp.programinfo.program );
      twgl.setUniforms( exp.programinfo, uniforms );
//      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo );
//      twgl.drawBufferInfo( exp.glcontext, bufferinfo, exp.glcontext.LINES );
//      twgl.drawBufferInfo( exp.glcontext, bufferinfo, exp.glcontext.LINES );

      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo3 );
      twgl.drawBufferInfo( exp.glcontext, bufferinfo3, exp.glcontext.TRIANGLES );
//      twgl.drawBufferInfo( exp.glcontext, bufferinfo, exp.glcontext.TRIANGLES );
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
