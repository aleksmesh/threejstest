from aiohttp import web

import aiohttp_jinja2
import jinja2

@aiohttp_jinja2.template('webgl.html')
async def webgl(request):
    context = {}
    response = aiohttp_jinja2.render_template('webgl.html',
                                              request,
                                              context)
    response.headers['Content-Language'] = 'ru'
    return response

@aiohttp_jinja2.template('oneprogram.html')
async def oneprogram(request):
    context = {}
    response = aiohttp_jinja2.render_template('oneprogram.html',
                                              request,
                                              context)
    response.headers['Content-Language'] = 'ru'
    return response
