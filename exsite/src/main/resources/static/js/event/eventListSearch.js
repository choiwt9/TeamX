        function changeColor(selectedButton) {
            // 모든 버튼을 선택
            const buttons = document.querySelectorAll('.exhibition-array1 button');
            
            // 모든 버튼의 active 클래스 제거
            buttons.forEach(button => {
                button.classList.remove('active');
            });
            
            // 선택된 버튼에 active 클래스 추가
            selectedButton.classList.add('active');
        }

        function loadExhibitions(sortType, codename = 'event') {

            $.ajax ({
                url: '/exhibition/list/sort',
                type: 'GET',
                data: {
                    sortType: sortType,
                    codename: codename
                },
                success: (data) => {
                    displayExhibitions(data);
                },
                error: (err) => {
                    console.error('Error fetching exhibitions:', err);
                }
            });
        }

        function displayExhibitions(exhibitions){

            const exhibitionList = $('.exhibition-card');
            exhibitionList.empty();

            exhibitions.forEach(exhibition => {

                const li=`
                    <li class="exhibition-card-list">
                        <a href="/exhibition/detail?id=${exhibition.exhibitionNo}">
                            <div class="exhibition-card-image">
                                <img class="exhibition-card-image-url" src="${exhibition.mainImg}" alt="전시 이미지">
                            </div>
                            <div class="exhibition-card-content">
                                <div class="exhibition-card-title">${exhibition.title}</div>
                                <div class="exhibition-card-location">${exhibition.place}</div>
                                <div class="exhibition-card-date">${exhibition.exDate}</div>
                             </div>
                        </a>
                    </li>
                `;
                exhibitionList.append(li);
            })
        }
