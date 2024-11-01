$(function() {
  const userId = JSON.parse(sessionStorage.getItem('userId'));
  $('#select-id').append(userId);
  $('#login-input').val(userId);
  $('#change-password-id-input').val(userId);
});