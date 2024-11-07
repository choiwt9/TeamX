// 선택된 카테고리를 버튼 텍스트에 표시하는 함수
function updateCategory(element) {
    document.getElementById("dropdownMenuButton").textContent = element.textContent;
}


// summernote, 파일업로드
$(document).ready(function(){

    // imgList: file 객체 리스트(배열)
    const imageUpload = (imgList) => {
      console.log(imgList);
      
      // 텍스트 에디터에 이미지가 추가되었을 때
      // summernote 에서는 이미지 파일을 전달해준다. --> callbacks.onImageUpload

      // 이미지가 추가되면 우리 서버에 따로 업로드 후 해당 이미지 경로를 세팅해줘야 함.
      
      // form 태그에서는 enctype을 multipart/form-data 로 설정하여 전송했으며
      // 스크립트 상으로는 FormData 객체를 사용하여 ajax 요청을 할 것임.

      const formData = new FormData();
      for(let file of imgList){
        formData.append("imgList", file);
      }

      $.ajax({
        url: 'upload',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false, // application/x-www-form-... (default) -> multipart/form-data
        success: (result) => {
          console.log(result);  // ["xxx.xx, "xx.xx", ...]
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

  // 1) 텍스트 에디터 표시
  $('#summernote').summernote({
    placeholder: 'Hello stand alone ui',
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


  $('.community-submit-btn').click(()=>{
    
    const title = $('.form-control').val();  // 제목 가져오기
    const content = $('#summernote').summernote('code');  // Summernote의 HTML 콘텐츠 가져오기

    $.ajax({
      url: "/community/write",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
          title: title,
          content: content
      }),
      success: function(result) {
        if(result ==='ok'){
          alert("게시글 작성 성공");
          initBoard();
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

  const initBoard = () =>{
    $('#summernote').summernote('reset');
    $('.form-control').val('');
  }
})