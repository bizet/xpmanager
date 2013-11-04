import web, os
from configobj import ConfigObj

conf = ConfigObj(os.path.join(os.path.dirname(os.path.realpath(__file__)), '../config.ini'))
mail = conf['MAIL']
web.config.smtp_server = mail['SERVER']
web.config.smtp_port = mail['PORT']
web.config.smtp_username = mail['USER']
web.config.smtp_password = mail['PASS']

def send(f, t, subject, message, cc='', bcc=''):
  web.sendmail(f, t, subject, message, cc=cc, bcc=bcc)