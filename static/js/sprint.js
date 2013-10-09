xpmanager.sprint = {};

xpmanager.sprint.status_wall = new (function($, project_id){
  /*
  status_wall_display_area
  sprint_id
  */
  this.init = function(opt) {
    display.init(opt);
    xpmanager.project.base.get_workflow(project_id, function(workflow) {
        display.display(workflow);
      }, display);
  };

  var display = new (function() {
    var sprint_id;
    var elem = {
      status_wall_display_area: '',
    };
    this.init = function(opt) {
      elem.status_wall_display_area = opt.status_wall_display_area;
      sprint_id = opt.sprint_id;
    };
    this.display = function(workflow) {
      status_display_init(workflow);
    };
    var status_display_init = function(workflow) {
      var status_wall_line = $('<tr></tr>');
      elem.status_wall_display_area.html('').append($('<table></table>').append(status_wall_line));
      for (var i = 0; i < workflow.length; i++) {
        status_wall_line.append(create_status_area(workflow[i]), $('<div style="clear:both; display:none"></div>'));
      };
      elem.status_wall_display_area.find($('ul')).dragsort({ 
        dragSelector: "div", 
        dragBetween: true, 
        placeHolderTemplate: "<li class='placeHolder'><div></div></li>",
        dragEnd: function() {
          var story_id = $(this).attr('story_id');
          var status_id = $(this).parent().attr('id').replace('status', '');
          xpmanager.backlog.change_status({
            story_id: story_id,
            status_id: status_id
          }, update_story_display, this);
        }
      });
      xpmanager.backlog.get_by_sprint_id({
        sprint_id: sprint_id
      }, update_story_display, this);
    };
    var create_status_area = function(w) {
      return (
        $('<td></td>').append(
          w.name,
          $('<ul></ul>').attr('id', 'status' + w.id)
        )
      );
    };
    var create_story_item = function(s) {
      return (
        $('<li story_id="' + s.id + '"></li>').append($('<div></div>').html(s.name))
      );
    };
    var update_story_display = function(story_list) {
      elem.status_wall_display_area.find($('ul')).html('');
      for (var i = 0; i < story_list.length; i++) {
        if (story_list[i].sprint_id != sprint_id || story_list[i].parent_id == 0) { continue; };
        elem.status_wall_display_area.find($('ul#status' + story_list[i].status_id)).append(
          create_story_item(story_list[i])
        );
      };
    };
  })();

})(jQuery, xpmanager.project_id);

xpmanager.sprint.burn_down_chart = new (function($, project_id){
  /*
  status_wall_display_area
  sprint_id
  */
  this.init = function(opt) {
    display.init(opt);
    xpmanager.project.base.get_workflow(project_id, function(workflow) {
        display.display(workflow);
      }, display);
  };

  var display = new (function() {
    var sprint_id;
    var elem = {
      status_wall_display_area: '',
    };
    this.init = function(opt) {
      elem.status_wall_display_area = opt.status_wall_display_area;
      sprint_id = opt.sprint_id;
    };
    this.display = function(workflow) {
      status_display_init(workflow);
    };
    var status_display_init = function(workflow) {
      var status_wall_line = $('<tr></tr>');
      elem.status_wall_display_area.html('').append($('<table></table>').append(status_wall_line));
      for (var i = 0; i < workflow.length; i++) {
        status_wall_line.append(create_status_area(workflow[i]), $('<div style="clear:both; display:none"></div>'));
      };
      elem.status_wall_display_area.find($('ul')).dragsort({ 
        dragSelector: "div", 
        dragBetween: true, 
        placeHolderTemplate: "<li class='placeHolder'><div></div></li>",
        dragEnd: function() {
          var story_id = $(this).attr('story_id');
          var status_id = $(this).parent().attr('id').replace('status', '');
          xpmanager.backlog.change_status({
            story_id: story_id,
            status_id: status_id
          }, update_story_display, this);
        }
      });
      xpmanager.backlog.get_by_sprint_id({
        sprint_id: sprint_id
      }, update_story_display, this);
    };
    var create_status_area = function(w) {
      return (
        $('<td></td>').append(
          w.name,
          $('<ul></ul>').attr('id', 'status' + w.id)
        )
      );
    };
    var create_story_item = function(s) {
      return (
        $('<li story_id="' + s.id + '"></li>').append($('<div></div>').html(s.name))
      );
    };
    var update_story_display = function(story_list) {
      elem.status_wall_display_area.find($('ul')).html('');
      for (var i = 0; i < story_list.length; i++) {
        if (story_list[i].sprint_id != sprint_id || story_list[i].parent_id == 0) { continue; };
        elem.status_wall_display_area.find($('ul#status' + story_list[i].status_id)).append(
          create_story_item(story_list[i])
        );
      };
    };
  })();

})(jQuery, xpmanager.project_id);
xpmanager.sprint.base = new (function($) {
  this.get_available_sprint = function(anddothis, object) {
    $.ajax({
      url: '/sprint/get_available',
      type: 'POST',
      dataType: 'json',
    })
    .done(function(sprints) {
      anddothis.call(object, sprints);
    });
  };
  this.choose_dialog = new (function() {
    var elem = {
      dialog_dom: '',
      radio_area: '',
      btn_confirm: '',
      dialog_title: '',
    };
    this.init = function(opt) {
      elem.dialog_dom = opt.sprint_choose_dialog_dom;
      elem.radio_area = elem.dialog_dom.find($('#form_group_choose_sprint'));
      elem.btn_confirm = elem.dialog_dom.find($('#btn_confirm'));
      elem.dialog_title = elem.dialog_dom.find($('h4.modal-title'));
    };
    this.show = function(opt) {
      dialog_init(opt);
      elem.dialog_dom.modal();
    };
    var set_dialog_title = function(title) {
      elem.dialog_title.html(title);
    }
    var dialog_init = function(opt) {
      set_dialog_title(opt.dialog_title);
      elem.btn_confirm.unbind().click(function() {
        var checked_sprint_id = -1;
        elem.radio_area.find('input[name="sprint_radios"]').each(function(){
          if ($(this).is(':checked')) {
            checked_sprint_id = $(this).val();
            return true;
          };
        });
        if (checked_sprint_id == -1) {
          alert('sprint not choosed');
          return false;
        }
        opt.click_fun(checked_sprint_id);
        elem.dialog_dom.modal('hide');
      });
      elem.radio_area.html('');
      elem.radio_area.append(create_radio_dom(0, 'none'));
      xpmanager.sprint.get_available_sprint(function(sprints){
        for (var i = 0; i < sprints.length; i++) {
          elem.radio_area.append(create_radio_dom(sprints[i].id, 'sprint ' + sprints[i].count));
        };
      }, this);
    };
    var create_radio_dom = function(sprint_id, sprint_str) {
      return (
        $('<div class="radio"></div>').append(
          $('<label></label').append(
            $('<input type="radio"></input>').attr({
              'name': 'sprint_radios',
              'id': 'sprint_radios_' + sprint_id,
              'value': sprint_id
            }),
            sprint_str
          )
        )
      );
    }

  })();
})(jQuery);
