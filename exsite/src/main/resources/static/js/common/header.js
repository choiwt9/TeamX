document.querySelectorAll(".header-nav").forEach(function(navItem) {
    navItem.addEventListener("click", function(event) {
        event.preventDefault(); // 기본 링크 이동 방지

        // 모든 .header-nav 요소에서 'active' 클래스를 제거
        document.querySelectorAll(".header-nav").forEach(function(item) {
            item.classList.remove("active");
        });

        // 클릭된 요소에 'active' 클래스 추가
        navItem.classList.add("active");

        // 현재 클릭한 항목의 href를 저장
        const href = navItem.getAttribute('href');
        if (href) {
            localStorage.setItem("activeNav", href);
            window.location.href = href; // 페이지 이동
        }
    });
});

// 페이지 로드 시 마지막으로 클릭된 nav에 active 클래스 추가
window.addEventListener("DOMContentLoaded", function() {
    const activeNav = localStorage.getItem("activeNav");
    if (activeNav) {
        const activeElement = document.querySelector(`.header-nav[href="${activeNav}"]`);
        if (activeElement) {
            activeElement.classList.add("active");
        }
    }
});

// 검색버튼 클릭 시, 검색 결과 페이지로 이동하는 함수
function redirectToSearchResultPage() {
    const searchTerm = $('#header-search-input').val().trim();  // 검색어 가져오기

    if (!searchTerm) {
        alert("검색어를 입력해주세요.");
        return;
    }

    // 검색어를 URL에 query 파라미터로 추가하여 검색 결과 페이지로 이동
    window.location.href = "/search/results?page=1&query=" + encodeURIComponent(searchTerm);
}

onload = () => {
    document.title = 'EX-SITE';
 }