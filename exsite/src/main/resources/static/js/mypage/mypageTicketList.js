$(function() {


  let ticketingDateRange = sessionStorage.getItem('ticketingDateRange') || '전체기간'; // 기본값 설정


  $(".mypage-view-ticket-category-nav").each(function() {
    if ($(this).text().trim() === ticketingDateRange) {
      $(this).addClass("nav-bar-active");
    } else {
      $(this).removeClass("nav-bar-active");
    }
  });

  // 페이지네이션의 링크에 기간 정보 추가
  function updatePaginationLinks() {
    $('.pagination .page-link').each(function() {
      let href = $(this).attr('href'); // 기존 href 값 가져오기
      if (href && href !== '#') {
        // 기존에 붙어 있는 ticketingDateRange 제거
        href = href.split('&ticketingDateRange=')[0];
        // 기간 정보를 추가
        $(this).attr('href', href + '&ticketingDateRange=' + encodeURIComponent(ticketingDateRange));
      }
    });
  }

  // 페이지 로드 시 sessionStorage 값 사용
  updatePaginationLinks();

  // 버튼 클릭 이벤트
  $('.mypage-view-ticket-category-nav').on('click', function() {
    ticketingDateRange = $(this).text().trim(); // 선택된 텍스트
    sessionStorage.setItem('ticketingDateRange', ticketingDateRange); // sessionStorage에 저장
    console.log('선택된 기간:', ticketingDateRange);

    // 페이지 이동
    location.href = "/mypage/view?view=ticketList&currentPage=1&ticketingDateRange=" + encodeURIComponent(ticketingDateRange);
  });

});
