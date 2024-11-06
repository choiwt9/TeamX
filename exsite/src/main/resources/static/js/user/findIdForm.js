$(function() {
  // 이메일 인증 코드
  $('#submit-email-btn').click(function() {
    let name = $('#email-submit-name').val();
    let email = $('#submit-email').val();
    if(name.length > 1 && email.length > 11) {
      $.ajax({
        url: '/account/recover/auth',
        type: 'post',
        data: {
          name: name,
          email: email
        },
        success: (result) => {
          if(result.status === 'notfound') {
            alert('해당하는 아이디가 없습니다.');
          } else if(result.status === 'success') {
            alert('인증번호가 전송되었습니다.');
            changeEmailInputForm();
          }
        }
      });
    } else {
      alert('올바른 입력인지 확인 바랍니다.');
    }
  });

  // 휴대폰 인증 코드
  $('#submit-phone-btn').click(function() {
    let name = $('#phone-submit-name').val();
    let phone = $('#submit-phone').val();
    if(name.length > 1 && phone.length >= 10) {
      $.ajax({
        url: '/account/recover/auth',
        type: 'post',
        data: {
          name: name,
          phone: phone
        },
        success: (result) => {
          if(result.status === 'notfound') {
            alert('해당하는 아이디가 없습니다.');
          } else if(result.status === 'success') {
            alert('인증번호가 전송되었습니다.');
            changePhoneInputForm();
          }
        }
      });
    } else {
      alert('올바른 입력인지 확인 바랍니다.');
    }
  });

  // 이메일 인증번호 입력 폼으로 변경
  let changeEmailInputForm = () => {
    $('#email-submit-name').attr('type', 'hidden');
    $('#submit-email').attr('type', 'hidden');
    $('#submit-email-btn').off('click');
    $('#submit-email-btn').text('제출');
    $('<input>', {
      id: 'email-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).insertAfter('#submit-email');
    $('#submit-email-btn').on('click', () => {
      sendCertificationEmailNoToServer();
    });
  };

  // 휴대폰 인증번호 입력 폼으로 변경
  let changePhoneInputForm = () => {
    $('#phone-submit-name').attr('type', 'hidden');
    $('#submit-phone').attr('type', 'hidden');
    $('#submit-phone-btn').off('click');
    $('#submit-phone-btn').text('제출');
    $('<input>', {
      id: 'phone-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).insertAfter('#submit-phone');
    $('#submit-phone-btn').on('click', () => {
      sendCertificationPhoneNoToServer();
    });
  };

  // 이메일 인증번호 검증
  const sendCertificationEmailNoToServer = () => {
    if($('#email-auth-no').val().trim() !== '' && $('#email-auth-no').val().length === 6) {
      $('#submit-email-btn').prop('disabled', true);
      $('#submit-email-btn').text('발송 중...');
      $.ajax({
        url: '/account/recover/auth/verify',
        type: 'post',
        data: {
          name: $('#email-submit-name').val(),
          email: $('#submit-email').val(),
          code: $('#email-auth-no').val()
        },
        success: function(result) {
          if(result.status === 'success') {
            $('#submit-email-btn').text('제출');
            sessionStorage.setItem('userId', JSON.stringify(result.userId));
            window.location.href="/id/recover/result";
          } else if(result.status === 'timeout') {
            alert('이메일 인증번호 유효시간이 초과되었습니다.');
            window.location.reload();
          } else if(result.status === 'false') {
            $('#submit-email-btn').prop('disabled', false);
            $('#submit-email-btn').text('제출');
            alert('인증 내용을 다시 확인해주세요');
          }
        }
      });
    } else {
      alert('인증번호가 입력되지 않았습니다.');
      $('#submit-email-btn').prop('disabled', false);
      $('#submit-email-btn').text('제출');
    }
  };

  // 휴대폰 인증번호 검증
  const sendCertificationPhoneNoToServer = () => {
    if($('#phone-auth-no').val().trim() !== '' && $('#phone-auth-no').val().length === 6) {
      $('#submit-phone-btn').prop('disabled', true);
      $('#submit-phone-btn').text('발송 중...');
      $.ajax({
        url: '/account/recover/auth/verify',
        type: 'post',
        data: {
          name: $('#phone-submit-name').val(),
          phone: $('#submit-phone').val(),
          code: $('#phone-auth-no').val()
        },
        success: function(result) {
          if(result.status === 'success') {
            $('#submit-phone-btn').text('제출');
            sessionStorage.setItem('userId', JSON.stringify(result.userId));
            window.location.href="/id/recover/result";
          } else if(result.status === 'timeout') {
            alert('휴대폰 인증번호 유효시간이 초과되었습니다.');
            window.location.reload();
          } else if(result.status === 'false') {
            $('#submit-phone-btn').prop('disabled', false);
            $('#submit-phone-btn').text('제출');
            alert('인증 내용을 다시 확인해주세요');
          }
        }
      });
    } else {
      alert('인증번호가 입력되지 않았습니다.');
      $('#submit-phone-btn').prop('disabled', false);
      $('#submit-phone-btn').text('제출');
    }
  };
});
