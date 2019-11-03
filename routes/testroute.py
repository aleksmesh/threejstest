from views.testview import index
from views.webgl import webgl
from views.webgl import oneprogram


def setup_routes(app):
  app.router.add_get('/', index)
  app.router.add_get('/webgl', webgl)
  app.router.add_get('/oneprogram', oneprogram)
  app.router.add_get('/oneprogram/', oneprogram)
