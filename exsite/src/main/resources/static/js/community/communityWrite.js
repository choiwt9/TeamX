// 선택된 카테고리를 버튼 텍스트에 표시하는 함수
function updateCategory(element) {
    document.getElementById("dropdownMenuButton").textContent = element.textContent;
}