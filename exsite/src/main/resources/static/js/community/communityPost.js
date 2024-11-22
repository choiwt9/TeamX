$(document).ready(function(){
   // 댓글 조회 함수 호출
   selectParentReply();

   // 댓글 입력창에서 엔터 시 검색버튼 클릭 이벤트 호출
   $('#community-parentReply-input').keyup(function(event){
      if (event.key === "Enter") {
         insertParentReply();
      }
   });


});

// 글삭제 메소드 요청 함수
$('.community-delete-btn').click(()=>{

   const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");

   if(isConfirmed){
      const postNo = $('#postNo').val();

      $.ajax({
         url: "/community/board/delete",
         type: "POST",
         contentType: "application/json",
         data: JSON.stringify({
             postNo: postNo,
             userNo: userNo
         }),
         success: function(result) {
           if(result ==='ok'){
             alert("게시글이 삭제되었습니다.");
             window.location.href = '/community/list'; // 목록 페이지로 이동
           } else {
             alert("게시글 삭제 실패");
           }
         },
         error: function(error) {
             // 요청이 실패하면 실행되는 코드
             console.error("오류 발생:", error);
             alert("게시글 삭제에 실패했습니다.");
         }
       });
   }
});


// 총 댓글 카운트용 변수
let totalReplyCount = 0;

// 부모댓글 조회 함수
function selectParentReply(){
   const postNo =  $('#postNo').val()
   
   $.ajax({
      url: "/community/parent/reply/select/" + postNo,
      success: function(result){
         // console.log(result);
         // console.log(result.length);
         
         if(result != null && result.length > 0){
            let parentReplyValue = "";

            for(let r of result){
               // 유저아이디 일치하고, 댓글상태 삭제가 아닐때
               if(userId === r.userId && r.parentReplyStatus == "N"){
                  parentReplyValue += "<div class='comment-item' id='comment-" + r.parentReplyNo + "'>"
                                       + "<div class='comment-info'>"
                                          + "<span class='comment-author'>" + r.userId + "</span>"
                                          + "<span class='comment-date'>" + r.parentReplyDatetime + "</span>"
                                       + "</div>"
                                       + "<div class='comment-content'>"+ r.parentReplyContent +"</div>"
                                       + "<div class='communityPost-comment-btn-section'>"
                                          + " <button type='button' class='commuity-btn community-reply-btn' data-comment-id='" + r.parentReplyNo + "'>답글</button>"
                                          + "<div>"
                                             + " <button type='button' class='commuity-btn community-comment-edit-btn' data-comment-id='" + r.parentReplyNo + "'>수정</button>"
                                             + " <button type='button' class='commuity-btn community-comment-delete-btn' data-comment-id='" + r.parentReplyNo + "'>삭제</button>"
                                          + "</div>"
                                       + "</div>"   
                                    + "</div>"
               // 댓글상태 삭제일때
               } else if(r.parentReplyStatus == "Y"){
                  parentReplyValue += "<div class='comment-item deleted-comment' id='comment-" + r.parentReplyNo + "'>"
                                       + "<div class=comment-content'>삭제된 댓글입니다.</div>"
                                    + "</div>"
               // 유저아이디 불일치, 댓글상태 삭제 아닐때                     
               } else {
                  parentReplyValue += "<div class='comment-item' id='comment-" + r.parentReplyNo + "'>"
                                       + "<div class='comment-info'>"
                                          + "<span class='comment-author'>" + r.userId + "</span>"
                                          + "<span class='comment-date'>" + r.parentReplyDatetime + "</span>"
                                       + "</div>"
                                       + "<div class='comment-content'>"+ r.parentReplyContent +"</div>"
                                       + "<div class='communityPost-comment-btn-section'>"
                                          + "<button type='button' class='commuity-btn community-reply-btn' data-comment-id='" + r.parentReplyNo + "'>답글</button>"
                                       + "</div>"   
                                    + "</div>"
               }

               // 자식 댓글을 조회하는 함수 호출(부모 댓글 매개변수로 전달)
               selectChildrenReply(r.parentReplyNo , userId);
            }

            $(".communityPost-comment-section").html(parentReplyValue);
            totalReplyCount = result.length;
            $(".count-comment").text(totalReplyCount);
            
            // 답글 버튼 이벤트 등록
            $('.community-reply-btn').on('click',function () {
               

               // 현재 클릭한 답글 버튼이 포함된 댓글 항목
               const commentItem = $(this).closest('.comment-item');

               // 현재 댓글에 답글 입력 폼이 있는지 확인
               const existingForm = commentItem.find('.reply-form');

               // 답글 폼이 이미 있는 경우 제거 (여기서는 해당 댓글 내에 폼이 있는 경우만)
               if (existingForm.length > 0) {
                  existingForm.remove();
               } else {
                  // 이전에 생성된 모든 답글 입력폼 제거
                  $('.reply-form').remove();

                  // 현재 댓글의 고유번호 가져오기
                  const commentId = $(this).data('comment-id');

                  // console.log("부모댓글값:"+commentId);
                  
                  // 답글 입력 폼 추가 HTML
                  const replyForm = `
                     <div class="reply-form">
                           <input type="text" class="community-btn community-comment-input reply-input" maxlength="499" placeholder="답글 입력">
                           <button type="button" class="community-btn community-submit-btn reply-submit-btn" onclick="insertChildrenReply(${commentId}, this);">등록</button>
                     </div>
                  `;
                  
                  // 답글 버튼 아래에 답글 입력 폼 추가
                  commentItem.find('.communityPost-comment-btn-section').after(replyForm);
                  
                 const replySubmitBtn = $('.reply-submit-btn');

                  // 답글 입력창에서 엔터 시 검색버튼 클릭 이벤트 호출
                  $('.reply-input').keyup(function(event){
                     if (event.key === "Enter") {
                        insertChildrenReply(commentId, replySubmitBtn);
                     }
                  });

               }
           });
         }

      },
      error: function(err){
         console.log("댓글 조회 실패");
         console.log(err);
      }
   });
}

