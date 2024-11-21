/**
 * 
 */

    // 예매 확인 버튼 클릭 시 마이페이지의 예매 확인 페이지로 포워딩
    $('view-ticketing-infopage').on('click', function() {

    // 부모 창의 위치를 마이페이지 예매 확인 페이지로 변경
    if (window.opener) {
        window.opener.location.href = '/mypage/view?view=ticketDetail';
    }

        window.close();
    });