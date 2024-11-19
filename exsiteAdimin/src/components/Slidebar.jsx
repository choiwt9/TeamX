import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Slidebar.css';

const Slidebar = () => {
    return (
        <div className="slidebar">
            <div className="admin-console">관리자 콘솔</div>
                <div className="admin-console-menu">
                    <ul className="admin-console-ul">
                        <li className="admin-console-li"><Link className="admin-console-a" to="member-management">회원 관리</Link></li>
                        <li className="admin-console-li"><Link className="admin-console-a" to="post-management">게시글 관리</Link></li>
                        <li className="admin-console-li"><Link className="admin-console-a" to="comment-management">댓글 관리</Link></li>
                        <li className="admin-console-li"><Link className="admin-console-a" to="inquiry-management">1:1 문의 관리</Link></li>
                        <li className="admin-console-li"><Link className="admin-console-a" to="exhibition-management">전시 관리</Link></li>
                        <li className="admin-console-li"><Link className="admin-console-a" to="review-management">리뷰 관리</Link></li>
                    </ul>
                </div>
        </div>
    );
};

export default Slidebar;