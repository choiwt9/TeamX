package com.teamx.exsite.controller.review;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.teamx.exsite.model.review.dto.ReviewDTO;
import com.teamx.exsite.model.user.dto.UserDTO;
import com.teamx.exsite.service.review.ReviewService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor

public class ReviewController {

	private final ReviewService Rservice;

	@GetMapping("/review")
	public String review(int id, HttpSession session, Model model) {
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		if (loginUser == null) {
			return "redirect:/login";
		}
		
		model.addAttribute("exhibitionNo", id);

		return "reviewPage/review";
	}

	@PostMapping("/event/eventDetail")
	public String addReview(ReviewDTO reviewInfo, HttpSession session, Model model) {
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		reviewInfo.setReviewDate(new Date());// 리뷰 작성 날짜 설정
		if (reviewInfo.getReviewStatus() == null) {
			reviewInfo.setReviewStatus("N");
		}
		if (reviewInfo.getTicketNo() == null) {
			reviewInfo.setTicketNo("T2024");
		}

		System.out.println(reviewInfo);

		Rservice.addReview(reviewInfo);
		return "redirect:/event/detail?id=" + reviewInfo.getExhibitionNo();
	}

	@GetMapping("/replaceReview")
	public String replaceReview() {
		return "reviewPage/replaceReview";
	}

	@DeleteMapping("/deleteReview")
	public String deleteReview() {

		return "redirect:/event/eventDetail";
	}
}
