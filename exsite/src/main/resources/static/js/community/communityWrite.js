function updateCategory(element) {
    const selectedCategory = $(element).text();
    $('#dropdownMenuButton').text(selectedCategory); // 버튼 텍스트를 선택한 카테고리로 변경
    $('#dropdownMenuButton').attr("data-value", selectedCategory); // 선택된 카테고리를 data-value에 저장
}

$(document).ready(function(){
  
  // summernote, 파일업로드
  // imgList: file 객체 리스트(배열)
  const imageUpload = (imgList) => {
    // console.log(imgList);

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
        // console.log(result);  
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

  // 텍스트 에디터 표시
  $(document).ready(function(){
    $('#summernote').summernote({
      placeholder: '내용을 입력하세요',
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
        onImageUpload: imageUpload
      }
    });

    // 글작성 메소드 요청 함수
    $('.community-submit-btn').click(()=>{
      // console.log($('#dropdownMenuButton').attr("data-value"));
      const category = $('#dropdownMenuButton').attr("data-value");
      const title = $('#title').val();  // 제목 가져오기
      const content = $('#summernote').summernote('code');  // Summernote의 HTML 콘텐츠 가져오기
      
      // 제목과 내용이 비어있는지 확인
      if (!title.trim()) {
        alert("제목과 내용은 필수로 입력해야합니다.");
        return; // 서버 요청을 보내지 않고 함수 종료
      } 

      if (!content.trim()) {
        alert("제목과 내용은 필수로 입력해야합니다.");
        return; // 서버 요청을 보내지 않고 함수 종료
      } 
      
      // 카테고리 선택여부 확인
      if(!category){
        alert("카테고리를 선택해주세요.");
        return; // 서버 요청을 보내지 않고 함수 종료
      }

      $.ajax({
        url: "/community/board/write",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            postCategory: category,
            postTitle: title,
            postContent: content,
        }),
        success: function(result) {
          if(result ==='ok'){
            alert("게시글 작성 성공");
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
    })
  });
});
