package com.teamx.exsite.service.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.user.UserMapper;
import com.teamx.exsite.model.user.dto.UserDTO;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
	
	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	private final AuthService authService;
	private final APIService apiService;
	
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
		if(idSelectResult == null) {
			return null;
		}
		if(passwordEncoder.matches(loginInfo.getUserPw(), idSelectResult.getUserPw())) {
			return idSelectResult;
		}
		return null;
	}

	public int nameCheck(String name) {
		int result = userMapper.searchUserName(name);
		return result;
	}
	
	public int accountCheck(String signupMethod, String email) {
		return userMapper.accountCheck(signupMethod, email);
	}

	public String idSearch(String authMethod) {
		return userMapper.idSearch(authMethod);
	}

	public int passwordChange(String userId, String name, String authMethod, String changePassword) {
		String encodedPassword = passwordEncoder.encode(changePassword);
		return userMapper.passwordChange(userId, name, authMethod, encodedPassword);
	}

	public Map<String, String> naverUserRegistration(UserDTO user, HttpSession session) {
	    Map<String, String> result = new HashMap<>();
	    if (accountCheck("NAVER", user.getEmail()) == 0 && idCheck(user.getUserId()) == 0) {
	        int signupResult = userMapper.registerWithNaver(user);
	        if (signupResult > 0) {
	            result.put("status", "success");
	            session.setAttribute("loginUser", user);
	        } else {
	        	result.put("status", "false");
	        }
	    }
	    return result;
	}

	public Map<String, String> naverUserLogin(UserDTO user, HttpSession session) {
	    Map<String, String> result = new HashMap<>();
	    // 네이버로 가입한 이메일인지 확인, 맞으면 로그인 유저 객체 session에 담아 로그인 성공 응답
	    if (accountCheck("NAVER", user.getEmail()) == 1 && idCheck(user.getUserId()) == 1) {
	        result.put("status", "success");
	        session.setAttribute("loginUser", user);
	    // 네이버로 가입한 이메일이 아닐 때, 이미 사용중인 이메일인지 확인, 존재하는 이메일이면 exist 응답
	    } else if(authService.mailCheck(user.getEmail()) == 1) {
	    	result.put("status", "exist");
	    // 둘 다 아니면 false, -> 사용자 응답 확인 후 naverUserRegistration 실행여부 결정
	    } else {
	    	result.put("status", "false");
	    }
	    
	    
	    return result;
	}
	
	public Map<String, String> googleUserRegistration(UserDTO user, HttpSession session) {
	    Map<String, String> result = new HashMap<>();
	    if (accountCheck("NAVER", user.getEmail()) == 0 && idCheck(user.getUserId()) == 0) {
	        int signupResult = userMapper.registerWithGoogle(user);
	        if (signupResult > 0) {
	            result.put("status", "success");
	            session.setAttribute("loginUser", user);
	        } else {
	        	result.put("status", "false");
	        }
	    }
	    return result;
	}
	
	public Map<String, String> googleUserLogin(String code, HttpSession session) {
		Map<String, String> result = new HashMap<>();
		
		JSONObject userInfo = apiService.googleUserInfoGetProcess(code);
		int accountCheck = accountCheck("GOOGLE", userInfo.getString("email"));
		int idCheck = idCheck(userInfo.getString("sub"));
		int mailCheck = authService.mailCheck(userInfo.getString("email"));
		if(accountCheck == 1 && idCheck == 1) {
			UserDTO loginUser = new UserDTO();
			loginUser.setUserId(userInfo.getString("sub"));
			loginUser.setName(userInfo.getString("name"));
			loginUser.setEmail(userInfo.getString("email"));
			session.setAttribute("loginUser", loginUser);
			result.put("status", "success");
		} else if(mailCheck == 1) {
			result.put("status", "exist");
		} else {
			JSONObject registrationInfo = new JSONObject();
			registrationInfo.put("name", userInfo.getString("name"));
			registrationInfo.put("id", userInfo.getString("sub"));
			registrationInfo.put("email", userInfo.getString("email"));
			result.put("registrationInfo", registrationInfo.toString());
			result.put("status", "false");
		}
		return result;
	}

	// 관리자 페이지 전체 유저 정보 불러오기
	public List<UserDTO> getAllUsers() {
		
		return userMapper.getAllUsers();
		
	}

	// 관리자 페이지 회원 검색하기
	public List<UserDTO> searchUsers(String name) {

		return userMapper.searchUsers(name);
	
	}

	// 관리자 페이지 해당회원 정보 불러오기
	public UserDTO getUserByNo(int userNo) {

		return userMapper.findByUserNo(userNo);
		
	}

	// 관리자 페이지 해당회원 정보 수정하기
	public UserDTO updateUserInfo(int userNo, UserDTO member) {
		
		member.setUserNo(userNo);
		
		userMapper.updateUserInfo(member);
		
		return member;
		
	}

	// 관리자 페이지 해당회원 탈퇴 처리하기
	public boolean withdrawUserInfo(String userId) {
		
		return userMapper.updateUserStatus(userId) > 0;
		
	}	

}