// 자식댓글 조회 함수
function selectChildrenReply(parentReplyNo, userId){
   // 기존 자식 댓글을 먼저 제거
   $("#comment-" + parentReplyNo).nextAll(".reply-item").remove();

   $.ajax({
      url: "/community/children/reply/select/" + parentReplyNo,
      success: function(children){

         if(children != null && children.length > 0){
            let childrenReplyValue = "";

            for(let child of children){
               // 유저아이디 일치, 답글상태 삭제 아닐때
               if(userId === child.userId && child.childrenReplyStatus == "N"){
                  childrenReplyValue += "<div class='reply-item'>"
                                          + "<div class='comment-info'>"
                                             + "<span class='comment-author'><img src='/img/community/reply-arrow.png' alt='답글아이콘'>" + '&nbsp' + child.userId + "</span>"
                                             + "<span class='comment-date'>" + child.childrenReplyDatetime + "</span>"
                                          + "</div>"
                                          + "<div class='comment-content'>"
                                             // + "<span id='child-reply-userId-span'>" + child.userId + "</span>"
                                             + "<span id='child-reply-userId-span'></span>"
                                             + "<span id='child-reply-content-span'>" + child.childrenReplyContent + "</span>"
                                          + "</div>"
                                          + "<div class='communityPost-reply-btn-section'>"
                                             + "<button type='button' class='commuity-btn community-reply-edit-btn' data-comment-id='" + child.childrenReplyNo + "'>수정</button>"
                                             + "<button type='button' class='commuity-btn community-reply-delete-btn' data-comment-id='" + child.childrenReplyNo + "'>삭제</button>"
                                          + "</div>"
                                       + "</div>";
                // 답글상태 삭제일때
               } else if(child.childrenReplyStatus == "Y"){
                  childrenReplyValue = ""
               // 유저아이디 불일치, 답글상태 삭제 아닐때                     
               } else {
                  childrenReplyValue += "<div class='reply-item'>"
                     + "<div class='comment-info'>"
                        + "<span class='comment-author'><img src='/img/community/reply-arrow.png' alt='답글아이콘'>" + '&nbsp' + child.userId + "</span>"
                        + "<span class='comment-date'>" + child.childrenReplyDatetime + "</span>"
                     + "</div>"
                     + "<div class='comment-content'>"
                        // + "<span id='child-reply-userId-span'>" + child.userId + "</span>"
                        + "<span id='child-reply-userId-span'></span>"
                        + "<span id='child-reply-content-span'>" + child.childrenReplyContent + "</span>"
                     + "</div>"
                  + "</div>";
               }
            }

            // 부모 댓글 바로 아래에 자식 댓글을 형제 관계로 추가
            $("#comment-" + parentReplyNo).after(childrenReplyValue);
            totalReplyCount += children.length;
            $(".count-comment").text(totalReplyCount);
         }
      },
      error: function(err){
         console.log("자식댓글 조회 실패");
         console.log(err);
      }
   });
}

