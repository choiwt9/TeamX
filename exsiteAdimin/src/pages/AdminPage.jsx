import React from 'react';
import Slidebar from '../components/Slidebar.jsx';
import MemberManagement from '../components/MemberManagement';
import '../css/AdminPage.css';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {

    // 기본적으로 첫 페이지로 이동할 경로를 설정
    const isAuthenticated = true; // 예시로 사용; 실제 인증 로직으로 대체 필요

    return (
        <div className="app">
            <div className="bar"><Slidebar /></div>
            <div className="changedisplay">
                {/* <Outlet />
                <Navigate to="member-management" replace /> */}
                {isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
            </div>
        </div>
    );
};

export default AdminPage;