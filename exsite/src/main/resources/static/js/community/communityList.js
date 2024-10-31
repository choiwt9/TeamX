document.querySelectorAll(".community-category-nav").forEach(function(navItem) {
    navItem.addEventListener("click", function(event) {
        event.preventDefault(); // 링크 기본 동작 방지

        // 모든 nav 요소에서 'active' 클래스를 제거
        document.querySelectorAll(".community-category-nav").forEach(function(item) {
            item.classList.remove("community-active");
        });
        
        // 클릭된 요소에 'active' 클래스 추가
        navItem.classList.add("community-active");
    });
});

// 페이지 번호 클릭 이벤트
document.querySelectorAll(".community-pagenation a").forEach(function(pageItem) {
    pageItem.addEventListener("click", function(event) {
        event.preventDefault(); 

        if (!pageItem.classList.contains("arrow")) {
            // 모든 페이지 링크에서 active 클래스 제거
            document.querySelectorAll(".community-pagenation a").forEach(function(item) {
                item.classList.remove("pagenation-active");
            });
            // 클릭된 페이지 링크에 active 클래스 추가
            pageItem.classList.add("pagenation-active");
        }
    });
});

// 좌우 화살표 클릭 이벤트
document.querySelectorAll(".community-pagenation .arrow").forEach(function(arrow) {
    arrow.addEventListener("click", function(event) {
        
        // 화살표 클릭 시 잠깐 배경색 변경 효과
        arrow.classList.add("pagenation-active");
        setTimeout(function() {
            arrow.classList.remove("pagenation-active");
        }, 200);
    });
});