package com.teamx.exsite.controller.review;

import java.util.List;

import org.apache.catalina.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.model.user.dto.UserDTO;
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
	public String reviewCheck(Model model, HttpSession session) {

		UserDTO loginUser = (UserDTO) session.getAttribute("user");

		if (loginUser != null) {
			List<UserDTO> reviews = Rservice.addReview(loginUser.getUserId());
			model.addAttribute("reviews", reviews);
		}

		return "reviewPage/reviewCheck";
	}

	@GetMapping("/replaceReview")
	public String replaceReview() {
		return "reviewPage/replaceReview";
	}
}
