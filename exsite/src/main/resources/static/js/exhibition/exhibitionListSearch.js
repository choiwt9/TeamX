        function changeColor(selectedButton) {
            // 모든 버튼을 선택
            const buttons = document.querySelectorAll('.exhibition-array1 button');
            
            // 모든 버튼의 active 클래스 제거
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            
            // 선택된 버튼에 active 클래스 추가
            selectedButton.classList.add('active');
        }
