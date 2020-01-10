goog.require('goog.math.Matrix');
goog.require('meteo');

goog.provide('meteo.m4');
goog.provide('meteo.m4.translation');
goog.provide('meteo.m4.xrotation');
goog.provide('meteo.m4.yrotation');
goog.provide('meteo.m4.zrotation');
goog.provide('meteo.m4.scaling');
goog.provide('meteo.m4.perspective');

meteo.m4.translation = function( tx, ty, tz, opt_m ) {//  1,  0,  0,  0,
    let m = opt_m || new goog.math.Matrix( 4, 4 );    //  0,  1,  0,  0,
    m.setValueAt( 0, 0, 1 );                          //  0,  0,  1,  0,
    m.setValueAt( 1, 1, 1 );                          //  tx, ty, tz, 1,
    m.setValueAt( 2, 2, 1 );
    m.setValueAt( 3, 3, 1 );
    m.setValueAt( 3, 0, tx );
    m.setValueAt( 3, 1, ty );
    m.setValueAt( 3, 2, tz );
    return m;
};

meteo.m4.xrotation = function( angle, opt_m ) {       //  1,  0,    0,    0,
    let m = opt_m || new goog.math.Matrix( 4, 4 );    //  0,  cos,  sin,  0,
    let c = Math.cos(angle);                          //  0, -sin,  cos,  0,
    let s = Math.sin(angle);                          //  0,  0,    0,    1,
    m.setValueAt( 0, 0, 1 );
    m.setValueAt( 1, 1, c );
    m.setValueAt( 1, 2, s );
    m.setValueAt( 2, 1,-s );
    m.setValueAt( 2, 2, c );
    m.setValueAt( 3, 3, 1 );
    return m;
};

meteo.m4.yrotation = function( angle, opt_m ) {       //  cos, 0, -sin,  0,
    let m = opt_m || new goog.math.Matrix( 4, 4 );    //  0,   1,  0,    0,
    let c = Math.cos(angle);                          //  sin, 0,  cos,  0,
    let s = Math.sin(angle);                          //  0,   0,  0,    1,
    m.setValueAt( 0, 0, c );
    m.setValueAt( 0, 2,-s );
    m.setValueAt( 1, 1, 1 );
    m.setValueAt( 2, 0, s );
    m.setValueAt( 2, 2, c );
    m.setValueAt( 3, 3, 1 );
    return m;
};

meteo.m4.zrotation = function( angle, opt_m ) {       //  cos, sin, 0, 0,
    let m = opt_m || new goog.math.Matrix( 4, 4 );    // -sin, cos, 0, 0,
    let c = Math.cos(angle);                          //  0,   0,   1, 0,
    let s = Math.sin(angle);                          //  0,   0,   0, 1,
    m.setValueAt( 0, 0, c );
    m.setValueAt( 0, 1, s );
    m.setValueAt( 1, 0,-s );
    m.setValueAt( 1, 1, c );
    m.setValueAt( 2, 2, 1 );
    m.setValueAt( 3, 3, 1 );
    return m;
};

meteo.m4.scaling = function( sx, sy, sz, opt_m ) {    //  sx, 0 , 0,  0,
    let m = opt_m || new goog.math.Matrix( 4, 4 );    //  0,  sy, 0,  0,
    m.setValueAt( 0, 0, sx );                         //  0,  0,  sz, 0,
    m.setValueAt( 1, 1, sy );                         //  0,  0,  0,  1,
    m.setValueAt( 2, 2, sz );
    m.setValueAt( 3, 3, 1 );
    return m;
};

meteo.m4.perspective = function( fov, ratio, near, far, opt_m )
{
  let f = 1.0/Math.tan(fov/2);                  // f/ratio, 0,                          0,   0,
  let range_inv = 1.0/( near - far );           // 0,       f,                          0,   0,
  let m  = opt_m || goog.math.Matrix( 4, 4 );   // 0,       0,  (near + far) * rangeInv,    -1,
  m.setValueAt( 0, 0, f/ratio );                // 0,       0,  near * far * rangeInv * 2,   0
  m.setValueAt( 1, 1, f );
  m.setValueAt( 2, 2, (near + far)*range_inv  );
  m.setValueAt( 2, 3, -1  );
  m.setValueAt( 3, 2, near*far*range_inv*2 );
  return m;
    
    
    
    

};
