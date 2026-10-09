# Minimal entrypoint for Google App Engine Python 3 runtime
# Static handlers in app.yaml intercept and serve all web traffic from dist/

def app(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/plain')])
    return [b'Static site active']
