/**
 * 
 */

// 예매 팝업을 여는 스크립트
document.querySelector('.reservation-button1').addEventListener("click", function() {

    // 화면 중앙에 팝업 뜨도록 설정
    const width = 700;
    const height = 800;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const popupOptions = `width=${width},height=${height},left=${left},top=${top}`;

    window.open('/TicketingDetail', '예매', popupOptions);
});
