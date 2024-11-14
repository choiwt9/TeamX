// 검색기능 호출함수
function loadSearchResultList(){

    $.ajax({
        url: "/main/search/result/list",
        method: "GET",
        data: { keyword: keyword },
        success: function(searchResultList){
            let searchResultInfoArea = $('.search-result-info-area'); // search-result 영역 요소 선택
            searchResultInfoArea.empty(); // 기존 내용 제거

            searchResultList.forEach(function(searchResultList){
                const searchResultHtml = `
                    <div class="search-result-exhibition-item">
                        <a href="/exhibition/detail?id=${searchResultList.exhibitionNo}">
                            <div class="search-result-item-image-wrapper">
                                <img class="search-result-item-image" src="${searchResultList.mainImg}" alt="전시썸네일">
                            </div>
                            <ul class="search-result-item-textarea">
                                <li class="search-result-item-title">${searchResultList.title}</li>
                                <li class="search-result-item-place">${searchResultList.place}</li>
                                <li class="search-result-item-date">${searchResultList.exDate}</li>
                            </ul>
                        </a>
                    </div>
                `;
                searchResultInfoArea.append(searchResultHtml);
            });
        },
        error: function(error){
            console.log("search-result 데이터를 가져오지 못했습니다.", error);
            
        }
    })
}