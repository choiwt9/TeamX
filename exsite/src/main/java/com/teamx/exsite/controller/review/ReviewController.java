package com.teamx.exsite.controller.review;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.service.review.ReviewService;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpSessionEvent;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ReviewController {

private final ReviewService Rservice;
	
	@GetMapping("/review")
	public String review() {
		
		return "reviewPage/review"; 
	}
	@GetMapping("/reviewCheck")
	public String reviewCheck(ReviewInfo Rinfo, HttpSession session) {
		
		return "reviewPage/reviewCheck"; 
	}
	@GetMapping("/replaceReview")
	public String replaceReview() {
		return "reviewPage/replaceReview"; 
	}
}
