$(function () {

    document.getElementById('exhibition-details-button').style.color = '#0B9B9B';

    const heart = $('#exhibition-heart');
    let count = 0;
    let liked;
    const userNo = $('#userId').val();
    const exhibitionNo = $('#exhibitionNo').val();
    const path = $('path');

    // 디테일 페이지가 로딩될 때 해당 유저가 게시글에 좋아요 했는지 여부를 확인해서
    // 하트 표시를 채울지 말지 결정하는 코드
    if (userNo && userNo !== '') {
        $.ajax({
            url: '/exhibition/likes/status', // 좋아요 추가 API
            type: 'get',
            data: { userNo: userNo, exhibitionNo: exhibitionNo },
            success: function (data) {
                liked = data.status === 'true';
                if (liked) {
                    path.attr('fill', 'red');
                } else {
                    path.attr('fill', 'none');
                }

            },
            error: function (err) {
                console.error('좋아요 추가 중 오류 발생:', err);
                alert('좋아요 추가에 실패했습니다. 다시 시도해주세요.');
            }
        });
    }

    heart.on('click', () => {

        if (userNo === '' || userNo === null) {
            console.log("User No:", userNo); // userNo의 값을 확인
            heart.prop('disabled', false);
            alert("로그인이 필요합니다.");
            setTimeout(() => {
                window.location.href = "/login";
            }, 1000);
            return;
        }

        this.disabled = true;

        // 좋아요 추가
        $.ajax({
            url: '/exhibition/likes/add', // 좋아요 추가 API
            type: 'get',
            data: { userNo: userNo, exhibitionNo: exhibitionNo },
            success: function (data) {
                heart.disabled = false;
                console.log(data);
                liked = true;
                if (data.status === 'add') {
                    path.attr('fill', 'red'); // 하트를 빨간색으로
                } else {
                    path.attr('fill', 'none');
                }

            },
            error: function (err) {
                console.error('좋아요 추가 중 오류 발생:', err);
                alert('좋아요 추가에 실패했습니다. 다시 시도해주세요.');
            }
        });
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

});