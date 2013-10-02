xpmanager.sprint = new (function($) {
  this.get_sprint = function(anddothis, object) {
    $.ajax({
      url: '/sprint/get',
      type: 'POST',
      dataType: 'json',
    })
    .done(function(sprints) {
      anddothis.call(object, sprints);
    });
  };
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
})(jQuery);
