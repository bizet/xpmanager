;xpmanager.options = {};

xpmanager.options.risk = new (function($) {
  this.get_risk_options = function(anddothis, object) {
    $.ajax({
      url: '/risk/get',
      type: 'POST',
      dataType: 'json',
    })
    .done(function(risk_options) {
      anddothis.call(object, risk_options);
    });
  };
})(jQuery);

xpmanager.options.status = new (function($) {
  this.get_status_options = function(anddothis, object) {
    $.ajax({
      url: '/status/get',
      type: 'POST',
      dataType: 'json',
    })
    .done(function(status_options) {
      anddothis.call(object, status_options);
    });
  };
})(jQuery);