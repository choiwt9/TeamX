package com.teamx.exsite.controller.customercenter;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomercenterController {
	
	@GetMapping("/customer/service")
	public String CustomerService () {
		
		return "/customercenter/customerService";
		
	}

	@GetMapping("/customer/inquiry")
	public String Inquiry () {
		
		return "/customercenter/inquiry";
	
	}
	
	@GetMapping("/customer/answer")
	public String InquiryAnswer () {
		
		return "/customercenter/inquiryanswer";
	}
	
}
