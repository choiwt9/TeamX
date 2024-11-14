/**
 * 
 */

// 예매 팝업을 여는 스크립트
document.querySelector('.reservation-button1').addEventListener("click", function() {

    // 화면 중앙에 팝업 뜨도록 설정
    const width = 800;
    const height = 600;
    const left = (window.screen.width / 2) - (width / 2);
    const top = (window.screen.height / 2) - (height / 2);
    const popupOptions = `width=${width},height=${height},left=${left},top=${top}`;

    const exhibitionNo = document.getElementById("exhibitionNo").value;
    const exhibitionTitle = document.getElementById("exhibitionTitle").value;
    const useFee = document.getElementById("useFee").value.replace("원", "");
    const popupUrl = `/ticketingPopup?exhibitionNo=${encodeURIComponent(exhibitionNo)}
                        &exhibitionTitle=${encodeURIComponent(exhibitionTitle)}
                        &useFee=${encodeURIComponent(useFee)}`;

    window.open(popupUrl, '예매', popupOptions);
});
