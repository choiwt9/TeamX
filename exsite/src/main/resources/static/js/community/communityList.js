$(document).ready(function() {
    let selectedCategory = "전체"; // 현재 선택된 카테고리 상태
    let currentPage = 1; // 현재 페이지 상태

    // 네비게이션 클릭 이벤트
    document.querySelectorAll(".community-category-nav").forEach(function(navItem) {
        navItem.addEventListener("click", function(event) {
            event.preventDefault();

            // 모든 nav 요소에서 'active' 클래스를 제거
            document.querySelectorAll(".community-category-nav").forEach(function(item) {
                item.classList.remove("community-active");
            });
            navItem.classList.add("community-active");

            // 카테고리 설정 및 페이지 번호 초기화
            selectedCategory = navItem.getAttribute("data-category");
            currentPage = 1; // 카테고리 변경 시 페이지를 1로 초기화

            // AJAX 요청으로 게시글과 페이지네이션 정보 가져오기
            fetchPostsByCategory(selectedCategory, currentPage);
        });
    });

    // 페이지 번호 클릭 이벤트
    $(document).on("click", ".pagination .page-number", function(event) {
        event.preventDefault();

        // 페이지 번호를 선택하고 상태 업데이트
        currentPage = parseInt($(this).text());
        
        // 카테고리와 페이지 번호를 기준으로 게시글 요청
        fetchPostsByCategory(selectedCategory, currentPage);
    });

    // 좌우 화살표 클릭 이벤트
    $(document).on("click", ".pagination .page-link", function(event) {
        event.preventDefault();

        // 화살표에 따른 페이지 계산
        if ($(this).attr("id") === "page-prev" && currentPage > 1) {
            currentPage--;
        } else if ($(this).attr("id") === "page-next") {
            currentPage++;
        }

        // 카테고리와 페이지 번호를 기준으로 게시글 요청
        fetchPostsByCategory(selectedCategory, currentPage);
    });

    // 카테고리와 페이지 번호에 맞는 게시글을 가져오는 함수
    function fetchPostsByCategory(category, page) {
        const url = category === "전체" ? "/community/allCategory" : "/community/category";
        
        $.ajax({
            url: url,
            type: "GET",
            data: { postCategory: category, cpage: page },
            success: function(response) {
                // 카테고리와 페이지에 맞는 게시글과 페이지네이션 UI 업데이트
                updateBoardList(response.boardList || response);
                updatePagination(response.pageInfo);
            },
            error: function() {
                alert("게시글을 불러오는 데 실패했습니다.");
            }
        });
    }

    // 게시글 리스트 업데이트 함수
    function updateBoardList(boardList) {
        $(".community-content-list").empty();

        boardList.forEach(function(board) {
            const rowHtml = `
                <tr>
                    <td>${board.postNo}</td>
                    <td><span>${board.postCategory}</span></td>
                    <td><a href="/community/post/${board.postNo}">${board.postTitle}</a></td>
                    <td>${board.userId}</td>
                    <td>${board.postDate}</td>
                    <td>${board.postViewCount}</td>
                </tr>
            `;
            $(".community-content-list").append(rowHtml);
        });
    }

    // 페이지네이션 UI 업데이트 함수
    function updatePagination(pageInfo) {
        const paginationContainer = $(".pagination");
        paginationContainer.empty();

        if (!pageInfo || pageInfo.totalPage === 1) {
            paginationContainer.hide();
            return;
        }
        
        paginationContainer.show();

        // 이전 버튼
        paginationContainer.append(`
            <li class="page-item ${pageInfo.currentPage === 1 ? 'disabled' : ''}">
                <a id="page-prev" class="page-link arrow" href="#">
                    <img src="/img/common/pagenation_arrow_left.png" alt="">
                </a>
            </li>
        `);

        // 페이지 번호 버튼
        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
            const activeClass = i === pageInfo.currentPage ? 'pagenation-active' : '';
            paginationContainer.append(`
                <li class="page-item">
                    <a class="page-link page-number ${activeClass}" href="#">${i}</a>
                </li>
            `);
        }

        // 다음 버튼
        paginationContainer.append(`
            <li class="page-item ${pageInfo.currentPage === pageInfo.maxPage ? 'disabled' : ''}">
                <a id="page-next" class="page-link arrow" href="#">
                    <img src="/img/common/pagenation_arrow_right.png" alt="">
                </a>
            </li>
        `);
    }

    // 초기 로딩 시 전체 카테고리와 첫 번째 페이지로 게시글을 로드
    fetchPostsByCategory(selectedCategory, currentPage);
});
