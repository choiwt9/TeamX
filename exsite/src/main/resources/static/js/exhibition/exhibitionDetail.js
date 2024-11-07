window.onload = () => {

    document.getElementById('exhibition-details-button').style.color = '#0B9B9B';

    const heart = document.getElementById('exhibition-heart');
    let count = 0;
    let liked = false;

    heart.addEventListener('click', () => {

        // 로그인 상태 확인
        if (!isUserLoggedIn()) {
            alert("로그인이 필요합니다.");
            // 로그인 페이지로 리디렉션
            window.location.href = "/login";
            return; // 로그인하지 않은 경우 함수 종료
        }
        
        liked = !liked;
        const path = heart.querySelector('path');

        const userNo = getCurrentUserNo();/* 현재 로그인한 사용자의 번호 */;
        const exhibitionNo = getCurrentExhibitionNo();/* 현재 전시회의 번호 */;

        if (liked) {
            count++;
            path.setAttribute('fill', 'red');
            path.setAttribute('stroke', 'red');

            // AJAX 요청: 좋아요 추가
            $.ajax({
                url: `/exhibition/likes/status?userNo=${userNo}&exhibitionNo=${exhibitionNo}`,
                type: 'GET',
                success: (data) => {
                    if (data.liked) {
                        liked = true;
                        heart.querySelector('path').setAttribute('fill', 'red');
                        heart.querySelector('path').setAttribute('stroke', 'red');
                    }
                },
                error: (err) => {
                    console.error('좋아요 상태 확인 중 오류 발생:', err);
                }
            });
        
            //     contentType: 'application/json',
            //     data: JSON.stringify({ userNo: userNo, exhibitionNo: exhibitionNo }),
            //     success: (data) => {
            //         console.log('좋아요 추가됨');
            //     },
            //     error: (err) => {
            //         console.error('좋아요 추가 중 오류 발생:', err);
            //         alert('좋아요 추가에 실패했습니다. 다시 시도해주세요.');
            //     }
            // });

        } else {
            count--;
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'red');

            // AJAX 요청: 좋아요 제거
            $.ajax({
                url: `/exhibition/likes/${userNo}/${exhibitionNo}`,
                type: 'DELETE',
                success: (data) => {
                    console.log('좋아요 제거됨');
                },
                error: (err) => {
                    console.error('좋아요 제거 중 오류 발생:', err);
                    alert('좋아요 제거에 실패했습니다. 다시 시도해주세요.');
                }
            });
        }
    });

    document.getElementById('exhibition-details-button').addEventListener('click', function () {
        document.getElementById('exhibition-details').style.display = 'block';
        document.getElementById('exhibition-reviews').style.display = 'none';

        this.style.color = '#0B9B9B';
        document.getElementById('exhibition-reviews-button').style.color = '';
    });

    document.getElementById('exhibition-reviews-button').addEventListener('click', function () {
        document.getElementById('exhibition-reviews').style.display = 'block';
        document.getElementById('exhibition-details').style.display = 'none';

        this.style.color = '#0B9B9B';
        document.getElementById('exhibition-details-button').style.color = '';
    });
    $(document).ready(function () {
        $("#more").click(function () {
            const $textContent = $("#review-content");
            $textContent.toggleClass("expanded");
    
            if ($textContent.hasClass("expanded")) {
                $(this).text("간략히");
            } else {
                $(this).text("더보기");
            }
        });
    });
}