$(function() {
  let registerKey = $('#registerKey').val();
  let alertMsg = $("#alertMsg").val();
  let form = $('<form>', {
      action: '/user/register/google',
      method: 'post'
    });
    let input = $('<input>', {
      id: 'translate-input',
      name: 'registerKey',
      value: $("#registerKey").val()
    })
    form.append(input);
    form.appendTo($('body'));
    
  let answer = confirm(alertMsg);

  if(answer === true) {
    $("#translate-input").val(registerKey);
    form.submit();
  } else if(answer === false) {
    $("#translate-input").val(registerKey + 'not');
    form.submit();

  }
});