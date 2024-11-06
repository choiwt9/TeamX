/**
 * 
 */

 // "이용약관" 텍스트 클릭 시 모달을 표시
document.getElementById("termsText").addEventListener("click", function() {
    var termsModal = new bootstrap.Modal(document.getElementById("termsModal"));
    termsModal.show();
});

 // "개인정보처리방침" 텍스트 클릭 시 모달을 표시
document.getElementById("privacyText").addEventListener("click", function() {
    var privacyModal = new bootstrap.Modal(document.getElementById("privacyModal"));
    privacyModal.show();
});