from db_info import db_xpmanager

class Sprint:
  def __init__(self):
    pass
  def get_available(self, i):
    sprint_list = list(db_xpmanager.select('sprint', where='end_time > NOW()'))
    return sprint_list