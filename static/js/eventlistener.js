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
//      console.log('uh', val);
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
    for ( let i = 0; i <= 175; i+= 5 ) {
      let lon0 = i*meteo.basis.DEG2RAD;
      let lond = (i+5)*meteo.basis.DEG2RAD;
      let sinlon0 = Math.sin(lon0);
      let coslon0 = Math.cos(lon0);
      let sinlond = Math.sin(lond);
      let coslond = Math.cos(lond);
      for ( let j = 0; j <= 85; ++j ) {
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
        x = r*coslat0*sinlon0;
        y = r*sinlat0;
        z = r*coslat0*coslon0;
        arrays3.position.push(x);
        arrays3.position.push(y);
        arrays3.position.push(z);
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
//      console.log( vu.xtranslate, vu.ytranslate,vu.ztranslate);

//      let mrot = meteo.experiment.projmatrix().multiply( meteo.m4.translation(-3.6, 2,0.70) ).multiply(meteo.experiment.rotmatrix()).multiply( meteo.m4.scaling(0.2,0.2,0.2) );
      let proj = meteo.experiment.projmatrix( exp.glcontext.canvas.clientWidth, exp.glcontext.canvas.clientHeight );//.;
      let view = meteo.experiment.rotmatrix( vu.xrotation, vu.yrotation, vu.zrotation );
      view = view.multiply(  meteo.m4.translation( vu.xtranslate, vu.ytranslate,vu.ztranslate) );
//      view = view.multiply(  );
//      view = view.multiply( meteo.m4.scaling(0.2,0.2,0.2) );
//      proj = proj.multiply(view);
//      let mper = meteo.experiment.projmatrix();
//      let mres = mrot.multiply(mper);
//      let lookat = meteo.experiment.lookat();
//      let viewproj = mper.multiply(lookat);
      let uniforms = {
        matr: [],
        huyatr: []
      };

//    const fieldOfView = 75*Math.PI/180; // in radians
//    const aspect = exp.glcontext.canvas.clientWidth/exp.glcontext.canvas.clientHeight;
//    const zNear = 1;
//    const zFar = 100.0;
//    let projectionMatrix = mat4.create();

    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
//    mat4.perspective(projectionMatrix,
//                     fieldOfView,
//                     aspect,
//                     zNear,
//                     zFar);


    projectionMatrix = [];
    for ( let i = 0; i < 4; ++i ) {
      for ( let j = 0; j < 4; ++j ) {
        projectionMatrix.push( proj.getValueAt( i, j ) );
      }
    }

    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    let modelViewMatrix = [];//mat4.create();
    for ( let i = 0; i < 4; ++i ) {
      for ( let j = 0; j < 4; ++j ) {
        modelViewMatrix.push( view.getValueAt( i, j ) );
      }
    }

    // Now move the drawing position a bit to where we want to
    // start drawing the square.

//    mat4.translate(modelViewMatrix,     // destination matrix
//                   modelViewMatrix,     // matrix to translate
//                   [vu.xtranslate, vu.ytranslate, vu.ztranslate]);  // amount to translate
//    mat4.rotate(modelViewMatrix,  // destination matrix
//                modelViewMatrix,  // matrix to rotate
//                vu.zrotation*meteo.basis.DEG2RAD,     // amount to rotate in radians
//                [0, 0, 1]);       // axis to rotate around (Z)
//    mat4.rotate(modelViewMatrix,  // destination matrix
//                modelViewMatrix,  // matrix to rotate
//                vu.xrotation*meteo.basis.DEG2RAD,// amount to rotate in radians
//                [1, 0, 0]);       // axis to rotate around (X)
//    mat4.rotate(modelViewMatrix,  // destination matrix
//                modelViewMatrix,  // matrix to rotate
//                vu.yrotation*meteo.basis.DEG2RAD,// amount to rotate in radians
//                [0, 1, 0]);       // axis to rotate around (X)

      uniforms.matr = projectionMatrix;
      uniforms.huyatr = modelViewMatrix;

//      for ( let i = 0; i < 4; ++i ) {
//        for ( let j = 0; j < 4; ++j ) {
//          uniforms.matr.push( mrot.getValueAt( i, j ) );
////          uniforms.matr.push( viewproj.getValueAt( i, j ) );
//        }
//      }

      exp.glcontext.clearColor( 0.2, 0.2, 0.2, 1 );
      exp.glcontext.clearDepth(1.0);
      exp.glcontext.enable( exp.glcontext.DEPTH_TEST );
//      exp.glcontext.enable( exp.glcontext.CULL_FACE);
      exp.glcontext.depthFunc(exp.glcontext.LEQUAL);
      exp.glcontext.clear( exp.glcontext.COLOR_BUFFER_BIT | exp.glcontext.DEPTH_BUFFER_BIT );
      exp.glcontext.useProgram( exp.programinfo.program );
//      exp.glcontext.clearDepth( 1.0 );
      const bufferinfo = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[13] );
      const bufferinfo2 = twgl.createBufferInfoFromArrays( exp.glcontext, lot_of_arrays[9] );
      const bufferinfo3 = twgl.createBufferInfoFromArrays( exp.glcontext, arrays );
//      twgl.createUniformSetters( exp.glcontext, exp.programinfo.program );
//      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo );
//      twgl.drawBufferInfo( exp.glcontext, bufferinfo, exp.glcontext.LINES );
//      twgl.drawBufferInfo( exp.glcontext, bufferinfo, exp.glcontext.LINES );

      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo3 );
      twgl.setUniforms( exp.programinfo, uniforms );
      twgl.drawBufferInfo( exp.glcontext, bufferinfo3, exp.glcontext.TRIANGLES );

      const bufferinfo4 = twgl.createBufferInfoFromArrays( exp.glcontext, arrays2 );
      twgl.setBuffersAndAttributes( exp.glcontext, exp.programinfo, bufferinfo4 );
      twgl.setUniforms( exp.programinfo, uniforms );
      twgl.drawBufferInfo( exp.glcontext, bufferinfo4, exp.glcontext.LINES );

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
//        console.log( this.canvas.width, this.canvas.height, this.canvas.clientWidth, this.canvas.clientHeight );
      });
    }
  },
}
);
