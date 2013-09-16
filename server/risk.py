from db_info import db_xpmanager

class Risk:
  def __init__(self):
    pass
  def get(self, i):
    risk_options = list(db_xpmanager.select('risk'))
    return risk_options