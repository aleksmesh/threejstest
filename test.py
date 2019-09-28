from aiohttp import web

from routes.testroute import setup_routes

import aiohttp_jinja2
import jinja2

app = web.Application()
setup_routes(app)
okpok = app.router.add_static('/static/',
                      path=str( 'static'),
                      name='static')

aiohttp_jinja2.setup(app,
    loader=jinja2.FileSystemLoader('templates'))

web.run_app(app, host='0.0.0.0', port=8080)
