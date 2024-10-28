package com.teamx.exsite.service.user;

import org.springframework.stereotype.Service;

import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.model.mapper.user.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserMapper userMapper;
	
	public int userRegister(UserDTO registerInfo) {
		
		
		
		return userMapper.registerUser(registerInfo);
	}

	public int idCheck(String id) {
		return userMapper.idCheck(id);
	}

	
	
}
