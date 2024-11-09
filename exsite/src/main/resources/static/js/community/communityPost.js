function insertParentReply(){

    //입력된 내용이 있을 경우 추가 요청하도록 --trim()넣어서 공백은 제거
   if ( $(".community-comment-input").val().trim().length>0 ){

      $.ajax({
         url : "/community/parentReply", 
         data : {
            parentReplyContent: $(".community-comment-input").val()
            , postNo: $('#postNo').val()
         },
         success: function(result){   
            console.log(result);
            //댓글 추가 성공 시, 입력창 부분을 초기화 댓글 목록 다시 조회
            if (result == "ok") {
               $(".community-comment-input").val('');
               // selectReplyList();                   
            } else {
               //댓글 추가 실패 시, '댓글 추가에 실패했습니다.'메시지를 출력(alert)
               alert("댓글 추가에 실패했습니다.");   
            }
         },
         error: function(err) {   //요청실패 시 (통신실패)
            console.log("댓글 추가 요청 실패!");
            console.log(err);
         }
      });
   } else {
    alert("내용 입력 후 추가 가능합니다.");
   }
}