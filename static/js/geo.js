goog.provide('geo');
goog.provide('geo.GeoPoint');
goog.provide('geo.Point');
goog.provide('geo.Point3d');

geo.RVS = 67108864;
geo.RVSG = 1000000;
geo.EARTH_RADIUS = 6371000;
geo.DEG2RAD = Math.PI/180.0;
geo.RAD2DEG = 180.0/Math.PI;

geo.Point = function( x, y )
{
  this.x_ = Math.round(x);
  this.y_ = Math.round(y);
};

geo.Point.prototype.x = function()
{
  return this.x_;
};

geo.Point.prototype.y = function()
{
  return this.y_;
};

geo.Point.prototype.setX = function(xx)
{
  this.x_ = xx;
};

geo.Point.prototype.setY = function(yy)
{
  this.y_ = yy;
};

geo.Point.prototype.toString = function()
{
  return this.x_ + '_' + this.y_;
};

/*! 
  * \brief Проверка равенства двух точек
* \param pnt - точка (geo.Point), с которой необходимо проверить равенство
* \return - true - точки совпадают, иначе - false
*/
geo.Point.prototype.isEqual = function( pnt )
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
* \param pnt - точка (meteto.geobasis.Point), с которой выполняется сравнение
* \return - true - в случае, если x() < pnt.x()  и y() < pnt.y, иначе - false 
*/
geo.Point.prototype.lt = function( pnt )
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
* \param pnt - точка (meteto.geobasis.Point), с которой выполняется сравнение
* \return - true - в случае, если x() > pnt.x()  и y() > pnt.y, иначе - false 
*/
geo.Point.prototype.gt = function( pnt )
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

geo.Point.prototype.minus = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return null;
  }
  return new geo.Point( this.x() - pnt.x(), this.y() - pnt.y() );
};

geo.Point.prototype.plus = function( pnt )
{
  if ( false === goog.isDefAndNotNull(pnt) ) {
    console.log('Не определен входной параметр pnt');
    return null;
  }
  return new geo.Point( this.x() + pnt.x(), this.y() + pnt.y() );
};

geo.Point3d = function( x, y, z )
{
  this.x_ = x;
  this.y_ = y;
  this.z_ = z;
};

geo.geopoint2point3d = function( gp )
{
  var cfi = Math.cos( gp.lat() );
  var sfi = Math.sin( gp.lat() );
  var cla = Math.cos( gp.lon() );
  var sla = Math.sin( gp.lon() );
  var x = geo.RVS*cfi*sla;
  var y = geo.RVS*cfi*cla;
  var z = geo.RVS*sfi;
  var pnt = new geo.Point3d( x, y, z );
  return pnt;
};

geo.GeoPoint = function( latt, lonn, altt = 0.0 )
{
  this.lat_ = geo.DEG2RAD*latt;
  this.lon_ = geo.DEG2RAD*lonn;
  this.alt_ = altt;
};

geo.GeoPoint.fromRad = function( latt, lonn, altt = 0.0 )
{
  var gp = new geo.GeoPoint( latt*geo.RAD2DEG, lonn*geo.RAD2DEG, altt );
  return gp;
};

geo.GeoPoint.prototype.toString = function()
{
  var str = '{ lat: ' + this.latDeg().toFixed(2) + ', lon = ' + this.lonDeg().toFixed(2) +' }';
  return str;
};

geo.GeoPoint.prototype.lat = function()
{
  return this.lat_;
};

geo.GeoPoint.prototype.lon = function()
{
  return this.lon_;
};

geo.GeoPoint.prototype.alt = function()
{
  return this.alt_;
};

geo.GeoPoint.prototype.latDeg = function()
{
  return this.lat_*geo.RAD2DEG;
};

geo.GeoPoint.prototype.lonDeg = function()
{
  return this.lon_*geo.RAD2DEG;
};

geo.GeoPoint.prototype.setLat = function(lat)
{
  return this.lat_ = lat;
};

geo.GeoPoint.prototype.setLon = function(lon)
{
  return this.lon_ = lon;
};

geo.GeoPoint.prototype.setLatDeg = function(lat)
{
  return this.lat_ = lat*geo.DEG2RAD;
};

geo.GeoPoint.prototype.setLonDeg = function(lon)
{
  return this.lon_ = lon*geo.DEG2RAD;
};
