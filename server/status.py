from db_info import db_xpmanager

class Status:
  def __init__(self):
    pass
  def get(self, i):
    status_options = list(db_xpmanager.select('status'))
    return status_options