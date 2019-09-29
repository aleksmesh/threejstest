from views.testview import index
from views.webgl import webgl


def setup_routes(app):
    app.router.add_get('/', index)
    app.router.add_get('/webgl', webgl)
