package com.teamx.exsite.model.mapper.review;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.user.dto.UserDTO;

@Mapper
public interface ReviewMapper {
  
	public List<UserDTO> addReview(String userId);
}
