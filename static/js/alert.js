;xpmanager.alert = new (function($) {
  var _default = {
    type: 'info',
    message: 'alert message missing',
    time: 3,
    container: $('body')
  };
  var create_base_dom = function(type) {
    var type_str = 'alert-' + type;
    return $('<div></div>').addClass('alert  ' + type_str);
  };
  this.create = function(opt) {
    var option = $.extend({}, _default, opt);
    var dom = create_base_dom(option.type);
    dom.html(option.message);
    option.container.append(dom);
    dom.fadeIn();
    setTimeout(function() {
      dom.fadeOut(function(){
        this.remove();
      });
    }, option.time*1000);
  };
})(jQuery);