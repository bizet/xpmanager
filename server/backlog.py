from db_info import db_xpmanager

class Backlog:
  def __init__(self):
    pass

  def delete_story(self, i):
    story = db_xpmanager.select('backlog',
      where = 'id = %d and project_id = %d' % (int(i.id), int(i.project_id)))[0]
    if story.parent_id == 0:
      db_xpmanager.delete('backlog',
        where = 'parent_id = %d' % int(story.id))
    db_xpmanager.delete('backlog',
      where = 'id = %d' % int(story.id))
    return self.get_by_project_id(i)

  def add_new_story(self, i):
    if int(i.parent_id) == 0:
      if_parent = 'and parent_id = 0' 
    else:
      if_parent = 'and parent_id <> 0'
    max_order = list(db_xpmanager.query('''
      SELECT MAX(order_num) as max_order
        from backlog
        where project_id = %d %s''' % (int(i.project_id), if_parent)))[0].max_order
    db_xpmanager.insert('backlog',
      project_id = i.project_id,
      parent_id = i.parent_id,
      name = i.name,
      market_value = i.market_value,
      risk_id = i.risk_id,
      status_id = i.status_id,
      order_num = int(max_order) + 1
      )
    return self.get_by_project_id(i)

  def get_by_project_id(self, i):
    backlog_list = list(db_xpmanager.query('''
      SELECT  backlog.id AS id, 
              backlog.name AS name, 
              backlog.parent_id AS parent_id, 
              backlog.market_value AS market_value, 
              risk.name AS risk, 
              status.name AS status, 
              backlog.status_id AS status_id,
              backlog.create_time AS create_time,
              backlog.order_num AS order_num,
              backlog.sprint_id AS sprint_id,
              sprint.count AS sprint_count
        FROM  backlog 
   LEFT JOIN  sprint   ON  backlog.sprint_id = sprint.id
   LEFT JOIN  project  ON  backlog.project_id = project.id
   LEFT JOIN  risk     ON  backlog.risk_id = risk.id
   LEFT JOIN  status   ON  backlog.status_id = status.id
       WHERE  backlog.project_id = %d
          ''' % (int(i.project_id))))
    return backlog_list

  def change_order(self, i):
    order = i.order.split(',')
    project_id = i.project_id
    new_order = 1
    for n in order:
      if n == '': continue
      db_xpmanager.update('backlog', 
        where = 'id = %d AND project_id = %d' % (int(n), int(project_id)), 
        order_num = new_order)
      new_order += 1
    return self.get_by_project_id(i)

  def change_sprint(self, i): 
    change_story_id = i.story_id
    project_id = i.project_id
    sprint_id = i.sprint_id
    db_xpmanager.update('backlog',
      where = 'id = %d AND project_id = %d' % (int(change_story_id), int(project_id)),
      sprint_id = int(sprint_id))
    return self.get_by_project_id(i)


