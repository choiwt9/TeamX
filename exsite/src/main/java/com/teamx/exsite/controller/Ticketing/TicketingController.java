package com.teamx.exsite.controller.Ticketing;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.teamx.exsite.model.user.dto.UserDTO;

import jakarta.servlet.http.HttpSession;

@Controller
public class TicketingController {

	/**
	 * 예매 상세 페이지(팝업)을 여는 메소드
	 */
	@GetMapping("/ticketingPopup")
	public String openTicketingPopup(HttpSession session) {
		
		return "ticketing/ticketingPopup";
	}
	
	/**
	 * 예매 번호 생성 메소드
	 * @param session
	 * @param User
	 */
	public void createTicketNo(HttpSession session, UserDTO User) {
		// 현재 연도 추출
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy");
		String year = sdf.format(date);
		System.out.println(year);
		
		// 랜덤값 SUFFIX 추출
		String suffix = "";
		for (int i=0; i<4; i++) {
			suffix += (Math.random() * 10) + "";
		}
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		String TicketNo = "T" + year 
						+ loginUser.getUserNo()
						+ session.getAttribute("ExhibitionNo") +  suffix;
		
		session.setAttribute("TicketNo", TicketNo);
	}

}
