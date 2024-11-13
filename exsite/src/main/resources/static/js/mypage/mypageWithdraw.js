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


$(function() {

    // 이메일 인증 코드
    $('#submit-email-btn').click(function(event) {
      event.preventDefault();
      let email = $('#submit-email').val();
      if(email.length > 11) {
        $.ajax({
          url: '/mypage/withdraw/social/auth',
          type: 'post',
          data: {
            email: email
          },
          success: (result) => {
            if(result.status === 'notfound') {
              alert('해당하는 아이디가 없습니다.');
            } else if(result.status === 'success') {
              alert('인증번호가 전송되었습니다.');
              changeEmailInputForm();
            }
          }
        });
      } else {
        alert('올바른 입력인지 확인 바랍니다.');
      }
    });

      // 이메일 인증번호 입력 폼으로 변경
  let changeEmailInputForm = () => {
    $('#submit-email').attr('type', 'hidden');
    $('#submit-email-btn').off('click');
    $('#submit-email-btn').text('제출');
    $('#submit-email-btn').attr('id', 'submit-authcode-btn');
    $('<input>', {
      id: 'email-auth-no',
      name: 'code',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).insertAfter('#submit-email');

    $('#submit-authcode-btn').on('click', function(event) {
      if (!$('#terms-and-conditions').is(':checked')) {
        event.preventDefault(); // 체크박스가 체크되지 않으면 폼 제출 막기
        alert("아이디 재사용 불가에 동의해야 회원 탈퇴를 진행할 수 있습니다.");
      }
    });
  };



});