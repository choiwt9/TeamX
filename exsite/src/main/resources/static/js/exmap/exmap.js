
var container = document.getElementById('map');
var options = {
    center: new kakao.maps.LatLng(37.5511694, 126.9882266),
    level: 8
};

var map = new kakao.maps.Map(container, options);
var markers = [];  // 마커를 저장할 배열

// 모달 요소 및 닫기 버튼
var modal = document.getElementById("markerModal");
var closeButton = document.querySelector(".close");

// 모달 닫기
closeButton.onclick = function() {
    modal.style.display = "none";
};

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};



// 기존 마커를 모두 삭제하는 함수
function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);  // 마커를 지도에서 제거
    }
    markers = [];  // 배열을 초기화하여 마커 참조 제거
}

function getCoordinates(element) {
    
    document.getElementById("dropdownMenuButton").textContent = element.textContent;    //드롭다운에 선택된 지역명 유지
    var selectedRegion = $('#dropdownMenuButton').text(); // 선택된 지역명 가져오기

  
        $.ajax({
            url: '/exmap/coordinates',
            type: 'get',
            data: { guname: selectedRegion },
            success: (result) => {
                console.log("AJAX 요청 성공:", result);
                
                clearMarkers();  // 새 요청 전 기존 마커 제거

                // 새로운 좌표를 사용해 마커 추가
                for (let i in result) {
                    // 서울시 열린데이터가 lot을 위도로, lat을 경도로 잘못 기입함;;
                    var position = new kakao.maps.LatLng(result[i].lot, result[i].lat);
                    addMarker(position);
                }   
            },
            error: (xhr, status, error) => {
                console.error("AJAX 요청 오류:", status, error);
            }
        });
   
}



// 마커를 생성하는 함수
function addMarker(position) {
    // 마커를 생성
    var marker = new kakao.maps.Marker({
        position: position,
        clickable: true
    });

    marker.setMap(map);     // 마커가 지도 위에 표시되도록 설정
    markers.push(marker);   // 생성된 마커를 배열에 저장
    
    // 마커에 클릭이벤트를 등록(모달띄우기)
    kakao.maps.event.addListener(marker, 'click', function() {
        // 모달 클릭 전, 좌표를 서버로 전송해서 해당 좌표의 최신 전시정보 조회해오기
        $.ajax({
            url: 'exmap/exhibition-info',
            type: 'GET',
            data: {
                lat: position.getLat(),
                lot: position.getLng()
            },
            success: (response) =>{
                if(response){
                    $('.item-title').text(response.title);
                    $('.item-place').text(response.place);
                    $('.item-date').text(response.exDate);
                    $('.item-image').attr('src', response.mainImg);

                    modal.style.display = "block";
                } else{
                    alert("해당 위치에 전시 정보가 없습니다.");
                }
            },
            error: function(status, error){
                console.error("AJAX 요청 오류:", status, error);
            }
        })
    });

}

$('.item-textarea').click(()=>{
    $('#detailExhibitionPage').submit();
});