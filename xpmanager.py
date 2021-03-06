import os,sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
import web
from server.jencode import JEncoder
from server.backlog import Backlog
from server.risk import Risk
from server.status import Status
from server.sprint import Sprint
from server.project import Project

urls = (
  '/backlog/(.+)', 'backlog_control',
  '/risk/(.+)', 'risk_control',
  '/status/(.+)', 'status_control',
  '/sprint/(.+)', 'sprint_control',
  '/project/(.+)', 'project_control',
  '/(.+).html.*', 'page',
)

web.config.debug = True
template = web.template.render('static/page/')
page_module = web.template.render('static/page/module')

class page:
  def GET(self, p):
    try:
      f = getattr(template, p)
      paras = {}
      ps = web.ctx.query[1:].split('&')
      for para in ps:
        if '=' not in para: continue
        k, v = para.split('=')
        paras[k] = v
      return f(page_module, paras)
    except Exception, e:
      return Exception, ':', e

class Fac():
  def __init__(self):
    self.c = null
  def POST(self, method):
    f = getattr(self.c, method)
    return JEncoder().encode(f(web.input()))

class backlog_control(Fac):
  def __init__(self):
    self.c = Backlog()

class risk_control(Fac):
  def __init__(self):
    self.c = Risk()

class status_control(Fac):
  def __init__(self):
    self.c = Status()

class sprint_control(Fac):
  def __init__(self):
    self.c = Sprint()

class project_control(Fac):
  def __init__(self):
    self.c = Project()

app = web.application(urls, globals(), autoreload = True)

if __name__ == '__main__':
  app.run()
