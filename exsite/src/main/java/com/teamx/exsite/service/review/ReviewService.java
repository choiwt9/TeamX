package com.teamx.exsite.service.review;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.review.ReviewMapper;
import com.teamx.exsite.model.review.dto.ReviewDTO;
import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.model.user.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	private final ReviewMapper reviewMapper;

	public void addReview(ReviewDTO reviewInfo) {
        reviewMapper.insertReview(reviewInfo);
    }
	public void SelectUserId(UserDTO user) {
        reviewMapper.selectUserId(user);
    }
    public List<ReviewInfo> allReview(int exhibitionNo){
    	
    	System.out.println(exhibitionNo);
		return reviewMapper.allReview(exhibitionNo);
    	
    }

}
	
