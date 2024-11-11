package com.teamx.exsite.controller.review;

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
	public String addReview(ReviewInfo reviewInfo, Model model) {

		System.out.println(reviewInfo.getReviewTitle());

		Rservice.addReview(reviewInfo);
		model.addAttribute("reviewInfo", reviewInfo);
		return "redirect:/event/eventDetail";
	}

	@GetMapping("/replaceReview")
	public String replaceReview() {
		return "reviewPage/replaceReview";
	}
}
