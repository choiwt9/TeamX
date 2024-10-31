
// 입력한 아이디가 있는지 검사하고 있으면 인증 페이지로 이동
$(function() {
  const idCheck = () => {
    let idCheckAlert = $('#id-check-alert');
    let form = $('<form>', {
      method: 'POST',
      action: '/password/recover/second'
    });
    $.ajax({
      url: '/id/check',
      type: 'POST',
      data: {userId: $('#id-input').val()},
      success: (result) => {
        if(result == 1) {
          idCheckAlert.removeClass('error-message');
          idCheckAlert.addClass('success-message');
          idCheckAlert.text('');

          let input = $('<input>', {
            type: 'hidden',
            value: $('#id-input').val(),
            name: 'userId'
          });
          form.append(input);
          form.appendTo('body').submit();
        } else {
          idCheckAlert.removeClass('success-message');
          idCheckAlert.addClass('error-message');
          idCheckAlert.text('일치하는 아이디가 없습니다. 다시 입력해주세요.');
        }
      }
    });
  }
  $('#next-btn').click(idCheck);
});

$(function() {
  $('#find-id-btn').click(function() {
    window.location.href="/id/recover";
  });

});