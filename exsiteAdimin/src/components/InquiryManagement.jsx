import React, { useState, useEffect } from 'react';
import '../css/InquiryManagement.css';
import searchIcon from '../css/searchIcon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InquiryManagement = () => {
    
    const [inquiries, setInquiries] = useState([]);
    const [searchUserId, setSearchUserId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const inquiriesPerPage = 13;

    useEffect(() => {

        fetchInquiries();

    }, []);

    // 1:1 문의 목록 불러오기
    const fetchInquiries = async () => {

        try {
            const response = await axios.get('http://localhost:7777/api/inquiries');
            setInquiries(response.data);
        } catch (error) {
            console.error('Error fetching inquiries:', error);
            alert("1:1문의 목록을 가져오는 데 오류가 발생했습니다.");
        }

    };

    // 날짜 포맷팅
    const formatDate = (dateString) => {

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;

    };

    // 검색 기능
    const handleSearch = async () => {

        if (!searchUserId) {
            fetchInquiries();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:7777/api/inquiries/search?userId=${searchUserId}`);
            console.log(response.data);
            setInquiries(response.data);
            // setCurrentPage(1);
            setSearchUserId('');
        } catch (error) {
            console.error("Error searching members", error);
            alert("검색 중 오류가 발생했습니다.");
        }

    };

    // 현재 페이지의 회원 정보 계산
    const indexOfLastInquiry = currentPage * inquiriesPerPage;
    const indexOfFirstInquiry = indexOfLastInquiry - inquiriesPerPage;
    const currentinquiries = inquiries.slice(indexOfFirstInquiry, indexOfLastInquiry);

    // 페이지네이션 버튼 핸들러
    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);
    
    };

    const totalPages = Math.ceil(inquiries.length / inquiriesPerPage);

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
        const newPage = nextPageSet * 10 + 1;
        if (newPage <= totalPages) {
            setCurrentPage(newPage);
        }

    };

    // 페이지네이션 버튼 클릭 시 이전 페이지 세트로 이동
    const handlePrevSet = () => {

        const prevPageSet = Math.floor((currentPage - 1) / 10) - 1;
        const newPage = Math.max(prevPageSet * 10 + 1, 1);
        setCurrentPage(newPage);
    
    };
    
    return (
        <div className="inquiry-management">
            <div className='inquiry-management-caption'>1:1 문의 관리</div>
                <div className='inquiry-management-search'>
                    <input type="search" className="search-input" value={searchUserId} onChange={(e) => setSearchUserId(e.target.value)}></input>
                    <img className="search-input-image" src={searchIcon} onClick={handleSearch} alt="Search"></img>
                </div>
                    <table className='inquiry-management-table'>
                        <thead className='inquiry-management-thead'>
                            <tr>
                                <th className='inquiry-management-thead-th'>문의 번호</th>
                                <th className='inquiry-management-thead-th'>문의 제목</th>
                                <th className='inquiry-management-thead-th'>작성자</th>
                                <th className='inquiry-management-thead-th'>작성일</th>
                                <th className='inquiry-management-thead-th'>답변 여부</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentinquiries.map((inquiry) => (
                                <tr key={inquiry.inquiryNo}>
                                    <td className="inquiry-management-td">{inquiry.inquiryNo}</td>
                                    <td className="inquiry-info">
                                        <Link to={'/admin/inquiry/' + inquiry.inquiryNo} className="inquiry-edit">{inquiry.inquiryTitle}</Link>
                                    </td>
                                    <td className="inquiry-management-td">{inquiry.userId}</td>
                                    <td className="inquiry-management-td">{formatDate(inquiry.inquiryDate)}</td>
                                    <td className="inquiry-management-td">{inquiry.inquiryResponse}</td>
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

export default InquiryManagement;