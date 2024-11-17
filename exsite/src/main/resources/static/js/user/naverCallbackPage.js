  ////////////// APP_NAVER_CLIENT_ID , APP_NAVER_REDIRECT_URL 넣는 자리////////////////////

  
  //////////////////////////////////////////////////////////////////////////////////////////
  var naver_id_login = new naver_id_login(APP_NAVER_CLIENT_ID, APP_NAVER_REDIRECT_URL);
  // 접근 토큰 값 출력
  //alert(naver_id_login.oauthParams.access_token);
  // 네이버 사용자 프로필 조회
  naver_id_login.get_naver_userprofile("naverSignInCallback()");
  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
  function naverSignInCallback() {
    let userId = naver_id_login.getProfileData('id');
    let name = naver_id_login.getProfileData('name');
    let email = naver_id_login.getProfileData('email');
    let mobile = naver_id_login.getProfileData('mobile');
    $(function() {
      $.ajax({
      url: '/login/naver',
      type: 'post',
      data: {socialUserIdentifier: userId, name: name, email: email, mobile: mobile},
      success: function(result) {
        console.log(result);
        if(result.status === "success") {
          window.opener.location.href = "/"; // 메인 창을 로그인 페이지로 이동
          window.close(); // 팝업 창 닫기
        } else if(result.status === "false") {
          let answer = confirm('가입되지 않은 사용자입니다. 가입하시겠습니까?');
          if(answer === true) {
            joinWithNaver(name, userId, email, mobile);
          } else {
            window.close(); // 팝업 창 닫기
          }
        } else if(result.status ==='exist') {
            window.opener.location.href = "/login"; // 메인 창을 로그인 페이지로 이동
            window.close(); // 팝업 창 닫기
            alert('사이트에서 가입한 이메일입니다.');
        } else if(result.status === 'withdraw') {
          window.opener.location.href = "/login";
            window.close();
            alert('탈퇴된 회원입니다.');
        }
      },
      error: function(err) {
          console.log(err);
      }
      });

      function joinWithNaver(name, userId, email, mobile) {
          $.ajax({
              url: '/user/register/naver',
              type: 'post',
              data: { socialUserIdentifier: userId
                    , name: name
                    , email: email
                    , mobile: mobile
                  },
              success: function(result) {
                if(result.status === 'success') {
                  alert('회원가입이 완료되었습니다.')
                  window.opener.location.href = "/";
                  window.close();
                } else if(result.status === 'false') {
                  alert('회원가입에 실패했습니다. 관리자에게 문의해주세요.')
                  window.close();
                } else {
                  alert('회원가입에 실패했습니다. 관리자에게 문의해주세요.')
                  window.close();                    
                }
                  
              }
          });
      }
      });

  }