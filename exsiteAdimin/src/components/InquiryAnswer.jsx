import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/InquiryAnswer.css';
import axios from 'axios';

const InquiryAnswer = () => {

    const { inquiryNo } = useParams(); //
    const [inquiry, setInquiry] = useState(null);
    const [answerContent, setAnswerContent] = useState(''); // 답변 내용을 관리할 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInquiry = async () => {
            try {
                const response = await axios.get(`http://localhost:7777/api/inquiries/${inquiryNo}`);
                setInquiry(response.data);
            } catch (error) {
                console.error('Error fetching inquiry:', error);
            }
        };

        fetchInquiry();
    }, [inquiryNo]);

    // 답변 내용 저장
    const handleRegister = async () => {
        try {
    
            await axios.put(`http://localhost:7777/api/inquiries/save/${inquiryNo}`, {
                response_content: answerContent,
                inquiry_response: 'Y'
            });
            // 성공적으로 저장된 후 inquiryManagement 페이지로 리다이렉트
            navigate('/inquiryManagement');
        } catch (error) {
            console.error('Error saving answer:', error);
        }
    };

    if (!inquiry) {
        return <div>Loading...</div>; // 데이터 로딩 중 표시
    }

    return (
        <div className="question-container">
            <div className="question-section">1:1 문의</div>
            <div className="question-info">
                전시/행사 상세 관련 사항은 주관사로 문의해 주세요.
            </div>
            <div className="question">
                <div className="question-title">문의 제목</div>
                <div className="question-title-content">{inquiry.inquiryTitle}</div>
            </div>
            <div className="question-content">
                <div className="question-content-title">문의 내용</div>
                <div className="question-content-description">{inquiry.inquiryContent}</div>
            </div>
            <div className="answer-section">
                <div className="answer-title">답변 내용</div>
                <div className="answer-content">
                    <textarea 
                        className="answer-content-text" 
                        value={answerContent} 
                        onChange={(e) => setAnswerContent(e.target.value)} // 입력값 변경 시 상태 업데이트
                        placeholder="답변 내용을 입력하세요."
                    />
                </div>
            </div>
            <div className="registration-buttons">
                <button className="registration-button" onClick={handleRegister}>등록</button>
            </div>
        </div>
    );
};

export default InquiryAnswer;