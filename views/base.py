from aiohttp import web

import aiohttp_jinja2
import jinja2

@aiohttp_jinja2.template('base.html')
async def base(request):
    context = {}
    response = aiohttp_jinja2.render_template('base.html',
                                              request,
                                              context)
    response.headers['Content-Language'] = 'ru'
    return response
