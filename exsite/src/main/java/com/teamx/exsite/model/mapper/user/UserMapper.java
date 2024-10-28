package com.teamx.exsite.model.mapper.user;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.dto.user.UserDTO;

@Mapper
public interface UserMapper {

	public int registerUser(UserDTO registerInfo);

	public int idCheck(String id);

}
