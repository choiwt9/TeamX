$(function() {

  $("#email-suffix").on("change", function() {
    replaceWithInput(this);
  });

  function replaceWithInput(selectElement) {
    if (selectElement.value === 'other') {
      // 새로운 입력 필드 생성
      const inputField = document.createElement('input');
      inputField.type = 'text';
      inputField.id = 'email-suffix';
      inputField.name = selectElement.name;
      inputField.placeholder = '직접 입력하세요';
      inputField.value = ''; // 직접 입력할 수 있는 빈 필드
      
      // 선택 박스를 입력 필드로 교체

      inputField.onblur = function() {
        if(this.value == null || this.value == '') {
          replaceWithSelect(inputField);
        }
      };
      
      // 선택 박스를 입력 필드로 교체
      selectElement.parentNode.replaceChild(inputField, selectElement);
      inputField.focus(); // 입력 필드에 포커스 설정
    }
  }

  function replaceWithSelect(inputField) {
    // 원래의 <select> 요소 생성
    const selectElement = document.createElement('select');
    selectElement.id = 'email-suffix';
    selectElement.name = inputField.name;
    selectElement.onchange = function() {
      replaceWithInput(selectElement);
    };

    // <select>에 옵션 추가
    const options = [
      { value: '@naver.com', text: '@naver.com' },
      { value: '@google.com', text: '@google.com' },
      { value: 'other', text: '기타 (직접 입력)' }
    ];
    options.forEach(function(optionData) {
      const option = document.createElement('option');
      option.value = optionData.value;
      option.text = optionData.text;
      selectElement.appendChild(option);
    });

    // 입력된 값이 있을 경우 <select>에서 "기타" 옵션 선택
    if (inputField.value !== '') {
      selectElement.value = 'other';
    }

    // 입력 필드를 <select> 요소로 교체
    inputField.parentNode.replaceChild(selectElement, inputField);
  }

  // 아이디 규칙검사
  $('#id').on('input', function() {
    let regex = /^[a-zA-Z0-9]{6,20}$/;
    const idError = 'id-error';
    validateFormat(this, regex, 'id', idError);
  })

  // 비밀번호 규칙검사
  $('#password').on('input', function() {
    let regex=/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,12}$/;
    const passwordError='password-error';
    validateFormat(this, regex, passwordError);
  });

  $('#check-password').on('input', function() {
    let password = $('#password').val();
    console.log(password);
    let check = this.value;
    console.log(check);
    if(password !== check) {
      $('#check-password-result').text('비밀번호가 일치하지 않습니다.');
    } else {
      $('#check-password-result').text('');
    }
  })



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

