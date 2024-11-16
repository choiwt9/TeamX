/**
 * 
 */

window.onload = () => {
    const priceValue = document.getElementsByClassName('exhibition-detail-price2')[0].textContent.trim();
    const reservationButton = document.querySelector('.reservation-button1');

    if (priceValue === '홈페이지 참조') {
        const orgLink = document.getElementById('org-link').value;

        reservationButton.addEventListener("click", function() {
            console.log(orgLink);
            window.open(orgLink, '_blank'); // 새 창으로 URL 열기
        });
    } else {
        reservationButton.addEventListener("click", function() {
            // 예매 팝업 열기
            const width = 800;
            const height = 600;
            const left = (window.screen.width / 2) - (width / 2);
            const top = (window.screen.height / 2) - (height / 2);
            const popupOptions = `width=${width},height=${height},left=${left},top=${top}`;

            const exhibitionNo = document.getElementById("exhibitionNo").value;
            const exhibitionTitle = document.getElementById("exhibitionTitle").value;
            const useFee = document.getElementById("useFee").value.replace("원", "");
            const mainImg = document.getElementById("mainImg").value;
            const endDate = document.getElementById("endDate").value;
            const strtDate = document.getElementById("strtDate").value;

            const popupUrl = `/ticketingPopup?exhibitionNo=${encodeURIComponent(exhibitionNo)}&exhibitionTitle=${encodeURIComponent(exhibitionTitle)}&useFee=${encodeURIComponent(useFee)}&mainImg=${encodeURIComponent(mainImg)}&endDate=${encodeURIComponent(endDate)}&strtDate=${encodeURIComponent(strtDate)}`;

            window.open(popupUrl, '예매', popupOptions);
        });
    }
};
