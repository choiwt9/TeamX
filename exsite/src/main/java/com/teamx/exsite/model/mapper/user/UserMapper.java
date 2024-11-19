package com.teamx.exsite.model.mapper.user;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.user.dto.UserDTO;

@Mapper
public interface UserMapper {

	public int registerUser(UserDTO registerInfo);

	public int idCheck(String id);

	public int mailCheck(String email);

	public int searchUserName(String name);

	public String idSearch(String authMethod);

	public int passwordChange(String userId, String name, String authMethod, String encodedPassword);

	public UserDTO basicLogin(UserDTO loginInfo);

	public int phoneCheck(String phone);

	public int registerWithNaver(UserDTO signupWithUser);

	public int accountCheck(String signupMethod, String email);

	public int registerWithGoogle(UserDTO user);

	// 관리자 페이지 전체 유저 정보 불러오기
	public List<UserDTO> getAllUsers();

	// 관리자 페이지 회원 검색하기
	public List<UserDTO> searchUsers(String name);

	// 관리자 페이지 해당회원 정보 불러오기
	public UserDTO findByUserNo(int userNo);

	// 관리자 페이지 해당회원 정보 수정하기
	public void updateUserInfo(UserDTO member);

	// 관리자 페이지 해당회원 탈퇴 처리하기
	public int updateUserStatus(String userId);

}
