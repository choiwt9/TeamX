$(function() {
  // 이메일 인증 코드 (기존 코드 유지)
  $('#submit-email-btn').click(function() {
    let name = $('#email-submit-name').val();
    let email = $('#submit-email').val();
    $('#submit-email-btn').text('발송 중...');
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
            $('#submit-email-btn').text('인증번호 받기');
          } else if(result.status === 'success') {
            alert('인증번호가 전송되었습니다.');
            changeEmailInputForm();
            $('#submit-email-btn').text('제출');
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
    $('#submit-phone-btn').text('발송 중...');
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
            $('#submit-phone-btn').text('인증번호 받기');
          } else if(result.status === 'success') {
            alert('인증번호가 전송되었습니다.');
            changePhoneInputForm();
            $('#submit-phone-btn').text('제출');
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
    $('<input>', {
      id: 'email-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).insertAfter('#change-with-email-userId');
    $('#submit-email-btn').on('click', () => {
      sendCertificationNoToServer('#email-auth-no', 'email');
    });
  }

  // 휴대폰 인증번호 입력 폼으로 변경
  let changePhoneInputForm = () => {
    $('#phone-submit-name').attr('type', 'hidden');
    $('#submit-phone').attr('type', 'hidden');
    $('#submit-phone-btn').off('click');
    $('<input>', {
      id: 'phone-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).insertAfter('#change-with-phone-userId');
    $('#submit-phone-btn').on('click', () => {
      sendCertificationNoToServer('#phone-auth-no', 'phone');
    });
  }

  const form = $('<form>', {
    action: "/password/change/form",
    method: "POST"
  });

  // 인증번호 서버에 전달 및 검증 함수
  const sendCertificationNoToServer = (authNoSelector, method) => {
    const authNo = $(authNoSelector).val();
    if(authNo.trim() !== '' && authNo.length === 6) {
      const submitBtn = method === 'email' ? $('#submit-email-btn') : $('#submit-phone-btn');
      $.ajax({
        url: '/account/recover/auth/verify',
        type: 'post',
        data: {
          name: method === 'email' ? $('#email-submit-name').val() : $('#phone-submit-name').val(),
          [method]: method === 'email' ? $('#submit-email').val() : $('#submit-phone').val(),
          code: authNo
        },
        success: function(result) {
          if(result.status === 'success') {
            submitBtn.text('제출');
            form.append(method === 'email' ? $('#email-submit-name') : $('#phone-submit-name'));
            form.append(method === 'email' ? $('#submit-email') : $('#submit-phone'));
            form.append(method === 'email' ? $('#change-with-email-userId') : $('#change-with-phone-userId'));
            form.appendTo('body').submit();
          } else if(result.status === 'timeout') {
            alert('인증번호 유효시간이 초과되었습니다.');
            window.location.reload();
          } else if(result.status === 'false') {
            submitBtn.prop('disabled', false);
            submitBtn.text('제출');
            alert('인증 내용을 다시 확인해주세요');
          }
        }
      });
    } else {
      alert('인증번호가 올바르지 않습니다.');
    }
  }
});
