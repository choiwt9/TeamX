        document.addEventListener('DOMContentLoaded', function() {
            // 페이지 로드 시 초기 상태 설정
            const faqButton = document.getElementById('faq-button');
            const contactButton = document.getElementById('contact-button');
            const faqSection = document.getElementById('faq-section');
            const contactSection = document.getElementById('contact-section');

            const userNo = $('#userId').val();
            const isLoggedIn = userNo && userNo !== '';

            // 초기 버튼 스타일 설정
            faqSection.style.display = 'block'; // FAQ 섹션 표시
            contactSection.style.display = 'none'; // Contact 섹션 숨김
            faqButton.style.backgroundColor = '#EDF8F8'; // 초기 배경색 설정
            faqButton.style.fontWeight = 'bolder'; // 초기 글씨 굵기 설정

            // FAQ 버튼 클릭 이벤트
            faqButton.addEventListener('click', function() {
                faqSection.style.display = 'block'; // FAQ 섹션 표시
                contactSection.style.display = 'none'; // Contact 섹션 숨김

                // 버튼 스타일 변경
                this.style.backgroundColor = '#EDF8F8'; // 배경색 변경
                this.style.fontWeight = 'bolder'; // 글씨 굵기 변경

                // Contact 버튼 스타일 초기화
                contactButton.style.backgroundColor = 'white'; // 배경색 초기화
                contactButton.style.fontWeight = 'normal'; // 글씨 굵기 초기화
            });

            // Contact 버튼 클릭 이벤트
            contactButton.addEventListener('click', function() {
                if (!isLoggedIn) {
                    alert("로그인이 필요합니다."); // 로그인 필요 경고
                    window.location.href = "/login"; // 로그인 페이지로 리디렉션
                    return; // 로그인하지 않은 경우 함수 종료
                }

                // 로그인된 경우 Contact 섹션 표시
                contactSection.style.display = 'block'; // Contact 섹션 표시
                faqSection.style.display = 'none'; // FAQ 섹션 숨김

                // 버튼 스타일 변경
                this.style.backgroundColor = '#EDF8F8'; // 배경색 변경
                this.style.fontWeight = 'bolder'; // 글씨 굵기 변경

                // FAQ 버튼 스타일 초기화
                faqButton.style.backgroundColor = 'white'; // 배경색 초기화
                faqButton.style.fontWeight = 'normal'; // 글씨 굵기 초기화
            });
    
            // FAQ 질문 클릭 시 답변 토글
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.querySelector('.faq-answer'); // 다음 형제 요소인 답변
                    answer.classList.toggle('active'); // active 클래스를 토글
                });
            });

            if(document.getElementById('personal-inquiery').value == 'true') {
                contactSection.style.display = 'block'; // Contact 섹션 표시
                faqSection.style.display = 'none'; // FAQ 섹션 숨김
                contactButton.style.backgroundColor = '#EDF8F8'; // 배경색 변경
                contactButton.style.fontWeight = 'bolder'; // 글씨 굵기 변경
                faqButton.style.backgroundColor = 'white'; // 배경색 초기화
                faqButton.style.fontWeight = 'normal'; // 글씨 굵기 초기화
            }
        });