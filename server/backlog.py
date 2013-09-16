from db_info import db_xpmanager

class Backlog:
	def __init__(self):
		pass

	def add_new_story(self, i):
		max_order = list(db_xpmanager.query('''
			SELECT MAX(order_num) as max_order
				from backlog
				where project_id = %d''' % int(i.project_id)))[0].max_order
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
			SELECT 	backlog.id as id, 
							backlog.name as name, 
							backlog.parent_id as parent_id, 
							backlog.market_value as market_value, 
							risk.name as risk, 
							status.name as status, 
							backlog.create_time as create_time,
							backlog.order_num as order_num
				FROM 	backlog, project, risk, status
				WHERE backlog.risk_id = risk.id 
					AND backlog.status_id = status.id
					AND project_id = %d
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


