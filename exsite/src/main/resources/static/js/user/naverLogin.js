// 네이버 로그인 api 호출

  var naver_id_login = new naver_id_login(APP_NAVER_CLIENT_ID, APP_NAVER_REDIRECT_URL);
  var state = naver_id_login.getUniqState();
  naver_id_login.setButton("white", 2,40);
  naver_id_login.setDomain(APP_NAVER_SERVICE_URL);
  naver_id_login.setState(state);
  naver_id_login.setPopup();
  naver_id_login.init_naver_id_login();

//회원가입 페이지
$(function() {
  $(document).on("click", "#naver-signup-btn-img", function(){ 
    var btnNaverLogin = $("#naver_id_login").children().first();
    btnNaverLogin.trigger("click");
  });
})

//로그인 페이지
$(function() {
  $(document).on("click", "#naver-login-btn-img", function(){ 
    var btnNaverLogin = $("#naver_id_login").children().first();
    btnNaverLogin.trigger("click");
  });
})