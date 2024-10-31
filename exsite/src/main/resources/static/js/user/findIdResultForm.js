$(function() {
  const userId = JSON.parse(sessionStorage.getItem('userId'));
  $('#select-id').append(userId);
  $('#login-input').val(userId);
  $('#reset-password-id-input').val(userId);
});