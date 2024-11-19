import React from 'react';
import '../css/ReviewManagement.css';
import searchIcon from '../css/searchIcon.png';
import { useState } from 'react';

const ReviewManagement = () => {
    const [reviews, setreviews] = useState([
        { index: 23, exhibitionNo: 3, title: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!!@@@', id: 'TEST123', date: '2024-10-16'},
        { index: 22, exhibitionNo: 2, title: '완전 기대된다!', id: 'TEST123', date: '2024-10-16'},
        { index: 21, exhibitionNo: 1, title: '같이 보러 가요~', id: 'TEST123', date: '2024-10-16'},
        { index: 20, exhibitionNo: 1, title: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 19, exhibitionNo: 1, title: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!! 같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 18, exhibitionNo: 1, title: '완전 기대된다!', id: 'TEST123', date:'2024-10-16'},
        { index: 17, exhibitionNo: 1, title: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 16, exhibitionNo: 1, title: '같이 보러 가요~', id: '관리자', date: '2024-10-01'},
        { index: 15, exhibitionNo: 1, title: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 14, exhibitionNo: 1, title: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 13, exhibitionNo: 1, title: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 12, exhibitionNo: 1, title: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!! 같이 보러 가요~', id: 'TEST123', date:'2024-10-16'},
        { index: 11, exhibitionNo: 1, title: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!! 같이 보러 가요~', id: 'TEST123', date:'2024-10-16'}
    ]);

    const [selectedreviews, setSelectedreviews] = useState(new Set());

    const handleSelectreview = (index) => {
        const newSelectedreviews = new Set(selectedreviews);
        if (newSelectedreviews.has(index)) {
            newSelectedreviews.delete(index); // 이미 선택된 경우 선택 해제
        } else {
            newSelectedreviews.add(index); // 선택
        }
        setSelectedreviews(newSelectedreviews);
    };

    const handleDeleteSelected = () => {
        const filteredreviews = reviews.filter(review => !selectedreviews.has(review.index));
        setreviews(filteredreviews);
        setSelectedreviews(new Set()); // 선택 해제
    };
        
    return (
        <div className="review-management-page">
            <div className="review-management-title">리뷰 관리</div>
                <div className='review-management-search'>
                    <input type="search" className="review-search-input"></input>
                    <img className="review-search-input-image" src={searchIcon}></img>
                </div>
                <div className="review-management-button">
                    <button className="delete-button">삭제</button>
                </div>
                    <table className='review-management-table'>
                        <thead className='review-management-thead'>
                            <tr>
                                <th>
                                    <label className="custom-circle-checkbox">
                                        <input type="checkbox" className="review-management-checkbox"
                                                onChange={() => {
                                                    if (selectedreviews.size === reviews.length) {
                                                        setSelectedreviews(new Set()); // 모두 선택 해제
                                                    } else {
                                                        setSelectedreviews(new Set(reviews.map(review => review.index))); // 모두 선택
                                                    }
                                                }} 
                                                checked={selectedreviews.size === reviews.length}
                                        />
                                        <span className="circle"></span> {/* 사용자 정의 원형 체크박스 */}
                                    </label>
                                </th>
                                <th className='review-management-thead-th'>리뷰 번호</th>
                                <th className='review-management-thead-th'>전시 번호</th>
                                <th className='review-management-thead-th'>제목</th>
                                <th className='review-management-thead-th'>작성자</th>
                                <th className='review-management-thead-th'>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review, index) => (
                                <tr key={index}>
                                    <td className="review-management-input-checkbox">
                                        <label className="custom-circle-checkbox">
                                            <input 
                                                type="checkbox" 
                                                className="review-management-checkbox"
                                                checked={selectedreviews.has(review.index)} 
                                                onChange={() => handleSelectreview(review.index)} 
                                            />
                                            <span className="circle"></span> {/* 사용자 정의 원형 체크박스 */}
                                        </label>
                                    </td>
                                    <td className="review-management-td">{review.index}</td>
                                    <td className="review-management-td">{review.exhibitionNo}</td>
                                    <td className="review-info">{review.title}</td>
                                    <td className="review-management-td">{review.id}</td>
                                    <td className="review-management-td">{review.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            <div className="pagination">
                <div className="pagination11"><button className="prev">◀</button></div>
                <div className="pagination1"><button className="one">1</button></div>
                <div className="pagination1"><button className="two">2</button></div>
                <div className="pagination1"><button className="three">3</button></div>
                <div className="pagination1"><button className="four">4</button></div>
                <div className="pagination1"><button className="five">5</button></div>
                <div className="pagination1"><button className="six">6</button></div>
                <div className="pagination1"><button className="seven">7</button></div>
                <div className="pagination1"><button className="eight">8</button></div>
                <div className="pagination1"><button className="nine">9</button></div>
                <div className="pagination1"><button className="ten">10</button></div>
                <div className="pagination12"><button className="next">▶</button></div>
            </div>
        </div>
    );
};

export default ReviewManagement;