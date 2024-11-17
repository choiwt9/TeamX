window.onload = () => {

    document.getElementById('exhibition-details-button').style.color='#0B9B9B';

    const heart = document.getElementById('exhibition-heart');
    let count = 0; 
    let liked = false; 

    heart.addEventListener('click', () => {
        liked = !liked; 
        const path = heart.querySelector('path');

        if (liked) {
            count++; 
            path.setAttribute('fill', 'red'); 
            path.setAttribute('stroke', 'red'); 
        } else {
            count--; 
            path.setAttribute('fill', 'none'); 
            path.setAttribute('stroke', 'red'); 
        }
        /*
        데이터베이스에 좋아요 수 업데이트 요청 (API 호출)
        try {
            const response = await fetch('/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ count, liked }),
            });

            const data = await response.json();
            console.log(data); // 서버에서 받은 데이터 확인
        } catch (error) {
            console.error('Error:', error);
        }
        */
    });

    document.getElementById('exhibition-details-button').addEventListener('click', function() {
        document.getElementById('exhibition-details').style.display = 'block'; 
        document.getElementById('exhibition-reviews').style.display = 'none'; 

        this.style.color = '#0B9B9B'; 
        document.getElementById('exhibition-reviews-button').style.color = ''; 
    });

    document.getElementById('exhibition-reviews-button').addEventListener('click', function() {
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
