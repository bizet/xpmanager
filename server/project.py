from db_info import db_xpmanager

class Project:
  def __init__(self):
    pass
  def get_workflow(self, i):
    workflow_list = []
    workflow = list(db_xpmanager.select('project', where='id = %d' % int(i.project_id)))[0].workflow
    for w in workflow.split(';'):
      s = list(db_xpmanager.select('status', where = 'id = %d' % int(w)))[0]
      workflow_list.append({
        'id': s.id,
        'name': s.name
      })
    return workflow_list