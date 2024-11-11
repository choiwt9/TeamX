package com.teamx.exsite.model.mapper.review;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.review.vo.ReviewInfo;
import com.teamx.exsite.model.user.dto.UserDTO;

@Mapper
public interface ReviewMapper{

	int insertReview(ReviewInfo reviewInfo);
}
