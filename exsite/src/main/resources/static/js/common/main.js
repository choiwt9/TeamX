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

    // 슬라이드 전시/행사 정보 조회
    loadSlideList();

    // TOP10 전시/행사 정보 조회
    loadTop10List();
});


// 슬라이드 전시/행사 정보 조회 함수
function loadSlideList() {
    $.ajax({
        url: "/main/slide/list",
        method: "GET",
        success: function(slideList) {
            // 슬라이드 데이터를 받은 후 HTML 요소에 추가
            let slideContainer = $('.swiper-wrapper'); // 슬라이드 컨테이너 요소 선택
            slideContainer.empty(); // 기존 내용 제거

            slideList.forEach(function(slideList) {
                const slideHtml = `
                    <div class="swiper-slide slide-exhibition-item">
                        <a href="/exhibition/detail?id=${slideList.exhibitionNo}">
                            <div class="slide-item-image-wrapper">
                                <img class="slide-item-image" src="${slideList.mainImg}" alt="전시썸네일">
                            </div>
                            <ul class="item-textarea">
                                <li class="slide-item-title">${slideList.title}</li>
                                <li class="slide-item-place">${slideList.place}</li>
                                <li class="slide-item-date">${slideList.exDate}</li>
                            </ul>
                        </a>
                    </div>
                `;
                slideContainer.append(slideHtml);
            });

        },
        error: function(error) {
            console.log("슬라이드 데이터를 가져오지 못했습니다.", error);
        }
    });
}

// 탑10 전시/행사 정보 조회 함수
function loadTop10List(){
    $.ajax({
        url: "/main/top10/list",
        method: "GET",
        success: function(top10List){
            let top10InfoArea = $('.top10-info-area'); // top10 영역 요소 선택
            top10InfoArea.empty(); // 기존 내용 제거

            top10List.forEach(function(top10List){
                const top10Html = `
                    <div class="top10-exhibition-item">
                        <a href="/exhibition/detail?id=${top10List.exhibitionNo}">
                            <div class="top10-item-image-wrapper">
                                <img class="top10-item-image" src="${top10List.mainImg}" alt="전시썸네일">
                            </div>
                            <ul class="top10-item-textarea">
                                <li class="top10-item-title">${top10List.title}</li>
                                <li class="top10-item-place">${top10List.place}</li>
                                <li class="top10-item-date">${top10List.exDate}</li>
                            </ul>
                        </a>
                    </div>
                `;
                top10InfoArea.append(top10Html);
            });
        },
        error: function(error){
            console.log("TOP10 데이터를 가져오지 못했습니다.", error);
            
        }
    })
}