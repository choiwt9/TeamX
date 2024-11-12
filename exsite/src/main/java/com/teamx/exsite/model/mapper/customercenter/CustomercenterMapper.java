package com.teamx.exsite.model.mapper.customercenter;

import java.util.List;

import com.teamx.exsite.model.customercenter.vo.Inquiry;

public interface CustomercenterMapper {

	void saveInquiry(Inquiry inquiry);

	List<Inquiry> getAllInquiries();

	Inquiry getInquiryById(int inquiryNo);

	void deleteInquiry(int inquiryNo);

	List<Inquiry> findInquiriesByUserNo(int userNo);

//	void updateInquiryResponse(int inquiryNo, String responseContent);

}
