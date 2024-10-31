let idCheckResult = false;
let passwordCheckResult = false;
let passwordConfirmReslt = false;
let nameCheckResult = false;
let emailCheckResult = false;
let phoneCheckResult= false; 
let addressCheckResult= false;

let idAlert;
let passwordAlert;
let emailAlert;
let phoneAlert;
let addressAlert;
/* 
  문자 인증, 네이버로 회원가입, 구글로 회원가입 기능 구현 필요
*/

// 아이디 중복검사
$(function() {

  let idRegex = /^[a-zA-Z0-9]{6,20}$/;
  idAlert = $('#id-check-result-alert');
  $('#id-check').click(function() {
    if($('#id').val().length < 6 || $('#id').val().length > 20 || !idRegex.test($('#id').val())) {
      idAlert.removeClass('success-message');
      idAlert.addClass('error-message');
      idAlert.text('아이디는 6~20자 사이의 영문, 숫자로 구성해야합니다.');
      return false;
    }
    $.ajax({
      url: '/id/check',
      type: 'get',
      data: {id: $('#id').val()},
      success: function(result) {
        if(result == 0) {
          idCheckResult=true;
          idAlert.removeClass('error-message');
          idAlert.addClass('success-message');
          idAlert.text('사용 가능한 아이디입니다.');
        } else {
          idAlert.removeClass('success-message');
          idAlert.addClass('error-message');
          idAlert.text('이미 사용중인 아이디입니다. 다시 입력해주세요.')
        }
      }
    });
  });
  //중복검사 후 아이디 입력 내용 변경 시 중복검사결과값을 false로 변경
  $('#id').on('input', function() {
    idCheckResult=false;
    idAlert.text('');
  });
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

//실명 입력 검사
$(function() {
  $('#user_name').on('input', function() {
    if(this.value != '') {
      nameCheckResult = true;
    }
  });
});

// 이메일 인증 부분
$(function() {
  emailAlert = $('#registered-email-alert');
  let email = '';
  // 입력된 이메일을 인증번호 생성 controller로 전달
  $('#authentication-email').on('click', () => {
    if($('#email-suffix').val() != '' && $('#email-prefix').val().length > 2) {
      email = $('#email-prefix').val() + '@' + $('#email-suffix').val();
      $('#authentication-email').text('인증 중...');
      //setTimeout(changeEmailInputForm, 3000);
      $.ajax({
        url: '/mail/signup/authnumber',
        type: 'post',
        data: {email: email},
        success: function(result) {
          console.log('result.status : ' + result.status);
          if(result.status == 'ok') {
            changeEmailInputForm();
            emailAlert.removeClass('error-message');
            emailAlert.addClass('success-message');
            emailAlert.text('입력하신 이메일로 인증번호가 발송되었습니다.');
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
    }).insertAfter('#form-table :nth-child(5)>td>#authentication-email-confirm');
    $('#authentication-email-confirm').on('click', () => {
      sendCertificationEmailNoToServer();
    })
  }
  // 사용자가 입력한 인증번호와 이미 입력한 이메일을 인증번호 검증 controller로 전달
  const sendCertificationEmailNoToServer=()=> {
    if($('#email-auth-no').val() != '') {
      $.ajax({
        url: '/mail/signup/verification',
        type: 'post',
        data: {
          email: email,
          code: $('#email-auth-no').val()
        },
        success: function(result) {
          if(result.status = '이메일 인증 성공') {
            $('#email-auth-no').prop('readonly', true);
            $('#authentication-email-confirm').prop('disabled', true);
            emailCheckResult = true;
            $('#authentication-email-confirm').text('인증 완료');
            emailAlert.removeClass('error-message');
            emailAlert.addClass('success-message');
            emailAlert.text('이메일이 인증되었습니다.');
            
          } else if(result.status = '인증 유효시간 초과') {
            alert('이메인 인증번호 유효시간이 초과되었습니다.');
          } else {
            emailAlert.removeClass('success-message');
            emailAlert.addClass('error-message');
            emailAlert.text('이메일 인증번호가 다릅니다. 다시 입력해주세요.');
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
  let phone = '';
  phoneAlert = $('#registered-phone-alert');
  // 입력된 전화번호를 인증번호 생성 controller로 전달
  $('#authentication-phone').on('click', () => {
    if($('#phone').val().length == 11) {
      $('#authentication-phone').text('인증 중...');
    setTimeout(changePhoneInputForm, 3000);
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
    phone = $('#phone').val();
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
    if($('#phone-auth-no').val().length == 6) {
      // 여기서 사용자가 입력한 인증번호와 서버에서 발송한 인증번호 비교
      phoneAlert.removeClass('error-message');
      phoneAlert.addClass('success-message');
      phoneAlert.text('휴대폰 인증되었습니다.');
      $('#phone-auth-no').prop('readonly', true);
      $('#authentication-phone-confirm').text('인증 완료');
      $('#authentication-phone-confirm').prop('disabled', true);
      alert(phone + $('#phone-auth-no').val());
      phoneCheckResult = true;
    } else {
      phoneAlert.removeClass('success-message');
      phoneAlert.addClass('error-message');
      phoneAlert.text('휴대폰 번호를 다시 확인해주세요.');
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

$(function() {
  
  let termsAndConditionsAgreement = $('#terms-and-conditions').is(':checked');

  $('#terms-and-conditions').on('click', function() {
    termsAndConditionsAgreement = $('#terms-and-conditions').is(':checked');
  });

  $('#enroll-btn').click(function(event) {
    event.preventDefault(); // 기본 submit 동작 방지
    let isPossible = true;
    let checkResults = [
      idCheckResult,
      passwordCheckResult,
      passwordConfirmReslt,
      nameCheckResult,
      emailCheckResult,
      phoneCheckResult,
      addressCheckResult
    ];
    
    for(let i in checkResults) {
      if(checkResults[i] === false) {
        isPossible = false;
        break;
      }
    }

    // 모든 검사가 통과되었을 때만 form을 제출
    if (isPossible) {
      if(!termsAndConditionsAgreement) {
        alert('이용약관 동의가 필요합니다.');
        return false;
      }
       // form을 수동으로 제출
      $(this).closest('form').submit();
    } else {
      if(idCheckResult === false) {
        idAlert.removeClass('success-message');
        idAlert.addClass('error-message');
        idAlert.text('필수 항목입니다.');
      }
      if(passwordCheckResult === false) {
        $('#password-error').removeClass('success-message');
        $('#password-error').addClass('error-message');
        $('#password-error').text('필수 항목입니다.');
      }
      if(passwordConfirmReslt === false) {
        $('#check-password-result').removeClass('success-message');
        $('#check-password-result').addClass('error-message');
        $('#check-password-result').text('필수 항목입니다.');
      }
      if(nameCheckResult === false) {
        $('#name-check').removeClass('success-message');
        $('#name-check').addClass('error-message');
        $('#name-check').text('필수 항목입니다.');
      }
      if(emailCheckResult === false) {
        emailAlert.removeClass('success-message');
        emailAlert.addClass('error-message');
        emailAlert.text('필수 항목입니다.');
      }
      if(phoneCheckResult === false) {
        phoneAlert.removeClass('success-message');
        phoneAlert.addClass('error-message');
        phoneAlert.text('필수 항목입니다.');
      }
      if(addressCheckResult === false) {
        $('#address-alert').removeClass('success-message');
        $('#address-alert').addClass('error-message');
        $('#address-alert').text('필수 항목입니다.');
      }
      return false;
    }
  });
});

//전체적으로 input 시 출력됐던 오류메시지 지움(email, phone, address, user_name)
$(function() {
  $('#email-prefix').on('input', function() {
    emailAlert.text('');
  });
  $('#phone').on('input', function() {
    phoneAlert.text('');
  });
  $('#address-input').on('input', function() {
    $('#address-alert').text('');
    addressCheckResult = false;

  })
  $('#user_name').on('input', function() {
    $('#name-check').text('');
  })


});

