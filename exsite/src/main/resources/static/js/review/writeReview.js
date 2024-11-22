$(function() {

  let selectedExhibitionTitle = '';
  let selectedMerchantUid = '';
  let selectedExhibitionNo = sessionStorage.getItem("exhibitionNo");
  

  $('.dropdown-toggle').click(function() {
    if($('.dropdown-item').length === 0) {
      alert('리뷰 작성 가능한 전시회가 없습니다.');
    }
  });

  // jQuery로 클릭된 항목 처리
  $(document).on('click', '.dropdown-item', function () {
    selectedExhibitionTitle = $(this).text().trim(); // 선택된 제목 텍스트
    selectedMerchantUid = $(this).data('merchant-uid'); // data-merchant-uid 값
    selectedExhibitionNo = $(this).data('exhibition-no');
    $('#festa-title').text(selectedExhibitionTitle); // festa-title 버튼 업데이트

    console.log("Selected Title:", selectedExhibitionTitle);
    console.log("Selected MerchantUid:", selectedMerchantUid);
});

  $('#resist').on('click', function() {
    console.log(selectedExhibitionTitle);
    console.log(selectedMerchantUid);
    console.log($('#review-title').val());
    console.log($('#review-content').val());
    console.log(JSON.stringify($('#review-content').val()));
    $.ajax({
      url: '/review/write/confirm',
      type: 'post',
      data: {
        exhibitionTitle: selectedExhibitionTitle,
        merchantUid: selectedMerchantUid,
        reviewTitle: $('#review-title').val(),
        reviewContent: $('#review-content').val()
      },
      success: () => {
        location.href="/exhibition/detail?id="+selectedExhibitionNo;
      },
      error:(err)=> {
        alert(err.responseText);
        if(err.responseText === '로그인한 상태에서 작성 가능합니다.') {
          location.href="/login";
        }
        
      }
    });
  });
})
