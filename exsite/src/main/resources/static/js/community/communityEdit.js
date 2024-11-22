function updateCategory(element) {
    const selectedCategory = $(element).text(); // 선택된 드롭다운 아이템을 변수에 초기화
    $('#dropdownMenuButton').text(selectedCategory); // 버튼 텍스트를 선택한 카테고리로 변경
    $('#dropdownMenuButton').attr("data-value", selectedCategory); // 선택된 카테고리를 data-value에 저장
}

$(document).ready(function(){
  
    // summernote 파일업로드 함수
    // imgList: file 객체 리스트(배열)
    function imageUpload(imgList){

        const formData = new FormData();
        for(let file of imgList){
            formData.append("imgList", file);
        }

        $.ajax({
            url: '/upload',
            type: 'post',
            data: formData,
            processData: false,
            contentType: false, 
            success: (result) => {
              for(let imgSrc of result){
                $("#summernote").summernote("editor.insertImage", imgSrc);
              }
            },
            error: (err)=>{
              console.log(err);
              alert('문제가 발생했습니다.');
            }
        });
    };

  // 텍스트 에디터 summernote 노출시키는 함수
  $('#summernote').summernote({
    tabsize: 2,
    height: 120,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['picture']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    callbacks: {
      onImageUpload: imageUpload,
      onChange: (contents) => {
        const maxLength = 1000; // 최대 길이
        const textContent = $(contents).text(); // 태그를 제외한 순수 텍스트 길이 계산
  
        if (textContent.length > maxLength) {
          alert(`최대 ${maxLength}자를 초과할 수 없습니다.`);
          // 길이를 초과하면 마지막 입력을 제거
          $('#summernote').summernote('code', contents.substring(0, maxLength));
        } else {
          setContent(contents); // 정상적인 경우에만 상태 업데이트
        }
      }
    }
  });

  // 글수정 메소드 요청 함수
  $('.community-submit-btn').click(()=>{
     
    const category = $('#dropdownMenuButton').attr("data-value"); // 카테고리 가져오기
    const title = $('#title').val();  // 제목 가져오기
    const content = $('#summernote').summernote('code');  // Summernote의 HTML 콘텐츠 가져오기
    const postNo = $('#postNo').val();  // input hidden의 postNo 가져오기

    // 제목과 내용이 비어있는지 확인
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용은 필수로 입력해야합니다.");
      return; // 서버 요청을 보내지 않고 함수 종료
    }   

    $.ajax({
      url: "/community/board/edit",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
          postCategory: category,
          postTitle: title,
          postContent: content,
          postNo: postNo,
      }),
      success: function(result) {
        if(result ==='ok'){
          alert("게시글이 수정되었습니다.");
          window.location.href = '/community/list'; // 목록 페이지로 이동
        } else {
          alert("게시글 작성 실패");
        }
      },
      error: function(error) {
          // 요청이 실패하면 실행되는 코드
          console.error("오류 발생:", error);
          alert("데이터 전송에 실패했습니다.");
      }
    });
  });
});


