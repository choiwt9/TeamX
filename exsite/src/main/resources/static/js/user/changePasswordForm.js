$(function() {
  $('#submit-change-password').prop('disabled', true);
  let passwordCheck = false;
  let passwordConfirmCheck = false;

  // 비밀번호 규칙 검사
  $('#password').on('input', function() {
    let regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
    const passwordError = 'password-error';
    validateFormat(this, regex, passwordError);
  });

  // 비밀번호 확인 검사
  $('#check-password').on('input', function() {
    let password = $('#password').val();
    let check = this.value;
    if (password !== check) {
      $('#check-password-result').text('비밀번호가 일치하지 않습니다.');
      passwordConfirmCheck = false;
    } else {
      $('#check-password-result').text('');
      passwordConfirmCheck = true;
    }
    clickEnable();
  });

  function validateFormat(inputElement, reg, errorMsg) {
    let regex = reg;
    let errorElement = document.getElementById(errorMsg);

    if (regex.test(inputElement.value)) {
      errorElement.textContent = ''; // 조건을 만족할 경우 오류 메시지 제거
      passwordCheck = true;
    } else {
      errorElement.textContent = '사용 불가한 형식입니다.'; // 조건을 만족하지 않을 경우 오류 메시지 표시
      passwordCheck = false;
    }
    clickEnable();
  }

  function clickEnable() {
    // 모든 조건을 만족할 경우 버튼 활성화
    if (passwordCheck === true && passwordConfirmCheck === true) {
      $('#submit-change-password').prop('disabled', false); // 버튼 활성화
    } else {
      $('#submit-change-password').prop('disabled', true); // 버튼 비활성화
    }
  }
});