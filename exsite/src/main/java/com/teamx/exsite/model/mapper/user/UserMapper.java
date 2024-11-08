package com.teamx.exsite.model.mapper.user;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.user.dto.UserDTO;

@Mapper
public interface UserMapper {

	public int registerUser(UserDTO registerInfo);

	public int idCheck(String id);

	public int mailCheck(String email);

	public int searchUserName(String name);

	public String idSearch(String authMethod);
	
	public String idSearch(String authMethod, String loginMethod);

	public int passwordChange(String userId, String name, String authMethod, String encodedPassword);

	public UserDTO basicLogin(UserDTO loginInfo);

	public int phoneCheck(String phone);

	public int registerWithNaver(UserDTO signupWithUser);

	public int accountCheck(String signupMethod, String email);

	public int registerWithGoogle(UserDTO user);

	public int identifierCheck(String socialUserIdentifier);

}
