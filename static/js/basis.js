goog.provide('meteo');
goog.provide('meteo.basis');
goog.provide('meteo.basis.GeoPoint');
goog.provide('meteo.basis.Point');
goog.provide('meteo.basis.Point3d');

meteo.basis.RVS = 67108864;
meteo.basis.RVSG = 1000000;
meteo.basis.EARTH_RADIUS = 6371000;
meteo.basis.DEG2RAD = Math.PI/180.0;
meteo.basis.RAD2DEG = 180.0/Math.PI;

meteo.basis.Point = function( x, y )
{
  this.x_ = Math.round(x);
  this.y_ = Math.round(y);
};

meteo.basis.Point.prototype.x = function()
{
  return this.x_;
};

meteo.basis.Point.prototype.y = function()
{
  return this.y_;
};

meteo.basis.Point.prototype.setX = function(xx)
{
  this.x_ = xx;
};

meteo.basis.Point.prototype.setY = function(yy)
{
  this.y_ = yy;
};

meteo.basis.Point.prototype.toString = function()
{
  return this.x_ + '_' + this.y_;
};

/*! 
  * \brief Проверка равенства двух точек
* \param pnt - точка (meteo.basis.Point), с которой необходимо проверить равенство
* \return - true - точки совпадают, иначе - false
*/
meteo.basis.Point.prototype.isEqual = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return false;
  }
  if ( this.x() !== pnt.x() ) {
    return false;
  }
  if ( this.y() !== pnt.y() ) {
    return false;
  }
  return true;
};

/*! 
  * \brief Оператор сравнения<
* \param pnt - точка (meteto.basis.Point), с которой выполняется сравнение
* \return - true - в случае, если x() < pnt.x()  и y() < pnt.y, иначе - false 
*/
meteo.basis.Point.prototype.lt = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return false;
  }
  if ( this.x() < pnt.x() && this.y() < pnt.y() ) {
    return true;
  }
  return false;
};

/*! 
  * \brief Оператор сравнения>
* \param pnt - точка (meteto.basis.Point), с которой выполняется сравнение
* \return - true - в случае, если x() > pnt.x()  и y() > pnt.y, иначе - false 
*/
meteo.basis.Point.prototype.gt = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return false;
  }
  if ( this.x() > pnt.x() && this.y() > pnt.y() ) {
    return true;
  }
  return false;
};

meteo.basis.Point.prototype.minus = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return null;
  }
  return new meteo.basis.Point( this.x() - pnt.x(), this.y() - pnt.y() );
};

meteo.basis.Point.prototype.plus = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return null;
  }
  return new meteo.basis.Point( this.x() + pnt.x(), this.y() + pnt.y() );
};

meteo.basis.Point3d = function( x, y, z )
{
  this.x_ = x;
  this.y_ = y;
  this.z_ = z;
};

meteo.basis.geopoint2point3d = function( gp )
{
  var cfi = Math.cos( gp.lat() );
  var sfi = Math.sin( gp.lat() );
  var cla = Math.cos( gp.lon() );
  var sla = Math.sin( gp.lon() );
  var x = meteo.basis.RVS*cfi*sla;
  var y = meteo.basis.RVS*cfi*cla;
  var z = meteo.basis.RVS*sfi;
  var pnt = new meteo.basis.Point3d( x, y, z );
  return pnt;
};

meteo.basis.geoarray2point3drray( gp )
{
  if ( false === goog.isDefAndNotNull(gp) ) {
    return null;
  }
  if ( 0 == gp.length ) {
    return null;
  }
  let p3darray = new Float32Array( gp.length*3 );
  for ( let i = 0; i < gp.length; ++i ) {
    let p3d = geopoint2point3d( gp[i] );
    p3darray[i] = p3d.x_;
    p3darray[i+1] = p3d.y_;
    p3darray[i+2] = p3d.z_;
  };
  return p3darray;
};

meteo.basis.GeoPoint = function( latt, lonn, altt = 0.0 )
{
  this.lat_ = meteo.basis.DEG2RAD*latt;
  this.lon_ = meteo.basis.DEG2RAD*lonn;
  this.alt_ = altt;
};

meteo.basis.GeoPoint.fromRad = function( latt, lonn, altt = 0.0 )
{
  var gp = new meteo.basis.GeoPoint( latt*meteo.basis.RAD2DEG, lonn*meteo.basis.RAD2DEG, altt );
  return gp;
};

meteo.basis.GeoPoint.prototype.toString = function()
{
  var str = '{ lat: ' + this.latDeg().toFixed(2) + ', lon = ' + this.lonDeg().toFixed(2) +' }';
  return str;
};

meteo.basis.GeoPoint.prototype.lat = function()
{
  return this.lat_;
};

meteo.basis.GeoPoint.prototype.lon = function()
{
  return this.lon_;
};

meteo.basis.GeoPoint.prototype.alt = function()
{
  return this.alt_;
};

meteo.basis.GeoPoint.prototype.latDeg = function()
{
  return this.lat_*meteo.basis.RAD2DEG;
};

meteo.basis.GeoPoint.prototype.lonDeg = function()
{
  return this.lon_*meteo.basis.RAD2DEG;
};

meteo.basis.GeoPoint.prototype.setLat = function(lat)
{
  return this.lat_ = lat;
};

meteo.basis.GeoPoint.prototype.setLon = function(lon)
{
  return this.lon_ = lon;
};

meteo.basis.GeoPoint.prototype.setLatDeg = function(lat)
{
  return this.lat_ = lat*meteo.basis.DEG2RAD;
};

meteo.basis.GeoPoint.prototype.setLonDeg = function(lon)
{
  return this.lon_ = lon*meteo.basis.DEG2RAD;
};
