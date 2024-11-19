package com.teamx.exsite.service.customercenter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.customercenter.CustomercenterMapper;
import com.teamx.exsite.model.vo.customercenter.Inquiry;


@Service
public class CustomercenterService {
	
	private final CustomercenterMapper customercenterMapper;
	
	@Autowired
	public CustomercenterService(CustomercenterMapper customercenterMapper) {
		
		this.customercenterMapper = customercenterMapper;
		
	}
	
	public void saveInquiry(Inquiry inquiry) {

		customercenterMapper.saveInquiry(inquiry);
		
	}

	public List<Inquiry> getInquiries() {
		
		return customercenterMapper.getAllInquiries();
		
	}

	public Inquiry getInquiryById(int inquiryNo) {

		return customercenterMapper.getInquiryById(inquiryNo);
	}

	public void deleteInquiry(int inquiryNo) {

		customercenterMapper.deleteInquiry(inquiryNo);
		
	}

	public List<Inquiry> getInquiriesByUserNo(int userNo) {

		return customercenterMapper.findInquiriesByUserNo(userNo);
	}
	
	// 관리자 페이지 1:1 문의목록 조회 
	public List<Inquiry> getAllInquiries() {
		
		return customercenterMapper.findAll();
	
	}

	// 관리자 페이지 1:1 문의 특정회원 검색하기
	public List<Inquiry> searchUsers(String userId) {
		
		return customercenterMapper.searchUsers(userId);
	}

	// 관리자 페이지 관리자 답변 등록
	public void updateInquiryResponse(int inquiryNo, Inquiry inquiryResponse) {

		customercenterMapper.updateInquiryResponse();
		
	}

}
