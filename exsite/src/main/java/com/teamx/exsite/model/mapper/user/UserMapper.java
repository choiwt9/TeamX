package com.teamx.exsite.model.mapper.user;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.dto.user.UserDTO;

@Mapper
public interface UserMapper {

	public int registerUser(UserDTO registerInfo);

	public int idCheck(String id);

	public UserDTO searchUserId(UserDTO userInfo);

	public int mailCheck(String email);

	public int searchUserName(String name);

	public String idSearch(String email);

	public int passwordReset(String userId, String name, String email, String encodedPassword);

}
