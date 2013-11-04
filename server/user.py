from db_info import db_xpmanager
import hashlib, md5, random
import mail

class User:
  def __init__(self):
    pass
  def reg(self, i):
    email = i.email
    password = hashlib.md5(i.password).hexdigest()
    authen_key = hashlib.md5(email + str(random.randint(0, 100))).hexdigest()[:8]
    db_xpmanager.insert('user', 
      email = email,
      password = password
      authen_key = authen_key)
    msg = '''
    <html>
      <body>
      <p>
      Hi %s,
      </p>
      <p>
          Welcome use <strong><i>XP Manager</i></strong>, your authen key is <storng><i>%s</i></strong>
      </p>
    ''' % (email.split('@')[0], authen_key)
    mail.send('admin@xpmanager.com', email, '[xpmanager] user active', msg)
