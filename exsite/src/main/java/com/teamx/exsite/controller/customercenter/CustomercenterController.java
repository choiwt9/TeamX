package com.teamx.exsite.controller.customercenter;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.teamx.exsite.model.customercenter.vo.Inquiry;
import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.service.customercenter.CustomercenterService;

import jakarta.servlet.http.HttpSession;

@Controller
public class CustomercenterController {
	
	private final CustomercenterService customercenterService;
	
	@Autowired
	public CustomercenterController(CustomercenterService customercenterService) {
		
		this.customercenterService = customercenterService;
	
	}
	
	@GetMapping("/customer/service")
	public String customerService(@RequestParam(required = false) Integer userNo, Model model, HttpSession session) {
		
	    UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
	    
	    if (loginUser == null) {
	        return "redirect:/login"; 
	    }

	    model.addAttribute("loginUser", loginUser);
	    
	    List<Inquiry> inquiries = customercenterService.getInquiriesByUserNo(loginUser.getUserNo());
	    model.addAttribute("inquiries", inquiries);
	    
	    return "/customercenter/customerService";
	    
	}
	
	@GetMapping("/customer/inquiry")
	public String showInquiryForm() {
		
		return "/customercenter/inquiry";
		
	}
	
	@GetMapping("/customer/answer")
	public String inquiryAnswer (@RequestParam("inquiryNo") int inquiryNo, Model model, HttpSession session) {
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
	    
	    if (loginUser == null) {
	        return "redirect:/login";
	    }

	    Inquiry inquiryDetails = customercenterService.getInquiryById(inquiryNo);
	    
	    if (inquiryDetails.getUserNo() != loginUser.getUserNo()) {
	        return "redirect:/customer/service"; // 다른 유저의 문의에 접근할 경우 리다이렉트
	    }
	    
		model.addAttribute("inquiry", inquiryDetails);
		
		return "/customercenter/inquiryAnswer";
		
	}
	
	@PostMapping("/customer/inquiry/create")
	public String createInquiry (@RequestParam String inquiryTitle, @RequestParam String inquiryContent, HttpSession session) {
		
		UserDTO loginUser = (UserDTO)session.getAttribute("loginUser");
		
		if (loginUser == null) {
	        return "redirect:/login";
	    }
		
		Inquiry inquiry = new Inquiry();
		inquiry.setUserNo(loginUser.getUserNo());
		inquiry.setInquiryTitle(inquiryTitle);
		inquiry.setInquiryContent(inquiryContent);
		
		customercenterService.saveInquiry(inquiry);
		
		return "redirect:/customer/service";
	
	}
	
	@GetMapping("/customer/deleteInquiry")
    public String deleteInquiry(@RequestParam("inquiryNo") int inquiryNo, HttpSession session) {
		
		 UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		    
		    if (loginUser == null) {
		        return "redirect:/login";
		    }
		    
		    Inquiry inquiry = customercenterService.getInquiryById(inquiryNo);
		    
		    if (inquiry.getUserNo() == loginUser.getUserNo()) {
		    	customercenterService.deleteInquiry(inquiryNo);
		    }
        
        return "redirect:/customer/service"; 
        
	}
	
//	@PostMapping("/customer/answer/create")
//	public String respondToInquiry(@RequestParam("inquiryNo") int inquiryNo, @RequestParam("responseContent") String responseContent) {
//	    
//	    customercenterService.respondToInquiry(inquiryNo, responseContent);
//	    
//	    return "redirect:/customer/service";
//	    
//	}
	
}
