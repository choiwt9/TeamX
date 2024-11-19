import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/MemberEdit.css';
import axios from 'axios';

const MemberEdit = () => {
    const { userNo } = useParams();
    const navigate = useNavigate();
const [member, setMember] = useState({});

   useEffect (() => {
        
        const fetchMember = async () => {

            try {
                const response = await axios.get(`http://localhost:7777/api/members/info/${userNo}`);
                console.log(response.data);
                setMember(response.data);
            } catch (error) {
                console.error('회원 정보를 가져오는 데 실패했습니다:', error);
            }

        };

        fetchMember();
    }, [userNo]);

    // 수정버튼 클릭
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            await axios.put(`http://localhost:7777/api/members/${userNo}`, member);
            alert("회원 정보 수정에 성공했습니다.");
            navigate(`/admin/member-management`);
        } catch (error) {
            console.error('회원 정보를 수정하는 데 실패했습니다:', error);
            alert("회원 정보 수정에 실패했습니다.");
        }

    };

    //탈퇴처리 버튼 클릭
    const handleWithdraw = async () => {
        try {
            const response = await axios.post('http://localhost:7777/api/members/withdraw', {
                userId: member.userId,
            });
    
            if (response.status === 200) {
                alert('탈퇴 처리되었습니다.');
            } else {
                alert('탈퇴 처리 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('탈퇴 처리 중 오류가 발생했습니다.');
        }
    };

    // input의 name과 value 변경
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember((prev) => ({ ...prev, [name]: value }));
    };

    if (!member) return <div>회원 정보를 찾을 수 없습니다.</div>;

    return (
        <div className="member-info-edit-page">
            <div className="member-info-edit">회원 정보 수정</div>
                <form onSubmit={handleSubmit} className='member-info-edit-form'>
                    <table className="member-info-table">
                        <tbody>
                            <tr className='form-group'>
                                <td className='form-group-label'><label htmlFor="memberId">아이디</label></td>
                                <td className='form-group-input'><input type="text" id="memberId" name="userId" value={member.userId} readOnly /></td>
                            </tr>
                            <tr className='form-group'>
                                <td className='form-group-label'><label htmlFor="password">비밀번호</label></td>
                                <td className='form-group-input'><input type="password" id="password" name="userPw" placeholder="*재설정 가능*" onChange={handleChange} /></td>
                            </tr>
                            <tr className='form-group'>
                                <td className='form-group-label'><label htmlFor="memberName">이름</label></td>
                                <td className='form-group-input'><input type="text" id="memberName" name="name" value={member.name}  onChange={handleChange}/></td>
                            </tr>
                            <tr className='form-group'>
                                <td className='form-group-label'><label htmlFor="memberEmail">이메일</label></td>
                                <td className='form-group-input'><input type="email" id="memberEmail" name="email" value={member.email} onChange={handleChange}/></td>
                            </tr>
                            <tr className='form-group'>
                                <td className='form-group-label'><label htmlFor="memberPhone">연락처</label></td>
                                <td className='form-group-input'><input type="text" id="memberPhone" name="phone" value={member.phone} onChange={handleChange} /></td>
                            </tr>
                            <tr className='form-group'>
                                <td className='form-group-label'><label htmlFor="memberAddress">주소</label></td>
                                <td className='form-group-input'><input type="text" id="memberAddress" name="address" value={member.address} onChange={handleChange} /></td>
                            </tr>
                            <tr className='form-group1'>
                                <td className='form-group-label'><label htmlFor="grade">등급</label></td>
                                <td className='form-group-input'>
                                    <select id="grade" name="grade" value={member.grade} onChange={handleChange}>
                                        <option value="A">A</option>
                                        <option value="U">U</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <div className="button-group">
                    <button type="button" className="cancel-button" onClick={handleWithdraw}>탈퇴 처리</button>
                    <button type="button" className="submit-button" onClick={handleSubmit}>수정</button>
                </div>
        </div>
    );
};

export default MemberEdit;
