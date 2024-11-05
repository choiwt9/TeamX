

  $(function() {
    // 비밀번호 규칙검사
    $('#password').on('input', function() {
      let regex=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
      const passwordError='password-error';
      validateFormat(this, regex, passwordError);
    });

    $('#check-password').on('input', function() {
      let password = $('#password').val();
      let check = this.value;
      if(password !== check) {
        $('#check-password-result').text('비밀번호가 일치하지 않습니다.');
      } else {
        $('#check-password-result').text('');
      }
    });

    function validateFormat(inputElement, reg, errorMsg) {
      let regex=reg;
      let errorElement = document.getElementById(errorMsg);
    
      if (regex.test(inputElement.value)) {
        errorElement.textContent = ''; // 조건을 만족할 경우 오류 메시지 제거
      } else {
        errorElement.textContent = '사용 불가한 형식입니다.'; // 조건을 만족하지 않을 경우 오류 메시지 표시
      }
    }
  });