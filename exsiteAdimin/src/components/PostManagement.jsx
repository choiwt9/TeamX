import React from 'react';
import '../css/PostManagement.css';
import searchIcon from '../css/searchIcon.png';
import { useState } from 'react';

const PostManagement = () => {

    const [posts, setPosts] = useState([
        { index: 23, category: '공지', title: '커뮤니티 게시판 게시글 작성 유의사항 공지입니다.', id: '관리자', date: '2024-10-16', reportCount: 0 },
        { index: 22, category: '공지', title: '커뮤니티 게시판 게시글 작성 유의사항 공지입니다.', id: '관리자', date: '2024-10-16', reportCount: 0 },
        { index: 21, category: '기대평', title: '진짜 기대가 많이 되는 거 같기도 하고 아닌거 같기도 하고 그렇네요', id: 'TEST123', date: '2024-10-16', reportCount: 0 },
        { index: 20, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 19, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 18, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 17, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 16, category: '공지', title: '커뮤니티 게시판 게시글 작성 유의사항 공지입니다.', id: '관리자', date: '2024-10-01', reportCount: 0 },
        { index: 15, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 14, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
        { index: 13, category: '동행구인', title: '[구인]같이 볼 사람..외로워요 흑흑 고흐 전시 보러 갑시다!', id: 'TEST123', date:'2024-10-16', reportCount: 0},
    ]);

    const [selectedPosts, setSelectedPosts] = useState(new Set());

    const handleSelectPost = (index) => {
        const newSelectedPosts = new Set(selectedPosts);
        if (newSelectedPosts.has(index)) {
            newSelectedPosts.delete(index); // 이미 선택된 경우 선택 해제
        } else {
            newSelectedPosts.add(index); // 선택
        }
        setSelectedPosts(newSelectedPosts);
    };

    const handleDeleteSelected = () => {
        const filteredPosts = posts.filter(post => !selectedPosts.has(post.index));
        setPosts(filteredPosts);
        setSelectedPosts(new Set()); // 선택 해제
    };

    // "공지" 카테고리를 가진 게시글을 상단에 고정
    const sortedPosts = [...posts].sort((a, b) => {
        if (a.category === '공지' && b.category !== '공지') return -1; // a가 공지면 먼저
        if (b.category === '공지' && a.category !== '공지') return 1; // b가 공지면 나중
        return 0; // 같으면 순서 유지
    });
        
    return (
        <div className="post-management-page">
            <div className="post-management-title">게시글 관리</div>
            <div className='post-management-search'>
                <input type="search" className="post-search-input"></input>
                <img className="post-search-input-image" src={searchIcon}></img>
            </div>
                <div className="post-management-button">
                    <button className="delete-button">삭제</button>
                    <button className="write-button">공지 작성</button>
                </div>
                    <table className='post-management-table'>
                        <thead className='post-management-thead'>
                            <tr>
                                <th>
                                    <label className="custom-circle-checkbox">
                                        <input type="checkbox" className="post-management-checkbox"
                                                onChange={() => {
                                                    if (selectedPosts.size === posts.length) {
                                                        setSelectedPosts(new Set()); // 모두 선택 해제
                                                    } else {
                                                        setSelectedPosts(new Set(posts.map(post => post.index))); // 모두 선택
                                                    }
                                                }} 
                                                checked={selectedPosts.size === posts.length}
                                        />
                                        <span className="circle"></span> {/* 사용자 정의 원형 체크박스 */}
                                    </label>
                                </th>
                                <th className='post-management-thead-th'>글번호</th>
                                <th className='post-management-thead-th'>카테고리</th>
                                <th className='post-management-thead-th'>제목</th>
                                <th className='post-management-thead-th'>작성자</th>
                                <th className='post-management-thead-th'>작성일</th>
                                <th className='post-management-thead-th'>신고횟수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedPosts.map((post, index) => (
                                <tr key={index}>
                                    <td className="post-management-input-checkbox">
                                        <label className="custom-circle-checkbox">
                                            <input 
                                                type="checkbox" 
                                                className="post-management-checkbox"
                                                checked={selectedPosts.has(post.index)} 
                                                onChange={() => handleSelectPost(post.index)} 
                                            />
                                            <span className="circle"></span> {/* 사용자 정의 원형 체크박스 */}
                                        </label>
                                    </td>
                                    <td className="post-info">
                                        {post.category === '공지' ? ('') : (post.index)}
                                    </td>
                                    <td className="post-info">
                                        {post.category === '공지' ? (
                                            <span>{post.category}</span>
                                        ) : (
                                            <select id="role" defaultValue={post.category}>
                                                <option value="동행구인">동행 구인</option>
                                                <option value="기대평">기대평</option>
                                                <option value="정보 공유">정보 공유</option>
                                            </select>
                                        )}
                                    </td>
                                    <td className="post-management-td">{post.title}</td>
                                    <td className="post-info">{post.id}</td>
                                    <td className="post-info">{post.date}</td>
                                    <td className="post-info">{post.reportCount}</td>
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

export default PostManagement;