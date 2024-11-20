$(function() {
  let idRegex = /^[a-zA-Z0-9]{6,20}$/;
  let passwordRegex=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
  if($('#alertMsg').val() !== '' && $('#alertMsg').val() !== null) {
    alert($('#alertMsg').val());
  } 
  $('#login-btn').click(() => {
    if(!idRegex.test($('#userId').val())) {
      $('#id-error').text('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
      return false;
    }
    if(!passwordRegex.test($('#userPw').val())) {
      $('#id-error').text('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
      return false;
    }
    $.ajax({
      url: '/login/normal',
      type: 'post',
      data: {
        userId: $('#userId').val(),
        userPw: $('#userPw').val()
      },
      success: (result) => {
        console.log(result.response);
        if(result.response == 'admin') {
          window.location.href='/admin';
        }
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

  $('input').on('keydown', function(event) {
    if(event.key === 'Enter') {
      event.preventDefault();
      $('#login-btn').click();
    }
  });
  
});

// 네이버 로그인
$(function() {
  $(document).on("click", "#naver-login-btn-img", function(){ 
    var btnNaverLogin = $("#naver_id_login").children().first();
    btnNaverLogin.trigger("click");
  });
})