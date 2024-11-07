package com.teamx.exsite.service.review;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.review.ReviewMapper;
import com.teamx.exsite.model.user.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	private final ReviewMapper mapper;

	public List<UserDTO> addReview(String userId) {
		
		return mapper.addReview(userId);
	}

}
