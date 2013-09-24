;xpmanager.story = new (function($, project_id) {
  var defaults = {
    story_display_area: ''
  };
  this.init = function(opt) {
    var option = $.extend(defaults, opt);
    display.init(option);
    xpmanager.backlog.update_backlog(function(story_list) {
      display.display(story_list);
    }, display);
  };

  var display = new (function() {
    var option;
    var elem = {
      table_dom: $('<table></table>'),
      table_body_dom: $('<body></body>'),
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
            $('<td></td>').html('Requirement'),
            $('<td></td>').html('Market Value'),
            $('<td></td>').html('Risk'),
            $('<td></td>').html('Create Time'),
            $('<td></td>').html('Status'),
            $('<td></td>').html('')
          )
        ),
        elem.table_body_dom
      );
      display_area.append(elem.table_dom);
    };
    this.display = function(story_list) {
      for (var i = 0; i < story_list.length; i++) {
        add_story_line(story_list[i]);
      };
    };
    var add_story_line = function(story) {
      elem.table_body_dom.append(
        $('<tr></tr>').append(
          //$('<td></td>')
        )
      );
    };
  })();
})(jQuery, xpmanager.project_id);

