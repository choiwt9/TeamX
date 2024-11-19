
let emailCheckResult = true;
let phoneCheckResult= true;
let addressCheckResult = true;

let addressDetailCheckResult= true;

let emailAlert;
let phoneAlert;
let addressAlert;
let addressDetailAlert;



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
      { value: 'gmail.com', text: 'naver.com' },
      { value: 'gmail.com', text: 'gmail.com' },
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
    passwordAlert = $('#check-password-result');
    let password = $('#password').val();
    let check = this.value;
    if(check == '') {
      passwordConfirmReslt = false;
    } else {
      passwordConfirmReslt = true;
    }
    if(password !== check) {
      passwordCheckResult=false
      passwordAlert.removeClass('success-message');
      passwordAlert.addClass('error-message');
      passwordAlert.text('비밀번호가 일치하지 않습니다.');
    } else if(password === check) {
      passwordCheckResult=true;
      passwordAlert.removeClass('error-message');
      passwordAlert.addClass('success-message');
      passwordAlert.text('비밀번호가 일치합니다.');
    }
  });

  function validateFormat(inputElement, reg, errorMsg) {
    let regex=reg;
    let errorElement = document.getElementById(errorMsg);
  
    if (regex.test(inputElement.value)) {
      errorElement.textContent = ''; // 조건을 만족할 경우 오류 메시지 제거
    } else if(inputElement.value.trim() === '') {
      errorElement.textContent = ''
    } else {
      errorElement.textContent = '8~12자의 영문, 숫자, 특수문자를 사용해 주세요.'; // 조건을 만족하지 않을 경우 오류 메시지 표시
    }
  }
});



// 이메일 인증 부분
$(function() {
  emailAlert = $('#registered-email-alert');
  let email = '';
  // 입력된 이메일을 인증번호 생성 controller로 전달
  $('#authentication-email').on('click', () => {
    if($('#email-suffix').val() != '' && $('#email-prefix').val().length > 2) {
      email = $('#email-prefix').val() + '@' + $('#email-suffix').val();
      $('#authentication-email').text('발송 중...');
      //setTimeout(changeEmailInputForm, 3000);
      $.ajax({
        url: '/signup/authcode',
        type: 'post',
        data: {email: email},
        success: function(result) {
          console.log('result.status : ' + result.status);
          if(result.status == 'ok') {
            changeEmailInputForm();
            emailAlert.removeClass('error-message');
            emailAlert.addClass('success-message');
            emailAlert.text('인증번호가 발송되었습니다.');
            $('#email').val(email);
          } else if(result.status == 'exist') {
            $('#authentication-email').text('인증받기');
            emailAlert.removeClass('success-message');
            emailAlert.addClass('error-message');
            emailAlert.text('이미 사용중인 이메일입니다.');
            
          }
        },
        error: function() {
          console.log('데이터가 전달되지 않음');
        }
      });
    } else {
      emailAlert.removeClass('success-message');
      emailAlert.addClass('error-message');
      emailAlert.text('입력된 이메일이 없습니다.');
    }
  });

  // 인증번호 입력 input 태그 생성 및 삽입
  const changeEmailInputForm=()=> {
    $('#authentication-email').off('click');
    $('#authentication-email').text('제출');
    $('#authentication-email').attr('id', 'authentication-email-confirm');
    $('#email-prefix').remove();
    $('#at').remove();
    $('#email-suffix').remove();
    $('<input>', {
      id: 'email-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요'
    }).insertAfter('#form-table :nth-child(3)>td>#authentication-email-confirm');
    $('#authentication-email-confirm').on('click', () => {
      sendCertificationEmailNoToServer();
    })
  }
  // 사용자가 입력한 인증번호와 이미 입력한 이메일을 인증번호 검증 controller로 전달
  const sendCertificationEmailNoToServer=()=> {
    if($('#email-auth-no').val() != '') {
      $.ajax({
        url: '/signup/authcode/verify',
        type: 'post',
        data: {
          email: email,
          code: $('#email-auth-no').val()
        },
        success: function(result) {
          if(result.status === 'success') {
            $('#email-auth-no').prop('readonly', true);
            $('#authentication-email-confirm').prop('disabled', true);
            emailCheckResult = true;
            $('#authentication-email-confirm').text('인증 완료');
            emailAlert.removeClass('error-message');
            emailAlert.addClass('success-message');
            emailAlert.text('인증되었습니다.');
            
          } else if(result.status === 'timeout') {
            alert('인증번호 유효시간이 초과되었습니다.');
          } else {
            emailAlert.removeClass('success-message');
            emailAlert.addClass('error-message');
            emailAlert.text('인증번호가 다릅니다. 다시 입력해주세요.');
          }
        }
      });
    } else {
      emailAlert.removeClass('success-message');
      emailAlert.addClass('error-message');
      emailAlert.text('인증번호가 입력되지 않았습니다.');
    }
  }
});



