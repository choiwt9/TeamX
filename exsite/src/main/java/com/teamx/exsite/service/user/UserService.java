package com.teamx.exsite.service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.user.UserMapper;
import com.teamx.exsite.model.user.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	
	public int userRegister(UserDTO registerInfo) {
		String encodePass = passwordEncoder.encode(registerInfo.getUserPw());
		registerInfo.setUserPw(encodePass);
		return userMapper.registerUser(registerInfo);
	}
	
	public int idCheck(String id) {
		return userMapper.idCheck(id);
	}
	
	public UserDTO basicLogin(UserDTO loginInfo) {
		UserDTO idSelectResult = userMapper.basicLogin(loginInfo);
		
		if(passwordEncoder.matches(loginInfo.getUserPw(), idSelectResult.getUserPw())) {
			return idSelectResult;
		}
		return null;
	}

	public int nameCheck(String name) {
		int result = userMapper.searchUserName(name);
		return result;
	}

	public String idSearch(String email) {
		return userMapper.idSearch(email);
	}

	public int passwordChange(String userId, String name, String email, String changePassword) {
		String encodedPassword = passwordEncoder.encode(changePassword);
		return userMapper.passwordChange(userId, name, email, encodedPassword);
	}
}
