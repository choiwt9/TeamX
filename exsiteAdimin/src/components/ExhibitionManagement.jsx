import React, { useState, useEffect } from 'react';
import '../css/ExhibitionManagement.css';
import searchIcon from '../css/searchIcon.png';
import axios from 'axios';

const ExhibitionManagement = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const exhibitionsPerPage = 13;
    const [searchTerm, setSearchTerm] = useState('');
    //exhibitions: 전시 목록을 저장, currentPage: 현재 페이지 번호를 저장, exhibitionsPerPage: 페이지당 표시할 전시 수, searchTerm: 검색어 저장

    useEffect(() => {
        fetchExhibitions();
    }, []);

    // exhibition테이블의 전체 데이터 불러오기
    const fetchExhibitions = async () => {
        
        try {
            const response = await axios.get('http://localhost:7777/api/exhibitions');
            setExhibitions(response.data);
        } catch (error) {
            console.error("Error fetching exhibitions", error);
            alert("전시 목록을 가져오는 데 오류가 발생했습니다.");
        }

    };

    // 검색 기능
    const handleSearch = async () => {

        if (!searchTerm) {
            fetchExhibitions();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:7777/api/exhibitions/search?title=${searchTerm}`);
            setExhibitions(response.data);
            setCurrentPage(1);
            setSearchTerm('');
        } catch (error) {
            console.error("Error searching exhibitions", error);
            alert("검색 중 오류가 발생했습니다.");
        }

    };

    // 전시 삭제 버튼 핸들러
    const deleteExhibition = async (exhibitionNo) => {

        if (window.confirm("정말로 이 전시를 삭제하시겠습니까?")) { 
            try {
                await axios.patch(`http://localhost:7777/api/exhibitions/${exhibitionNo}`, { status: 'Y' });
                setExhibitions(prevExhibitions => 
                    prevExhibitions.filter(exhibition => exhibition.exhibitionNo !== exhibitionNo)
                );
                alert("삭제가 완료되었습니다.");
            } catch (error) {
                console.error("Error deleting exhibition:", error);
                alert("전시 삭제 중 오류가 발생했습니다.");
            }
        }
    };

    // 현재 페이지 전시 정보 계산
    const indexOfLastExhibition = currentPage * exhibitionsPerPage;
    const indexOfFirstExhibition = indexOfLastExhibition - exhibitionsPerPage;
    const currentExhibitions = exhibitions.filter(exhibition => exhibition.status !== 'Y')
        .slice(indexOfFirstExhibition, indexOfLastExhibition);

    // 페이지네이션 버튼 핸들러
    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);
    
    };

    const totalPages = Math.ceil(exhibitions.length / exhibitionsPerPage);

    //페이지 버튼 제한
    const getVisiblePages = (currentPage, totalPages) => {

        const visiblePages = [];
        const startPage = Math.max(1, Math.floor((currentPage - 1) / 10) * 10 + 1);
        const endPage = Math.min(startPage + 9, totalPages);
    
        for (let i = startPage; i <= endPage; i++) {
            visiblePages.push(i);
        }
    
        return visiblePages;

    };

    // 페이지네이션 버튼 클릭 시 다음 페이지 세트로 이동
    const handleNextSet = () => {

        const nextPageSet = Math.floor((currentPage - 1) / 10) + 1;
        const newPage = nextPageSet * 10 + 1; // 다음 세트의 첫 페이지
        if (newPage <= totalPages) {
            setCurrentPage(newPage);
        }

    };

    // 페이지네이션 버튼 클릭 시 이전 페이지 세트로 이동
    const handlePrevSet = () => {

        const prevPageSet = Math.floor((currentPage - 1) / 10) - 1;
        const newPage = Math.max(prevPageSet * 10 + 1, 1); // 이전 세트의 첫 페이지
        setCurrentPage(newPage);
    
    };

    return (
        <div className="exhibition-management">
            <div className='exhibition-management-caption'>전시 관리</div>
            <div className='exhibition-management-search'>
                <input type="search" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <img className="search-input-image" src={searchIcon} alt="검색" onClick={handleSearch} />
            </div>
                <table className='exhibition-management-table'>
                    <thead className='exhibition-management-thead'>
                        <tr>
                            <th className='exhibition-management-thead-th'>전시 번호</th>
                            <th className='exhibition-management-thead-th'>전시명</th>
                            <th className='exhibition-management-thead-th'>관리</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentExhibitions.map((exhibition) => (
                            <tr key={exhibition.exhibitionNo}>
                                <td className="exhibition-management-td">{exhibition.exhibitionNo}</td>
                                <td className="exhibition-info">{exhibition.title}</td>
                                <td className="exhibition-management-td">
                                <button type="button" className='exhibition-management-button' onClick={() => deleteExhibition(exhibition.exhibitionNo)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <div className="pagination">
                <div className="pagination11">
                    <button className="prev" onClick={handlePrevSet}>◀</button>
                </div>
                {getVisiblePages(currentPage, totalPages).map((page) => (
                    <div className="pagination1" key={page}>
                        <button
                            className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    </div>
                ))}
                <div className="pagination12">
                    <button className="next" onClick={handleNextSet}>▶</button>
                </div>
            </div>
        </div>    
    );
};

export default ExhibitionManagement;