// 휴대폰 인증 부분
$(function() {
  
  phoneAlert = $('#registered-phone-alert');
  // 입력된 전화번호를 인증번호 생성 controller로 전달
  $('#authentication-phone').on('click', () => {
    if($('#phone').val().length == 11) {
      let phone = $('#phone').val();
      $('#authentication-phone').text('발송 중...');
      $.ajax({
        url: '/signup/authcode',
        type: 'post',
        data: {phone: phone},
        success: function(result) {
          if(result.status == 'ok') {
            changePhoneInputForm();
            phoneAlert.removeClass('error-message');
            phoneAlert.addClass('success-message');
            phoneAlert.text('인증번호가 발송되었습니다.');
          } else if(result.status == 'exist') {
            $('#authentication-phone').text('인증받기');
            phoneAlert.removeClass('success-message');
            phoneAlert.addClass('error-message');
            phoneAlert.text('이미 사용중인 휴대번 번호입니다.');
          }
        },
        error: function() {
          console.log('데이터가 전달되지 않음');
        }
      });
    } else {
      phoneAlert.removeClass('success-message');
      phoneAlert.addClass('error-message')
      phoneAlert.text('전화번호를 확인해주세요.');
    }
  });

  // 인증번호 입력 input 태그 생성 및 삽입
  const changePhoneInputForm=()=> {
    $('#authentication-phone').off('click');
    $('#authentication-phone').text('제출');
    $('#authentication-phone').attr('id', 'authentication-phone-confirm');
    $('#phone').attr('type', 'hidden');
    $('<input>', {
      id: 'phone-auth-no',
      type: 'text',
      maxlength: 6,
      placeholder: '인증번호를 입력하세요.'
    }).insertAfter('#form-table :nth-child(6)>td>#authentication-phone-confirm');
    $('#authentication-phone-confirm').on('click', () => {
      sendCertificationPhoneNoToServer();
    })
  }
  // 사용자가 입력한 인증번호와 미리 입력한 휴대폰 번호를 인증번호 검증 controller로 전달
  const sendCertificationPhoneNoToServer=()=> {
    let phone = $('#phone').val();
    if($('#phone-auth-no').val().length == 6) {
      $.ajax({
        url: '/signup/authcode/verify',
        type: 'post',
        data: {
          phone: phone,
          code: $('#phone-auth-no').val()
        },
        success: function(result) {
          if(result.status === 'success') {
            $('#phone-auth-no').prop('readonly', true);
            $('#authentication-phone-confirm').prop('disabled', true);
            phoneCheckResult = true;
            $('#authentication-phone-confirm').text('인증 완료');
            phoneAlert.removeClass('error-message');
            phoneAlert.addClass('success-message');
            phoneAlert.text('인증되었습니다.');
            
          } else if(result.status === 'timeout') {
            alert('인증번호 유효시간이 초과되었습니다.');
          } else {
            phoneAlert.removeClass('success-message');
            phoneAlert.addClass('error-message');
            phoneAlert.text('인증번호가 다릅니다. 다시 입력해주세요.');
          }
        }
      });
    } else {
      phoneAlert.removeClass('success-message');
      phoneAlert.addClass('error-message');
      phoneAlert.text('인증번호가 입력되지 않았습니다.');
    }
  }
});



// 거주지 주소 입력(우편번호 서비스 api 이용)
$(function() {
  $('#search-address').click(function() {
    new daum.Postcode({
      oncomplete: function(data) {
          addressCheckResult = true;
          $('#address-alert').removeClass('error-message');
          $('#address-alert').addClass('success-message');
          $('#address-alert').text('');
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



// 필수요소 입력상태 체크
$(function() {
  $('#enroll-btn').click(function(event) {
    event.preventDefault(); // 기본 submit 동작 방지
    let isPossible = true;
    if($('#detail-address-input').val() !== null && $('#detail-address-input').val() !== '') {
      addressDetailCheckResult = true;
    } else {
      addressDetailCheckResult = false;
    }
    let checkResults = [
      emailCheckResult,
      phoneCheckResult,
      addressCheckResult,
      addressDetailCheckResult
    ];
    
    for(let i in checkResults) {
      if(checkResults[i] === false) {
        isPossible = false;
        break;
      }
    }

    // 모든 검사가 통과되었을 때만 form을 제출
    if (isPossible) {
       // form을 수동으로 제출
      $(this).closest('form').submit();
    } else {
      if(emailCheckResult === false) {
        emailAlert.removeClass('success-message');
        emailAlert.addClass('error-message');
        emailAlert.text('인증이 필요한 항목입니다.');
      }
      if(phoneCheckResult === false) {
        phoneAlert.removeClass('success-message');
        phoneAlert.addClass('error-message');
        phoneAlert.text('인증이 필요한 항목입니다.');
      }
      if(addressCheckResult === false) {
        $('#address-alert').removeClass('success-message');
        $('#address-alert').addClass('error-message');
        $('#address-alert').text('주소와 상세주소를 모두 입력해주세요');
      }
      if(addressDetailCheckResult === false) {
        $('#address-alert').removeClass('success-message');
        $('#address-alert').addClass('error-message');
        $('#address-alert').text('주소와 상세주소를 모두 입력해주세요');
      }
      return false;
    }
  });
});



// input 시 기존 인증 정보들 재인증해야함
$(function() {
  $('#email-prefix').on('input', function() {
    emailAlert.text('');
    emailCheckResult = false;
  });
  $('#phone').on('input', function() {
    phoneAlert.text('');
    phoneCheckResult = false;
  });
  $('#address-input').on('input', function() {
    $('#address-alert').text('');
    addressCheckResult = false;
  });
  $('#detail-address-input').on('input', function() {
    $('#address-alert').text('');
  });
});