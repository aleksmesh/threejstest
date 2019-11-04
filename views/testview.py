from aiohttp import web

import aiohttp_jinja2
import jinja2


@aiohttp_jinja2.template('index.html')
async def index(request):
    context = {}
    response = aiohttp_jinja2.render_template('index.html',
                                              request,
                                              context)
    response.headers['Content-Language'] = 'ru'
    return response
