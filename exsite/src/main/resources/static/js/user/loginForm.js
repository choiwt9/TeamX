$(function() {
  $('#login-btn').click(() => {
    $.ajax({
      url: '/login/normal',
      type: 'post',
      data: {
        userId: $('#userId').val(),
        userPw: $('#userPw').val()
      },
      success: (result) => {
        console.log(result.response);
        if(result.response == 'success') {
          window.location.href='/';
        } else {
          $('#id-error').text('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
        }
        
      },
      error: (err) => {
        console.log(err);
      }
    });
  });
});