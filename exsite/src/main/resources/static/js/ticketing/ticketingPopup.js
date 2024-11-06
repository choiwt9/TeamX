/**
 * 
 */

     // 달력 생성용 script
    function generateCalendar(year, month) {
        const calendarElement = document.querySelector('.select-date');
        const monthYearElement = document.getElementById('month-year');
        const dayContainer = document.querySelector('.day-container');
        const currentDate = new Date(); // 현재 날짜

        // 해당 년월을 표시
        const displayMonth = String(month + 1).padStart(2, '0');
        monthYearElement.textContent = `${year}.${displayMonth}`;
        
        // 이전 달력 내용 초기화
        calendarElement.innerHTML = '';
        dayContainer.innerHTML = '';

        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day;
            dayContainer.appendChild(dayElement);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        // 이전 달의 마지막 날짜
        const prevLastDate = new Date(year, month, 0).getDate();
        for (let i = 0; i < firstDay; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date', 'prev-month');
            dateElement.textContent = prevLastDate - firstDay + 1 + i;
            calendarElement.appendChild(dateElement);
        }

        // 현재 달 날짜 채우기
        for (let date = 1; date <= lastDate; date++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date', 'current-month');
            const cellDate = new Date(year, month, date); // 셀 날짜 생성
            
            // 오늘보다 이전 날짜일 경우, 회색과 비활성화 추가
            if (cellDate < currentDate) {
                dateElement.classList.add('disabled'); // .disabled 클래스 추가
            } else {
                const dayOfWeek = cellDate.getDay();
                if (dayOfWeek === 0) dateElement.classList.add('sunday');
                else if (dayOfWeek === 6) dateElement.classList.add('saturday');

                dateElement.addEventListener('click', function() {
                    document.querySelectorAll('.date').forEach(el => el.classList.remove('selected-date'));
                    dateElement.classList.add('selected-date');
                    $('#selected-date').text(dateElement.dataset.date);
                });
            }

            dateElement.textContent = date;
            dateElement.dataset.date = `${year}.${displayMonth}.${String(date).padStart(2, '0')}`;
            calendarElement.appendChild(dateElement);
        }

        // 다음 달 날짜 채우기 (빈 칸 맞추기 위해)
        const totalCells = 42; // 6주로 달력을 표시 (7일 * 6주 = 42칸)
        const currentCells = firstDay + lastDate;
        const nextDays = totalCells - currentCells;
        for (let i = 1; i <= nextDays; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('date', 'next-month');
            dateElement.textContent = i;
            calendarElement.appendChild(dateElement);
        }
    }

    // 오늘 날짜 기준으로 달력 생성
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    generateCalendar(currentYear, currentMonth);

    // 월을 바꿀 수 있도록 이전/다음 버튼에 이벤트 리스너 추가
    document.getElementById('prev-month').addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });

    document.getElementById('next-month').addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });

        // 다음 단계 버튼 클릭 이벤트
    // $('#btn-next').click(function() {
    //     // 다음 단계 페이지로 이동하도록 할 예정
    //     alert("다음 단계 되나?");
    // });

    /*********************************/

    let currStep = 1;
    const totalStep = 3;

    // 단계 이동을 제어하는 함수
    function updateStep() {
        // 모든 단계 숨기기
        document.querySelectorAll('.step-content').forEach((step) => {
            step.style.display = 'none';
        });
        // 현재 단계 표시
        document.getElementById(`step-${currStep}`).style.display = 'block';

        // 버튼 제어
        if (currStep === 1) {
            document.getElementById('btn-prev').style.display = 'none';
            document.getElementById('btn-next').style.display = 'inline-block';
            document.getElementById('btn-payment').style.display = 'none';
        } else if (currStep === totalStep) {
            document.getElementById('btn-prev').style.display = 'inline-block';
            document.getElementById('btn-next').style.display = 'none';
            document.getElementById('btn-payment').style.display = 'inline-block';
        } else {
            document.getElementById('btn-prev').style.display = 'inline-block';
            document.getElementById('btn-next').style.display = 'inline-block';
            document.getElementById('btn-payment').style.display = 'none';
        }
    }

    // 다음 단계 버튼 이벤트
    document.getElementById('btn-next').addEventListener('click', function() {
        if (currStep === 1 && !document.querySelector('.selected-date')) {
        alert('관람일을 선택해 주세요.');
        return;
        }

        if (currStep === 2) {
        const ticketCount = document.getElementById('ticket-count').value;
        if (!ticketCount || parseInt(ticketCount) === 0) {
            alert('티켓 매수를 선택해 주세요.');
            return;
        }
        const checkboxes = document.querySelectorAll('#checkbox-area input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        if (!allChecked) {
            alert('모든 약관에 동의해 주세요.');
            return;
        }
    }

        if (currStep < totalStep) {
            currStep++;
            updateStep();
        }
    });

    // 이전 단계 버튼 이벤트
    document.getElementById('btn-prev').addEventListener('click', function() {
        if (currStep > 1) {
            currStep--;
            updateStep();
        }
    });

    // 총 결제 금액 계산
    document.getElementById('ticket-count').addEventListener('change', function() {
    const ticketCount = parseInt(this.value);
    const ticketPrice = 16800; // 티켓 단가
    const totalAmount = ticketCount * ticketPrice;
    document.getElementById('total-amount').textContent = `${totalAmount.toLocaleString()}원`;
});

    // 초기 단계 설정
    updateStep();

    
    /************* 결제창 포트원 ******************/

    var IMP = window.IMP; 
    IMP.init("imp47237427");

    function requestPay() {

        IMP.request_pay({
            pg : 'html5_inicis.INIpayTest',
            pay_method : 'card',
            merchant_uid: '${session.TicketNo}', 
            name : '［라스트얼리버드］불멸의 화가 반 고흐',
            amount : 100,
            buyer_email : $('#input-email').val(),
            buyer_name : $('#input-name').val(),
            buyer_tel : $('#input-phone').val(),
            buyer_addr : '${session.loginUser.address}',
            // buyer_postcode : '123-456'
        }, function (rsp) { // callback
            //rsp.imp_uid 값으로 결제 단건조회 API를 호출하여 결제결과를 판단합니다.
            console.log(rsp);

            $.ajax({
                type : 'post',
                url: 'verifyPayment',
                data: {
                    imp_uid : rsp.imp_uid,
                    
                },
                success: (result)=> {
                    alert("결제 검증 성공");
                },
                error: (err)=> {
                    alert(err.responseText);
                }
            });

            // 결제 성공 시
            if (rsp.success) {
                alert("결제 테스트 성공");
            } else {
                alert(rsp.error_code, rsp.error_msg);
            }
        });
    }

    document.getElementById('btn-payment').addEventListener('click', function() {
        requestPay();
});