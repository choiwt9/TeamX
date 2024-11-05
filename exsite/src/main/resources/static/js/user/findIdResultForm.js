$(function() {
  const userId = JSON.parse(sessionStorage.getItem('userId'));
  if(userId === 'notFound') {
    $('#select-id').append('일반 회원가입한 계정이 없습니다.');
  } else {
    $('#select-id').append(userId);
    $('#login-input').val(userId);
    $('#change-password-id-input').val(userId);
  }
  
});