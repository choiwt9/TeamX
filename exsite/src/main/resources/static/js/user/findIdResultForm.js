$(function() {
  const userId = JSON.parse(sessionStorage.getItem('userId'));
  if(userId === 'notFound') {
    $('#select-id').append('일반 회원가입한 계정이 없습니다.');
  } else if(userId === 'withDraw') {
    $('#select-id').append('탈퇴한 계정입니다. 재가입을 위해서는 관리자에게 문의해주세요.');
  } else {
    $('#select-id').append(userId);
    $('#login-input').val(userId);
    $('#change-password-id-input').val(userId);
  }
  
});