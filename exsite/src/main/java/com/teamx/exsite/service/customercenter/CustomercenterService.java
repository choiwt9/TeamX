package com.teamx.exsite.service.customercenter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.customercenter.vo.Inquiry;
import com.teamx.exsite.model.mapper.customercenter.CustomercenterMapper;

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

//	public void respondToInquiry(int inquiryNo, String responseContent) {
//		
//		customercenterMapper.updateInquiryResponse(inquiryNo, responseContent);
//		
//	}

	
//	public void deleteInquiry(int inquiryNo) {
//		
//		customercenterMapper.delete(inquiryNo);
//		
//	}
//	
//	public InquiryVO findInquiryById(Long inquiryNo) {
//        return inquiryRepository.findById(inquiryNo); // 특정 문의글 가져오기
//    }
//	
//	 public void updateInquiry(InquiryVO inquiry) {
//	        inquiryRepository.update(inquiry); // 문의글 업데이트
//	    }
//	 
//	 public List<InquiryVO> findInquiriesByUser(int userNo) {
//	        return inquiryRepository.findByUserNo(userNo); // 사용자별 문의글 가져오기
//	    }

}
