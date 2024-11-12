function confirmDelete(inquiryNo) {
	console.log("삭제 확인 함수 호출됨"); // 추가된 로그
    const confirmation = confirm("정말로 이 게시글을 삭제하시겠습니까?");
    if (confirmation) {
        // 확인을 누르면 삭제 요청으로 리다이렉트
        location.href = '/customer/deleteInquiry?inquiryNo=' + inquiryNo;
    }
    // 취소를 누르면 아무것도 하지 않음
}