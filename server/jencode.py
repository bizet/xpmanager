import os,sys
sys.path.append(os.path.dirname(os.path.realpath(__file__)))
import json
import datetime

class JEncoder(json.JSONEncoder):
  def default(self, obj):
    if isinstance(obj, datetime.datetime):
      return str(obj.strftime('%Y-%m-%d'))
    if isinstance(obj, datetime.timedelta):
      return str(obj)
    return json.JSONEncoder.default(self, obj)

