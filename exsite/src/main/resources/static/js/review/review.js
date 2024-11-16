$(function() {

  // 리뷰내용 간략히, 더보기
  $(document).ready(function () {
      $("#more").click(function () {
          const $textContent = $("#review-content");
          $textContent.toggleClass("expanded");
  
          if ($textContent.hasClass("expanded")) {
              $(this).text("간략히");
          } else {
              $(this).text("더보기");
          }
      });
  });

  $('#write-review').click(function () {
    sessionStorage.setItem("exhibitionNo", $('#exhibitionNo').val())
      $.ajax({
          url: '/review/write',
          type: 'get',
          data: {},
          success: (result)=> {
              console.log(result);

              location.href="/review/write/form?exhibitionNo="+sessionStorage.getItem("exhibitionNo");
          },
          error: (err)=>{
              if(err === '리뷰 작성은 로그인해야 가능합니다.') {
                  location.href="/login"
              }
              alert(err.responseText);
          }
      });
  });
  
  $('.review-buttons').each(function() {
      const userNo = $(this).data('user-no'); // 리뷰 작성자 번호
      const loginUserNo = $(this).data('login-user-no'); // 로그인한 사용자 번호
      
      // 조건이 맞지 않으면 버튼 숨기기
      if (userNo !== loginUserNo) {
          $(this).hide(); // jQuery를 사용해 버튼 숨김
      }
  });

  // 리뷰 수정 버튼 클릭 시 리뷰 수정에 필요한 merchantUid, 기존 리뷰 제목, 기존 내용
  // 을 sessionStorage에 담아 수정 페이지로 이동
  let exhibitionNo = $('#exhibitionNo').val();
  let merchantUid = $('#replace').data("merchant-uid");
  let reviewTitle = $('#review-title').text();
  let reviewContent = $('#review-content').text();
  $('#replace').on('click', function() {
      sessionStorage.setItem("reviewTitle", reviewTitle);
      sessionStorage.setItem("merchantUid", merchantUid);
      sessionStorage.setItem("reviewContent", reviewContent);
      sessionStorage.setItem("exhibitionNo", exhibitionNo);
     location.href="/review/replace/form";
  });

  $('#delete').on('click', function() {
    let answer = confirm('리뷰를 삭제하시겠습니까? 삭제한 리뷰는 다시 작성할 수 없습니다.');
    console.log(answer);
    if(answer === true) {
        $.ajax({
            url: '/review/delete',
            type: 'put',
            data: {
                merchantUid: merchantUid
            },
            success: (result) => {
                alert(result);
                location.href="/exhibition/detail?id="+exhibitionNo;
            },
            error: (err) => {
                alert(err.responseText);
            }
        });
    }
  })



});
