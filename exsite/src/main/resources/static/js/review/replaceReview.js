$(function() {
  let reviewTitle = sessionStorage.getItem("reviewTitle");
  let reviewContent = sessionStorage.getItem("reviewContent");
  let exhibitionNo = sessionStorage.getItem("exhibitionNo");
  let merchantUid = sessionStorage.getItem("merchantUid");
  $('#review-title').val(reviewTitle);
  $('#review-content').val(reviewContent);

  $('#replace').on('click', function() {
    $.ajax({
      url: '/review/replace/confirm',
      type: 'post',
      data: {
        reviewTitle: $('#review-title').val(),
        reviewContent: $('#review-content').val(),
        merchantUid: merchantUid
      },
      success: (result) => {
        alert(result);
        
        if (exhibitionNo) {
          location.href = "/exhibition/detail?id=" + exhibitionNo;
        } else {
          alert("전시 정보를 찾을 수 없습니다.");
          // 필요시 다른 페이지로 이동
          location.href = "/exhibition/list";
        }
      },
      error: (err) => {
        alert(err.responseText);
        if(err.responseText === '로그인한 상태에서 수정 가능합니다.') {
          location.href="/login";
        }
      }
    });
  });
});