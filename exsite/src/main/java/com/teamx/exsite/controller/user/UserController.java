package com.teamx.exsite.controller.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.service.user.MailService;
import com.teamx.exsite.service.user.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {
	
	private final UserService userService;
	private final MailService mService;
	
	@GetMapping("/signup")
	public String enrollForm() {
		return "/user/enrollForm";
	}
	
	@GetMapping("/login")
	public String loginForm() {
		return "/user/loginForm";
	}
	
	@GetMapping("/id/recover")
	public String findIdForm() {
		return "/user/findIdForm";
	}
	
	@ResponseBody
	@GetMapping(value="/id/check", produces="application/json; charset=utf-8")
	public int idCheck(String id) {
		System.out.println(id);
		return userService.idCheck(id);
	}
	
	@GetMapping("/password/recover/first")
	public String findPasswordForm() {
		return "/user/findPasswordFirstForm";
	}
	
	/**
	 * @param email: 인증번호를 받을 주소
	 * @return 페이지에서 받을 응답
	 * @throws Exception
	 */
	@ResponseBody
	@PostMapping(value = "/mail/authNumber", produces = "application/json; charset=utf-8")
	public Map<String, String> mailAuth(String email) throws Exception {
	    log.info("email: {}", email);
	    mService.javaMailSender(email);
	    Map<String, String> response = new HashMap<>();
	    response.put("status", "ok");
	    return response;
	}
	
	/**
	 * 
	 * @param email
	 * @param code
	 * @return
	 */
	@ResponseBody
	@PostMapping(value="/mail/verificationCode", produces="application/json; charset=utf-8;") 
	public Map<String, String> returningMailAuth(String email, String code) { 
		 return mService.verifyCode(email, code); 
	}
	
	@RequestMapping("/user/register")
	public String userRegister(HttpSession session, UserDTO registerInfo) {
		
		int result = userService.userRegister(registerInfo);
		
		if(result == 1) {
			UserDTO loginUser = new UserDTO();
			loginUser.setUserId(registerInfo.getUserId());
			session.setAttribute("loginUser", loginUser);
		}
		
		return "redirect:/";
	}

}
