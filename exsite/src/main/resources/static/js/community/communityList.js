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
document.querySelectorAll(".pagination .page-number").forEach(function(pageItem) {
    pageItem.addEventListener("click", function(event) {

        // 모든 페이지 링크에서 active 클래스 제거
        document.querySelectorAll(".page-number").forEach(function(item) {
            item.classList.remove("pagenation-active");
        });
        // 클릭된 페이지 링크에 active 클래스 추가
        pageItem.classList.add("pagenation-active");
    });
});

// 좌우 화살표 클릭 이벤트
document.querySelectorAll(".pagenation .arrow").forEach(function(arrow) {
    arrow.addEventListener("click", function(event) {
        
        // 화살표 클릭 시 잠깐 배경색 변경 효과
        arrow.classList.add("pagenation-active");
        setTimeout(function() {
            arrow.classList.remove("pagenation-active");
        }, 200);
    });
});

// // 글쓰기 버튼 클릭 시 로그인 여부 확인
// $(document).ready(function() {
    
//     $('.community-write-botton').click(function() {
//         $.ajax({
//             url: '/api/check-login',
//             type: 'GET',
//             success: function(isLoggedIn) {
//                 if (isLoggedIn) {
//                     // 로그인 상태일 경우 글쓰기 페이지로 이동 (예시 URL)
//                     window.location.href = '/community/write';
//                 } else {
//                     // 비로그인 상태일 경우 로그인 페이지로 이동
//                     alert("로그인이 필요합니다.");
//                     window.location.href = '/login';
//                 }
//             },
//             error: function(error) {
//                 console.error("로그인 상태 확인 오류:", error);
//                 alert("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
//             }
//         });
//     });
// });