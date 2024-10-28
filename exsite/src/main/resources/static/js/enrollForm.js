let idCheckResult = false;
let passwordCheckResult = false;
let emailCheckResult = false;
let phoneCheckResult= false;
let addressCheckResult= false;


// 아이디 중복검사
$(function() {

  $('#id-check').click(function() {
    $.ajax({
      url: '/id/check',
      type: 'get',
      data: {id: $('#id').val()},
      success: function(result) {
        if(result == 0) {
          idCheckResult=true;
          alert("사용 가능한 아이디입니다.");
          $('#id-check').prop('disabled', true);
          $('#id-check').text('확인완료');
        }
      },
      error: function() {

      }
    });
  })

});

// 이메일 직접입력 input 생성
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
    let check = this.value;
    if(password !== check) {
      passwordCheckResult=false
      $('#check-password-result').text('비밀번호가 일치하지 않습니다.');
    } else {
      passwordCheckResult=true;
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


// 이메일 인증 부분
$(function() {
  let email = '';
  // 입력된 이메일을 인증번호 생성 controller로 전달
  $('#authentication-email').on('click', () => {
    if($('#email-suffix').val() != '' && $('#email-prefix').val().length > 2) {
      email = $('#email-prefix').val() + $('#email-suffix').val()
      $('#authentication-email').text('인증 중...');
      //setTimeout(changeEmailInputForm, 3000);
      $.ajax({
        url: '/mail/authNumber',
        type: 'post',
        data: {email: email},
        success: function(result) {
          console.log('result.status : ' + result.status);
          if(result.status == 'ok') {
            changeEmailInputForm();
            alert('입력하신 이메일로 인증번호가 발송되었습니다.');
          }
        },
        error: function() {
          console.log('데이터가 전달되지 않음');
        }
      });
    } else {
      alert('입력된 이메일이 없습니다.');
    }
  });

  // 인증번호 입력 input 태그 생성 및 삽입
  const changeEmailInputForm=()=> {
    $('#authentication-email').off('click');
    $('#authentication-email').text('제출');
    $('#authentication-email').attr('id', 'authentication-email-confirm');
    $('#custom-input').val(email);
    $('#email-prefix').remove();
    $('#email-suffix').remove();
    $('<input>', {
      id: 'email-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).appendTo('#form-table :nth-child(5)>td');
    $('#authentication-email-confirm').on('click', () => {
      sendCertificationEmailNoToServer();
    })
  }
  // 사용자가 입력한 인증번호와 이미 입력한 이메일을 인증번호 검증 controller로 전달
  const sendCertificationEmailNoToServer=()=> {
    if($('#email-auth-no').val() != '') {
      $.ajax({
        url: '/mail/verificationCode',
        type: 'post',
        data: {
          email: email,
          code: $('#email-auth-no').val()
        },
        success: function(result) {
          if(result.status = '이메일 인증 성공') {
            emailCheckResult = true;
            alert('이메일이 인증되었습니다.');
            $('#authentication-email-confirm').prop('disabled', true);
            $('#email-auth-no').prop('readonly', true);
          } else if(result.status = '인증 유효시간 초과') {
            alert('이메인 인증번호 유효시간이 초과되었습니다.');
          } else {
            alert('이메일 인증번호가 다릅니다. 다시 입력해주세요.');
          }
        }
      });
    } else {
      alert('입력된 인증번호 없음');
    }
  }
});


// 휴대폰 인증 부분
$(function() {
  let phone = '';
  // 입력된 전화번호를 인증번호 생성 controller로 전달
  $('#authentication-phone').on('click', () => {
    if($('#phone').val().length == 11) {
      $('#authentication-phone').text('인증 중...');
    setTimeout(changePhoneInputForm, 3000);
    } else {
      alert('전화번호를 다시 확인해주세요');
    }
  });

  // 인증번호 입력 input 태그 생성 및 삽입
  const changePhoneInputForm=()=> {
    $('#authentication-phone').off('click');
    $('#authentication-phone').text('제출');
    $('#authentication-phone').attr('id', 'authentication-phone-confirm');
    phone = $('#phone').val();
    $('#phone').remove();
    $('<input>', {
      id: 'phone-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).appendTo('#form-table :nth-child(6)>td');
    $('#authentication-phone-confirm').on('click', () => {
      sendCertificationPhoneNoToServer();
    })
  }
  // 사용자가 입력한 인증번호와 미리 입력한 휴대폰 번호를 인증번호 검증 controller로 전달
  const sendCertificationPhoneNoToServer=()=> {
    if($('#phone-auth-no').val() != '') {
      alert(phone + $('#phone-auth-no').val());
    } else {
      alert('입력된 인증번호 없음');
    }
  }
});


// 거주지 주소 입력(우편번호 서비스 api 이용)
$(function() {
  $('#search-address').click(function() {
    new daum.Postcode({
      oncomplete: function(data) {
          document.getElementById("address-input").value = data['address'];
      },
      theme: {
        bgColor: "", //바탕 배경색
        searchBgColor: "", //검색창 배경색
        contentBgColor: "", //본문 배경색(검색결과,결과없음,첫화면,검색서제스트)
        pageBgColor: "", //페이지 배경색
        textColor: "", //기본 글자색
        queryTextColor: "", //검색창 글자색
        postcodeTextColor: "", //우편번호 글자색
        emphTextColor: "", //강조 글자색
        outlineColor: "" //테두리
      }
    }).open({
      popupKey: 'popup1' //팝업창 Key값 설정 (영문+숫자 추천)
    });

  })
});

$(function() {
  $('#enroll-btn').click(function() {
    const checkResults = [
      'idCheckResult',
      'passwordCheckResult',
      'emailCheckResult',
      'phoneCheckResult',
      'addressCheckResult'
    ];
    for(let i of checkResults) {
      if(i === false) {
        isPossible = i;
        break;
      }
    }
    alert('인증되지 않은 항목이 있습니다.');
    return false;
  });
});

