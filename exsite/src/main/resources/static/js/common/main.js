$(document).ready(function () {
    // Swiper 라이브러리 사용하여 슬라이드 설정
    const swiper = new Swiper('.slide-container', {
        slidesPerView: 4, // 한 번에 보여줄 슬라이드 개수
        spaceBetween: 16, // 슬라이드 간 간격 (px)
        loop: true, // 무한 루프 설정
        navigation: {
            nextEl: '#next-button',
            prevEl: '#prev-button',
        },
        autoplay: {
            delay: 4000, // 4초마다 자동 슬라이드 이동
            disableOnInteraction: false, // 사용자와 상호작용 후에도 자동 슬라이드 계속
        },
        slidesPerGroup: 4, // 한 번에 이동할 슬라이드 개수
        speed: 600, // 슬라이드 전환 속도 (ms)
    });

    // 네비게이션 버튼 꺽쇠 스타일 조정
    const arrows = document.querySelectorAll('#next-button, #prev-button');
    arrows.forEach(arrow => {
        arrow.style.transform = 'scale(0.5)'; // 꺽쇠 크기 축소
        arrow.style.fontWeight = '900'; // 꺽쇠 두께 조정
    });
});
