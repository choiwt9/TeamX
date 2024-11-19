$(document).ready(function () {
  $('.clickable-row').on('click', function () {
      const exhibitionId = $(this).data('exhibition-id'); // data-exhibition-id 값 가져오기
      window.location.href = `/exhibition/detail?id=${exhibitionId}`; // 해당 URL로 이동
  });
});