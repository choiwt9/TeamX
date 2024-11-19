package com.teamx.exsite.model.mapper.customercenter;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.vo.customercenter.Inquiry;

@Mapper
public interface CustomercenterMapper {

	void saveInquiry(Inquiry inquiry);

	List<Inquiry> getAllInquiries();

	Inquiry getInquiryById(int inquiryNo);

	void deleteInquiry(int inquiryNo);

	List<Inquiry> findInquiriesByUserNo(int userNo);

	// 관리자 페이지 1:1 문의목록 조회 
	List<Inquiry> findAll();

	// 관리자 페이지 1:1 문의 특정회원 검색하기
	List<Inquiry> searchUsers(String userId);

	// 관리자 페이지 관리자 답변 등록
	void updateInquiryResponse();

}
