package com.teamx.exsite.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class TicketingController {

	/**
	 * 예매 상세 페이지(팝업)을 여는 메소드
	 */
	@GetMapping("/ticketingPopup")
	public String openTicketingDetail(HttpSession session) {
		
		return "ticketing/ticketingPopup";
	}
	

}
