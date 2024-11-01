/**
 * 
 */

document.querySelectorAll(".header-nav").forEach(function(navItem) {
    navItem.addEventListener("click", function(event) {
        event.preventDefault(); // 링크 기본 동작 방지

        // 모든 .header-nav 요소에서 'active' 클래스를 제거
        document.querySelectorAll(".header-nav").forEach(function(item) {
            item.classList.remove("active");
        });
        
        // 클릭된 요소에 'active' 클래스 추가
        navItem.classList.add("active");
    });
});

