package com.teamx.exsite.controller.review;

import java.util.Date;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.service.review.ReviewService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor

public class ReviewController {

	private final ReviewService Rservice;

	@GetMapping("/review")
	public String review() {

		return "reviewPage/review";
	}

	@PostMapping("/event/eventDetail")
	public String addReview(ReviewInfo reviewInfo) {
		reviewInfo.setReviewDate(new Date());
		
		if(reviewInfo.getReviewStatus() == null) {
	        reviewInfo.setReviewStatus("N");
		}
		  if (reviewInfo.getTicketNo() == null) {
		        reviewInfo.setTicketNo("T2024"); // 적절한 ticketNo로 설정
		    }
		    if (reviewInfo.getUserNo() == 0) {
		        reviewInfo.setUserNo(1); // 적절한 userNo로 설정
		    }
		System.out.println(reviewInfo);
		
		Rservice.addReview(reviewInfo);
		
		return "redirect:/event/eventDetail";
	}

	@GetMapping("/replaceReview")
	public String replaceReview() {
		return "reviewPage/replaceReview";
	}
}
