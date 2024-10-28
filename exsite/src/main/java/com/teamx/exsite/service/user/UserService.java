package com.teamx.exsite.service.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.model.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	
	private final UserMapper userMapper;
	
	
	public int userRegister(UserDTO registerInfo, PasswordEncoder passwordEncoder) {
		String encodePass = passwordEncoder.encode(registerInfo.getUserPw());
		registerInfo.setUserPw(encodePass);
		return userMapper.registerUser(registerInfo);
	}

	
	public int idCheck(String id) {
		return userMapper.idCheck(id);
	}

	
	public int basicLogin(UserDTO loginInfo, PasswordEncoder passwordEncoder) {
		UserDTO idSelectResult = userMapper.searchUserId(loginInfo);
		if(idSelectResult == null) {
			return 0;
		}
		if(passwordEncoder.matches(loginInfo.getUserPw(), idSelectResult.getUserPw())) {
			return 1;
		}
		return 0;
	}
}