// 부모댓글 입력 함수
function insertParentReply(){

   //입력된 내용이 있을 경우 추가 요청하도록 --trim()넣어서 공백은 제거
   if ( $("#community-parentReply-input").val().trim().length>0 ){

      $.ajax({
         url : "/community/parent/reply/insert", 
         method: 'post',
         data : {
            parentReplyContent: $("#community-parentReply-input").val()
            , postNo: $('#postNo').val()
         },
         success: function(result){   
            // console.log(result);
            //댓글 추가 성공 시, 입력창 부분을 초기화 댓글 목록 다시 조회
            if (result == "ok") {
               $("#community-parentReply-input").val('');
               selectParentReply();                 
            } else {
               //댓글 추가 실패 시, '댓글 추가에 실패했습니다.'메시지를 출력(alert)
               alert("로그인 후 댓글을 등록해주세요.");   
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

// 답글(자식댓글) 입력 함수
function insertChildrenReply(parentReplyNo, button){

   if( $(button).siblings('.reply-input').val().trim().length > 0 ){
      $.ajax({
         url: "/community/children/reply/insert",
         method: 'post',
         data: {
            childrenReplyContent: $('.reply-input').val(),
            postNo: $('#postNo').val(),
            parentReplyNo: parentReplyNo
         },
         success: function(result){
            if(result=='ok'){
               $('.reply-form').remove();
               selectParentReply(parentReplyNo, userId);
            } else{
               alert("로그인 후 답글을 등록해주세요.")
            }
         },
         error: function(err){
            console.log("댓글 추가 요청 실패!");
            console.log(err);
         }
      })
   } else {
      alert("내용 입력 후 추가 가능합니다.");
   }
}

// 댓글 삭제 요청 함수
$(document).on('click', '.community-comment-delete-btn', function () {

   // 삭제 확인 메시지
   const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

   if (isConfirmed) {
      // 삭제 버튼이 클릭된 댓글의 고유 번호 가져오기
      const parentReplyNo = $(this).data('comment-id');

      // 댓글 삭제 요청
      $.ajax({
         url: "/community/parent/reply/delete",
         type: "POST",
         contentType: "application/json",
         data: JSON.stringify({
            parentReplyNo: parentReplyNo,
         }),
         success: function (result) {
               if (result === 'ok') {
                  alert("댓글이 삭제되었습니다.");
                  // 댓글 목록을 다시 조회해서 갱신
                  selectParentReply();
               } else {
                  alert("댓글 삭제 실패");
               }
         },
         error: function (error) {
               // 요청이 실패하면 실행되는 코드
               console.error("오류 발생:", error);
               alert("댓글 삭제에 실패했습니다.");
         }
      });
   }
});

// 답글 삭제 요청 함수
$(document).on('click', '.community-reply-delete-btn', function () {

   // 삭제 확인 메시지
   const isConfirmed = window.confirm("답글을 삭제하시겠습니까?");

   if (isConfirmed) {
      // 삭제 버튼이 클릭된 댓글의 고유 번호 가져오기
      const childrenReplyNo = $(this).data('comment-id');

      // 댓글 삭제 요청
      $.ajax({
         url: "/community/children/reply/delete",
         type: "POST",
         contentType: "application/json",
         data: JSON.stringify({
            childrenReplyNo: childrenReplyNo,
            userNo: userNo
         }),
         success: function (result) {
               if (result === 'ok') {
                  alert("답글이 삭제되었습니다.");
                  // 댓글 목록을 다시 조회해서 갱신
                  selectParentReply();
               } else {
                  alert("답글 삭제 실패");
               }
         },
         error: function (error) {
               // 요청이 실패하면 실행되는 코드
               console.error("오류 발생:", error);
               alert("답글 삭제에 통신 실패했습니다.");
         }
      });
   }
});

// 댓글 수정 클릭 이벤트 등록
$(document).on('click', '.community-comment-edit-btn', function(){
   // 기존 모든 입력 폼 제거
    $('.reply-form').remove();

   // 현재 클릭한 답글 버튼이 포함된 댓글 항목
   const commentItem = $(this).closest('.comment-item');

   // 현재 댓글에 답글 입력 폼이 있는지 확인
   const existingForm = commentItem.find('.reply-form');

   // 답글 폼이 이미 있는 경우 제거 (여기서는 해당 댓글 내에 폼이 있는 경우만)
   if (existingForm.length > 0) {
      existingForm.remove();
   } else {
      // 이전에 생성된 모든 답글 입력폼 제거
      $('.reply-form').remove();

      // 현재 댓글의 고유번호 가져오기
      const commentId = $(this).data('comment-id');

      // 수정 입력 폼 추가 HTML
      const replyForm = `
         <div class="reply-form">
               <input type="text" class="community-btn community-comment-input reply-input" id="community-edit-parent-reply-input" maxlength="499">
               <button type="button" class="community-btn community-submit-btn" onclick="editParentReply(${commentId}, this);">수정</button>
         </div>
      `;
      
      // 답글 버튼 아래에 답글 입력 폼 추가
      commentItem.find('.communityPost-comment-btn-section').after(replyForm);
   }
   
});

// 댓글 수정 요청 함수
function editParentReply(parentReplyNo, button){

   if( $(button).siblings('.reply-input').val().trim().length > 0 ){
      $.ajax({ 
         url: "/community/parent/reply/edit",
         method: "POST",
         data:{
            parentReplyContent: $('.reply-input').val(),
            parentReplyNo: parentReplyNo,
            userNo: userNo
         },
         success: function(result){
            if(result=='ok'){
               $('.reply-form').remove();
               selectParentReply();
            } else{
               alert("댓글 수정에 실패했습니다.")
            }
         },
         error: function(err){
            console.log("댓글 수정 요청 통신 실패!");
            console.log(err);
         }
      })
   } else {
      alert("내용 입력 후 추가 가능합니다.");
   }
}

// 답글 수정 클릭 이벤트 등록
$(document).on('click', '.community-reply-edit-btn', function(){
   // 기존 모든 입력 폼 제거
    $('.reply-form').remove();

   // 현재 클릭한 수정 버튼이 포함된 댓글 항목
   const replyItem = $(this).closest('.reply-item');

   // 현재 댓글에 답글 입력 폼이 있는지 확인
   const existingForm = replyItem.find('.reply-form');

   // 답글 폼이 이미 있는 경우 제거 (여기서는 해당 댓글 내에 폼이 있는 경우만)
   if (existingForm.length > 0) {
      existingForm.remove();
   } else {
      // 이전에 생성된 모든 답글 입력폼 제거
      $('.reply-form').remove();

      // 현재 댓글의 고유번호 가져오기
      const replyId = $(this).data('comment-id');

      // 수정 입력 폼 추가 HTML
      const replyForm = `
         <div class="reply-form" id="reply-edit-form">
               <input type="text" class="community-btn community-comment-input reply-input" id="community-edit-children-reply-input" maxlength="499">
               <button type="button" class="community-btn community-submit-btn" onclick="editChildrenReply(${replyId}, this);">수정</button>
         </div>
      `;
      
      // 답글 버튼 아래에 답글 입력 폼 추가
      replyItem.find('.communityPost-reply-btn-section').after(replyForm);
   }
});

// 답글 수정 요청 함수
function editChildrenReply(childrenReplyNo, button){

   if( $(button).siblings('.reply-input').val().trim().length > 0 ){
      $.ajax({ 
         url: "/community/children/reply/edit",
         method: "POST",
         data:{
            childrenReplyContent: $('.reply-input').val(),
            childrenReplyNo: childrenReplyNo,
            userNo: userNo
         },
         success: function(result){
            if(result=='ok'){
               $('.reply-form').remove();
               selectParentReply();
            } else{
               alert("답글 수정에 실패했습니다.")
            }
         },
         error: function(err){
            console.log("답글 수정 요청 통신 실패!");
            console.log(err);
         }
      })
   } else {
      alert("내용 입력 후 추가 가능합니다.");
   }
}

// 신고 요청 함수
function increaseReportCount(){
   
      if(userNo && userNo !== ''){
         $.ajax({
            url: '/community/board/report', // 신고 테이블에 유저 추가
            type: 'post',
            data: {
               userNo: userNo,
               postNo: $('#postNo').val()
            },
            success: function(response){
               if (response.status === "ok") {
                  alert('게시물이 신고되었습니다.');
                  if (response.isDeleted) {
                      // 게시글이 삭제된 경우 리스트 페이지로 이동
                      alert('게시글 신고 수가 초과되어 게시물이 삭제되었습니다.');
                      window.location.href = '/community/list';
                  } else {
                      // 게시글이 삭제되지 않은 경우 별도 처리 없음
                  }
               } else {
                     alert('이미 신고한 게시글입니다.');
               }
            },
            error: function(err){
               console.log("게시글 신고 요청 통신 실패!");
               console.log(err);
            }
         });
      } else{
         alert('게시글 신고는 로그인 후에 이용해주세요.');
      }
};