xpmanager.project = {};
xpmanager.project.base = new (function($){
  this.get_workflow = function(project_id, anddothis, object) {
    $.ajax({
      url: '/project/get_workflow',
      type: 'POST',
      dataType: 'json',
      data: {
        project_id: project_id
      },
    })
    .done(function(workflow) {
      anddothis.call(object, workflow);
    });
  };
})(jQuery);