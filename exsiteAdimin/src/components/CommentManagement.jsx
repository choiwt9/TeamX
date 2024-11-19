import React from 'react';
import '../css/CommentManagement.css';
import searchIcon from '../css/searchIcon.png';
import { useState } from 'react';

const CommentManagement = () => {
    const [comments, setcomments] = useState([
        { index: 23, postNo: 3, content: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!!@@@', id: 'TEST123', date: '2024-10-16', reportCount: 0 },
        { index: 22, postNo: 2, content: '완전 기대된다!', id: 'TEST123', date: '2024-10-16', reportCount: 0 },
        { index: 21, postNo: 1, content: '같이 보러 가요~', id: 'TEST123', date: '2024-10-16', reportCount: 0 },
        { index: 20, postNo: 1, content: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 19, postNo: 1, content: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!! 같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 18, postNo: 1, content: '완전 기대된다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 17, postNo: 1, content: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 16, postNo: 1, content: '같이 보러 가요~', id: '관리자', date: '2024-10-01', reportCount: 0 },
        { index: 15, postNo: 1, content: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 14, postNo: 1, content: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 13, postNo: 1, content: '같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 12, postNo: 1, content: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!! 같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 11, postNo: 1, content: '오픈런 까먹지 말기!!!! 예매처 엑사이트!!!!!!!!!! 같이 보러 가요~', id: 'TEST123', date:'2024-10-16', reportCount: 0}
    ]);

    const [selectedcomments, setSelectedcomments] = useState(new Set());

    const handleSelectcomment = (index) => {
        const newSelectedcomments = new Set(selectedcomments);
        if (newSelectedcomments.has(index)) {
            newSelectedcomments.delete(index); // 이미 선택된 경우 선택 해제
        } else {
            newSelectedcomments.add(index); // 선택
        }
        setSelectedcomments(newSelectedcomments);
    };

    const handleDeleteSelected = () => {
        const filteredcomments = comments.filter(comment => !selectedcomments.has(comment.index));
        setcomments(filteredcomments);
        setSelectedcomments(new Set()); // 선택 해제
    };
        
    return (
        <div className="comment-management-page">
            <div className="comment-management-title">댓글 관리</div>
                <div className='comment-management-search'>
                    <input type="search" className="comment-search-input"></input>
                    <img className="comment-search-input-image" src={searchIcon}></img>
                </div>
                <div className="comment-management-button">
                    <button className="delete-button">삭제</button>
                </div>
                    <table className='comment-management-table'>
                        <thead className='comment-management-thead'>
                            <tr>
                                <th>
                                    <label className="custom-circle-checkbox">
                                        <input type="checkbox" className="comment-management-checkbox"
                                                onChange={() => {
                                                    if (selectedcomments.size === comments.length) {
                                                        setSelectedcomments(new Set()); // 모두 선택 해제
                                                    } else {
                                                        setSelectedcomments(new Set(comments.map(comment => comment.index))); // 모두 선택
                                                    }
                                                }} 
                                                checked={selectedcomments.size === comments.length}
                                        />
                                        <span className="circle"></span> {/* 사용자 정의 원형 체크박스 */}
                                    </label>
                                </th>
                                <th className='comment-management-thead-th'>댓글 번호</th>
                                <th className='comment-management-thead-th'>글 번호</th>
                                <th className='comment-management-thead-th'>내용</th>
                                <th className='comment-management-thead-th'>작성자</th>
                                <th className='comment-management-thead-th'>작성일</th>
                                <th className='comment-management-thead-th'>신고횟수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments.map((comment, index) => (
                                <tr key={index}>
                                    <td className="comment-management-input-checkbox">
                                        <label className="custom-circle-checkbox">
                                            <input 
                                                type="checkbox" 
                                                className="comment-management-checkbox"
                                                checked={selectedcomments.has(comment.index)} 
                                                onChange={() => handleSelectcomment(comment.index)} 
                                            />
                                            <span className="circle"></span> {/* 사용자 정의 원형 체크박스 */}
                                        </label>
                                    </td>
                                    <td className="comment-management-td">{comment.index}</td>
                                    <td className="comment-management-td">{comment.postNo}</td>
                                    <td className="comment-info">{comment.content}</td>
                                    <td className="comment-management-td">{comment.id}</td>
                                    <td className="comment-management-td">{comment.date}</td>
                                    <td className="comment-management-td">{comment.reportCount}</td>
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

export default CommentManagement;