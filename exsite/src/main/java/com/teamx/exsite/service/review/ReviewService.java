package com.teamx.exsite.service.review;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.review.ReviewMapper;
import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.model.user.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	private final ReviewMapper reviewMapper;

	public void addReview(ReviewInfo reviewInfo) {
        reviewMapper.insertReview(reviewInfo);
    }

	public List<ReviewInfo> addReview(String userId) {
		// TODO Auto-generated method stub
		return null;
	}


}
