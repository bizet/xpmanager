;xpmanager.story = new (function($, project_id) {
  var defaults = {
    story_display_area: ''
  };
  this.init = function(opt) {
    var option = $.extend(defaults, opt, {backlog_display_area: opt.story_display_area});
    display.init(option);
    xpmanager.backlog.update_backlog(function(story_list) {
      display.display(story_list);
    }, display);
  };  

  var display = new (function() {
    var option;
    var elem = {
      table_dom: $('<table></table>'),
      table_body_dom: $('<tbody id="body_area"></tbody>'),
    };
    this.init = function(opt) {
      option = opt;
      option.story_display_area.html('');
      table_init(option.story_display_area);
    };
    var table_init = function(display_area) {
      elem.table_dom.html('').append(
        $('<thead></thead>').append(
          $('<tr></tr>').append(
            $('<th class="_td"></th>').css('width', '5%').html(''),
            $('<th class="_td"></th>').css('width', '45%').html('Requirement'),
            $('<th class="_td"></th>').css('width', '15%').html('Market Value'),
            $('<th class="_td"></th>').css('width', '7%').html('Risk'),
            $('<th class="_td"></th>').css('width', '12%').html('Create Time'),
            $('<th class="_td"></th>').css('width', '8%').html('Status'),
            $('<th class="_td"></th>').css('width', '8%').html('')
          )
        ),
        elem.table_body_dom
      );
      display_area.append(elem.table_dom);
    };
    this.display = function(story_list) {
      var _this = this;
      update_story_display(story_list);
      elem.table_body_dom.dragsort("destroy");
      elem.table_body_dom.dragsort({
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
          xpmanager.backlog.change_order(order.join(","), update_story_display, this);
        }
      });
    };
    var update_story_display = function(story_list) {
      elem.table_body_dom.html('');
      var sub_story_list = new Array();
      for (var i = 0; i < story_list.length; i++) {
        if (parseInt(story_list[i].parent_id) != 0) {
          sub_story_list.push(story_list[i]);
        }
      };
      for (var i = 0; i < sub_story_list.length; i++) {
        add_story_line(sub_story_list[i]);
      };
    };
    var add_story_line = function(story) {
      elem.table_body_dom.append(
        $('<tr></tr>').attr('index', story.id).append(
          $('<td class="_td"></td>').css('width', '5%').html(story.order_num),
          $('<td class="_td"></td>').css('width', '45%').html(story.name),
          $('<td class="_td"></td>').css('width', '15%').html(story.market_value),
          $('<td class="_td"></td>').css('width', '7%').html(story.risk),
          $('<td class="_td"></td>').css('width', '12%').html(story.create_time),
          $('<td class="_td"></td>').css('width', '8%').html(story.status),
          $('<td class="_td"></td>').css('width', '8%').html('')
        )
      );
    };
  })();
})(jQuery, xpmanager.project_id);

