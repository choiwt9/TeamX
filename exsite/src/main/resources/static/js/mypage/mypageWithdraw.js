document.addEventListener("DOMContentLoaded", function() {
  const checkbox = document.getElementById("terms-and-conditions");
  const customCheckbox = document.querySelector(".custom-checkbox");

  customCheckbox.addEventListener("click", function() {
    checkbox.checked = !checkbox.checked; // 체크 상태 토글
    customCheckbox.classList.toggle("checked", checkbox.checked); // 클래스 추가/제거로 스타일링
  });
});
$(document).ready(function() {
  $('#submit-password').on('submit', function(event) {
    if (!$('#terms-and-conditions').is(':checked')) {
      event.preventDefault(); // 체크박스가 체크되지 않으면 폼 제출 막기
      alert("아이디 재사용 불가에 동의해야 회원 탈퇴를 진행할 수 있습니다.");
    }
  });
});