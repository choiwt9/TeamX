$(function() {
  $('#submit-email-btn').click(function() {
    let name = $('#email-submit-name').val();
    let email = $('#submit-email').val();
    if(name.length > 1 && email.length > 11) {
      $.ajax({
        url: '/mail/authnumber',
        type: 'post',
        data: {
          name: $('#email-submit-name').val(),
          email: $('#submit-email').val()
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
  }
  // 사용자가 입력한 인증번호와 이미 입력한 이메일을 인증번호 검증 controller로 전달
  const sendCertificationEmailNoToServer=()=> {
    if($('#email-auth-no').val().trim() != '' || $('#email-auth-no').val().length < 6) {
      $('#submit-email-btn').prop('disabled', true);
      $('#submit-email-btn').text('발송 중...');
      $.ajax({
        url: '/mail/verification',
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
  }
});