;xpmanager.backlog = new (function($, project_id) {
  var backlog_list = [];
  var defaults = {
    backlog_display_area: '',
    btn_add_new_story: '',
    dlg_story_modify: '',
    default_parent_id: 0,
    default_risk_option: 2,
    default_status_option: 1,
    default_market_value: 1000,
    display_area_width: '750px',
  };
  var delete_story = function(data, anddothis, object) {
    $.ajax({
      url: '/backlog/delete_story',
      type: 'POST',
      dataType: 'json',
      data: data,
    })
    .done(function(_backlog_list) {
      backlog_list = _backlog_list.sort(function(a, b){return a.order_num - b.order_num});
      anddothis.call(object, backlog_list);
    });
  }
  var add_new_story = function(data, anddothis, object) {
    $.ajax({
      url: '/backlog/add_new_story',
      type: 'POST',
      dataType: 'json',
      data: data,
    })
    .done(function(_backlog_list) {
      backlog_list = _backlog_list.sort(function(a, b){return a.order_num - b.order_num});
      anddothis.call(object, backlog_list);
    });
  };
  var update_backlog = function(anddothis, object) {
    $.ajax({
      url: '/backlog/get_by_project_id',
      type: 'POST',
      dataType: 'json',
      data: {
        project_id: project_id
      },
    })
    .done(function(_backlog_list) {
      backlog_list = _backlog_list.sort(function(a, b){return a.order_num - b.order_num});
      anddothis.call(object, backlog_list);
    });
  };
  var change_order = function(order, anddothis, object) {
    $.ajax({
      url: '/backlog/change_order',
      type: 'POST',
      dataType: 'json',
      data: {
        project_id: project_id,
        order: order
      },
    })
    .done(function(_backlog_list) {
      backlog_list = _backlog_list.sort(function(a, b){return a.order_num - b.order_num});
      anddothis.call(object, backlog_list);
    });
  };
  
  
  this.init = function(opt) {
    var option = $.extend(defaults, opt);
    backlog_display.init(option);
    update_backlog(backlog_display.display, this);
    backlog_modify.init(option);
  };

  var backlog_modify = new (function() {
    var btn_add_new_story;
    var dlg_story_modify;
    var dlg_elements = {};
    var btn_split_story_group = [];

    this.init = function(opt) {
      btn_add_new_story = opt.btn_add_new_story;
      dlg_story_modify = opt.dlg_story_modify;
      dlg_elements = {
        title: dlg_story_modify.find($('.modal-title')),
        select_risk: dlg_story_modify.find($('#select_risk')),
        select_status: dlg_story_modify.find($('#select_status')),
        select_parent_id: dlg_story_modify.find($('#select_parent_id')),
        input_market_value: dlg_story_modify.find($('#input_market_value')),
        btn_confirm: dlg_story_modify.find($('#btn_confirm')),
        input_requirement: dlg_story_modify.find($('#input_requirement')),
        input_market_value: dlg_story_modify.find($('#input_market_value')),
      }
      btn_split_story_group = $('._parent_story_line span.btn_split_story');
      btn_init(opt);
      dialog_init(opt);
    };
    var btn_init = function(opt) {
      btn_add_new_story.click(function(event) {
        add_dialog_init(opt);
        dlg_story_modify.modal('show');
      });
    };
    this.btn_split_story_click = function(opt, parent_id) {      
      split_story_dialog_init(opt, parent_id);
      dlg_story_modify.modal('show');
    };
    this.btn_delete_story_click = function(opt, story_id) {
      delete_story({
          project_id: project_id,
          id: story_id
        }, function(backlog_list){
          backlog_display.display(backlog_list);
        }, backlog_display);
    };
    var dialog_init = function(opt) {
      /* get parent story list */
      update_backlog(select_parent_id_init, this);
      /* get risk_option list */
      xpmanager.options.risk.get_risk_options(select_risk_init, this);
      /* get status_option list */
      xpmanager.options.status.get_status_options(select_status_init, this);
    };
    var select_parent_id_init = function(backlog_list) {
      dlg_elements.select_parent_id.html('');
      var parents = [];
      for (var i = 0; i < backlog_list.length; i++) {
        if (backlog_list[i].parent_id == 0) {
          parents.push(backlog_list[i]);
        }
      }
      for (var i = 0; i < parents.length; i++) {
        dlg_elements.select_parent_id.append(
          $('<option></option>').html(parents[i].order_num + '. ' + parents[i].name).attr('value', parents[i].id)
        );
      }
    };
    var select_risk_init = function(risk_options) {
      dlg_elements.select_risk.html('');
      for (var i = 0; i < risk_options.length; i++) {
        dlg_elements.select_risk.append(
          $('<option></option>').html(risk_options[i].name).attr('value', risk_options[i].id)
        );
      }
    };
    var select_status_init = function(status_options) {
      dlg_elements.select_status.html('');
      for (var i = 0; i < status_options.length; i++) {
        dlg_elements.select_status.append(
          $('<option></option>').html(status_options[i].name).attr('value', status_options[i].id)
        );
      }
    };
    var split_story_dialog_init = function(opt, parent_id) {
      select_parent_id_init(backlog_list);
      set_dialog_title('Split Story');
      dlg_elements.select_parent_id.val(parent_id);
      dlg_elements.select_parent_id.parent().show();
      dlg_elements.select_parent_id.attr('disabled', 'disabled');
      dlg_elements.select_status.val(opt.default_status_option);
      dlg_elements.select_status.parent().hide();
      dlg_elements.select_risk.val(opt.default_risk_option);
      dlg_elements.input_market_value.val(opt.default_market_value);
      dlg_elements.input_requirement.val('');
      dlg_elements.btn_confirm.html('Save Changes').unbind().click(function(event) {
        add_new_story({
          project_id: project_id,
          parent_id: dlg_elements.select_parent_id.val(),
          name: dlg_elements.input_requirement.val(),
          market_value: dlg_elements.input_market_value.val(),
          risk_id: dlg_elements.select_risk.val(),
          status_id: dlg_elements.select_status.val(),
        }, function(backlog_list){
          backlog_display.display(backlog_list);
          dlg_story_modify.modal('hide');
        }, backlog_display);
      });
    };
    var add_dialog_init = function(opt) {
      select_parent_id_init(backlog_list);
      set_dialog_title('Add new story');
      dlg_elements.select_parent_id.val(opt.default_parent_id);
      dlg_elements.select_parent_id.parent().hide();
      dlg_elements.select_status.val(opt.default_status_option);
      dlg_elements.select_status.parent().hide();
      dlg_elements.select_risk.val(opt.default_risk_option);
      dlg_elements.input_market_value.val(opt.default_market_value);
      dlg_elements.input_requirement.val('');
      dlg_elements.btn_confirm.html('Save Changes').unbind().click(function(event) {
        add_new_story({
          project_id: project_id,
          parent_id: 0,
          name: dlg_elements.input_requirement.val(),
          market_value: dlg_elements.input_market_value.val(),
          risk_id: dlg_elements.select_risk.val(),
          status_id: dlg_elements.select_status.val(),
        }, function(backlog_list){
          backlog_display.display(backlog_list);
          dlg_story_modify.modal('hide');
        }, backlog_display);
      });
      //dlg_story_modify.find($('#select_parent_id')).attr('disabled', 'true');
    };
    var set_dialog_title = function(title) {
      dlg_elements.title.html(title);
    };
  })();

  /**
  backlog display class
  **/
  var backlog_display = new (function() {
    var option;
    var story_display_head = 
      $('<thead id="head_area"></tr>').append(
        $('<tr></tr>').css('width', '100%').append(
          $('<td class="_td"></td>').css('width', '5%').html(''),
          $('<td class="_td"></td>').css('width', '45%').append($('<label></label>').html('Requirement')),
          $('<td class="_td"></td>').css('width', '15%').html('Market Value'),
          $('<td class="_td"></td>').css('width', '7%').html('Risk'),
          $('<td class="_td"></td>').css('width', '12%').html('Create Time'),
          $('<td class="_td"></td>').css('width', '8%').html('Status'),
          $('<td class="_td"></td>').css('width', '8%').html('')
        )
      );
    var story_display_area = $('<tbody id="body_area"></tbody>');
    var display_area;
    this.init = function(opt) {
      option = opt;
      display_area = opt.backlog_display_area;
      display_area_init(opt);
    };
    var update_story_display = function(backlog_list) {
      story_display_area.html('');
      for (var i = 0; i < backlog_list.length; i++) {
        if (backlog_list[i].parent_id == 0) {
          var sub_stories = [];
          for (var j = 0; j < backlog_list.length; j++) {
            if (backlog_list[j].parent_id == backlog_list[i].id) {
              sub_stories.push(backlog_list[j]);
            }
          };
          add_new_story(backlog_list[i], sub_stories);
        };
      }
    };
    this.display = function(backlog_list) {
      var _this = this;
      update_story_display(backlog_list);
      story_display_area.dragsort("destroy");
      story_display_area.dragsort({
        itemSelector: '#body_area > tr',
        dragSelectorExclude: 'span',
        placeHolderTemplate: '',
        dragEnd: function() {
          var order = [];
          $.each($(this).parent().children(), function(index, val) {
            if ($(this).attr('index')) {
              order.push($(this).attr('index'));
            }
          });
          change_order(order.join(","), update_story_display, this);
        }
      });
    };
    var display_area_init = function(opt) {
      var table_dom = $('<table></table>').css('width', '100%');
      table_init(table_dom);
      display_area.html('').css('width', opt.display_area_width).append(table_dom);
    };
    var table_init = function(area) {
      area.append(
          story_display_head,
          story_display_area
      );
    };
    var add_new_story = function(story, sub_stories) {
      var story_line = $('<tr class="_story_line"></tr>').css('width', '100%').attr('index', story.id);
      var story_table = $('<table></table>').css('width', '100%')
      story_display_area.append(
        story_line.append($('<td colspan="7"></td>').append(
          story_table.append(
            $('<tr class="_parent_story_line"></tr>').css('width', '100%').append(
              $('<td class="_td"></td>').css('width', '5%').html(story.order_num),
              $('<td class="_td"></td>').css('width', '45%').html(story.name),
              $('<td class="_td"></td>').css('width', '15%').html(story.market_value),
              $('<td class="_td"></td>').css('width', '7%').html(story.risk),
              $('<td class="_td"></td>').css('width', '12%').html(story.create_time),
              $('<td class="_td"></td>').css('width', '8%').html(story.status),
              $('<td class="_td"></td>').css('width', '8%').append(
                $('<span class="glyphicon glyphicon-fullscreen btn_split_story" title="split story"></span>').click(function(event) {
                  backlog_modify.btn_split_story_click(option, story.id);
                }),
                $('<span class="glyphicon glyphicon-remove btn_delete_story" title="delete story"></span>').click(function(event) {
                  $(this).tooltip('destroy');
                  backlog_modify.btn_delete_story_click(option, story.id);
                })
              )
            )
          )
        ))
      );
      for (var i = 0; i < sub_stories.length; i++) {
        (function(i) {
          story_table.append(
            $('<tr class="_sub_story_line"></tr>').css('width', '100%').append(
              $('<td class="_td"></td>').css('width', '5%').html(''),
              $('<td class="_td"></td>').css('width', '45%').html("-> " + sub_stories[i].name),
              $('<td class="_td"></td>').css('width', '15%').html(sub_stories[i].market_value),
              $('<td class="_td"></td>').css('width', '7%').html(sub_stories[i].risk),
              $('<td class="_td"></td>').css('width', '12%').html(sub_stories[i].create_time),
              $('<td class="_td"></td>').css('width', '8%').html(sub_stories[i].status),
              $('<td class="_td"></td>').css('width', '8%').append(
                $('<span class="glyphicon glyphicon-remove btn_delete_story" title="delete story"></span>').click(function(event) {
                  $(this).tooltip('destroy');
                  backlog_modify.btn_delete_story_click(option, sub_stories[i].id);
                })
              )
            )
          )
        })(i);
      }
    };
  })();
})(jQuery, xpmanager.project_id);

