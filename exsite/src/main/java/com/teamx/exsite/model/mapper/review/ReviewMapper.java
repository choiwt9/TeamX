package com.teamx.exsite.model.mapper.review;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.review.dto.ReviewDTO;
import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.model.user.dto.UserDTO;

@Mapper
public interface ReviewMapper{
	
	List<ReviewInfo> allReview(int exhibitionNo);

	int insertReview(ReviewDTO reviewInfo);
	
	void selectUserId(UserDTO user);
}
    