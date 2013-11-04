;xpmanager.user = {};

xpmanager.user.base = new (function($){
  var exec_method = function(method, data, anddothis, object) {
    $.ajax({
      url: '/user/' + method,
      type: 'POST',
      dataType: 'json',
      data: data,
    })
    .done(function(r) {
      anddothis.call(object, r);
    });
  };
  this.reg = function(data, anddothis, object) {
    exec_method('reg', data, anddothis, object);
  };
})(jQuery);

xpmanager.user.reg = new (function($){
  var elem = {
    reg_area: '',
    input_email: '',
    input_password: '',
    input_password_confirm: '',
    btn_submit: '',
  };
  this.init = function(opt) {
    elem.reg_area = opt.reg_area;
    elem.alert_area = elem.reg_area.find($('div#alert_area'));
    elem.input_email = elem.reg_area.find($('input#input_email'));
    elem.input_password = elem.reg_area.find($('input#input_password'));
    elem.input_password_confirm = elem.reg_area.find($('input#input_password_confirm'));
    elem.btn_submit = elem.reg_area.find($('button#submit'));
    btn_init();
  };
  var btn_init = function() {
    elem.btn_submit.unbind().click(function(event) {
      var password_val = elem.input_password.val();
      var password_confirm_val = elem.input_password_confirm.val();
      var email_val = elem.input_email.val();
      if (-1 == email_val.search(/^[^@]+@[^@\.]+\.[^@]+$/)) {
        xpmanager.alert.create({
          type: 'danger',
          message: 'email format wrong',
          container: elem.alert_area
        });
        return false;
      };
      if (password_val != password_confirm_val) {
        xpmanager.alert.create({
          type: 'danger',
          message: 'Password input not same',
          container: elem.alert_area
        });
        return false;
      };
    });
  };
})(jQuery);

xpmanager.user.active = new (function($) {
  this.init = function(opt) {

  };
})(jQuery);