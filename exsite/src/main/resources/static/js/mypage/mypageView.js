$(function() {
  let alertMsg = $('#mypage-nav-data').data('alert-msg');
  console.log(alertMsg);
  if(alertMsg != null) {
    alert(alertMsg);
  }
  $('#mypage-nav-data').data('alert-msg', null);
  
});