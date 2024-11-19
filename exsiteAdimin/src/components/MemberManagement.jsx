import React, { useState, useEffect } from 'react';
import '../css/MemberManagement.css';
import searchIcon from '../css/searchIcon.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 13;
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchMembers();
    }, []);

    // 회원 목록을 불러오는 함수
    const fetchMembers = async () => {

        try {
            const response = await axios.get('http://localhost:7777/api/members');
            setMembers(response.data);
        } catch (error) {
            console.error("Error fetching members", error);
            alert("회원 목록을 가져오는 데 오류가 발생했습니다.");
        }

    };

    // 검색 기능
    const handleSearch = async () => {

        if (!searchTerm) {
            fetchMembers();
            return;
        }

        try {
            const response = await axios.get(`http://localhost:7777/api/members/search?name=${searchTerm}`);
            console.log(response.data);
            setMembers(response.data);
            setCurrentPage(1);
            setSearchTerm('');
        } catch (error) {
            console.error("Error searching members", error);
            alert("검색 중 오류가 발생했습니다.");
        }

    };

    // 현재 페이지의 회원 정보 계산
    const indexOfLastMember = currentPage * membersPerPage;
    const indexOfFirstMember = indexOfLastMember - membersPerPage;
    const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

    // 페이지네이션 버튼 핸들러
    const handlePageChange = (pageNumber) => {

        setCurrentPage(pageNumber);
    
    };

    const totalPages = Math.ceil(members.length / membersPerPage);

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
        <div className="member-management">
            <div className='member-management-caption'>회원 관리</div>
                <div className='member-management-search'>
                    <input type="search" className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                    <img className="search-input-image" src={searchIcon} alt="검색" onClick={handleSearch}></img>
                </div>
                    <table className='member-management-table'>
                        <thead className='member-management-thead'>
                            <tr>
                                <th className='member-management-thead-th'>회원 번호</th>
                                <th className='member-management-thead-th'>아이디</th>
                                <th className='member-management-thead-th'>이름</th>
                                <th className='member-management-thead-th'>이메일</th>
                                <th className='member-management-thead-th'>연락처</th>
                                <th className='member-management-thead-th'>주소</th>
                                <th className='member-management-thead-th'>등급</th>
                                <th className='member-management-thead-th'>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMembers.map((member) => (
                                <tr key={member.userNo}>
                                    <td className="member-management-td">{member.userNo}</td>
                                    <td className="member-management-td">{member.userId}</td>
                                    <td className="member-management-td">{member.name}</td>
                                    <td className="info">{member.email}</td>
                                    <td className="info">{member.phone}</td>
                                    <td className="info">{member.address}</td>
                                    <td className="member-management-td">{member.grade}</td>
                                    <td className="member-management-td">
                                        <Link to={'/admin/memberEdit/' + member.userNo} className="member-edit">수정
                                            {/* <button type="button" onClick={() => console.log(`Navigating to member-edit/${member.id}`)}>수정</button> */}
                                        </Link>
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

export default MemberManagement;