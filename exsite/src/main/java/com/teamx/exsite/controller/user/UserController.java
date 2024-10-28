package com.teamx.exsite.controller.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;

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
	private final PasswordEncoder passwordEncoder;
	
	@GetMapping("/signup")
	public String enrollForm() {
		return "/user/enrollForm";
	}
	
	@GetMapping("/login")
	public String loginForm() {
		return "/user/loginForm";
	}
	
	@GetMapping("/logout/normal")
	public String basicLogout(HttpSession session) {
		session.removeAttribute("loginUser");
		
		return "redirect:/";
	}
	
	@ResponseBody
	@PostMapping(value="/login/normal", produces="application/json; charset=utf-8")
	public Map<String, String> basicLogin(HttpSession session, UserDTO loginInfo) {
		
		Map<String, String> result = new HashMap();
		
		if(userService.basicLogin(loginInfo, passwordEncoder) > 0) {
			session.setAttribute("loginUser", loginInfo);
			result.put("response", "success");
			return result;
		}
		result.put("response", "아이디와 비밀번호를 다시 확인해주세요.");
		return result;
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
	 * @param email: 이메일 정보
	 * @param code: 해당 이메일로 전송된 코드값
	 * @return
	 */
	@ResponseBody
	@PostMapping(value="/mail/verificationCode", produces="application/json; charset=utf-8;") 
	public Map<String, String> returningMailAuth(String email, String code) { 
		 return mService.verifyCode(email, code); 
	}
	
	/**
	 * @param session 회원가입 결과 UserDTO 객체를 담음
	 * @param registerInfo 회원가입 정보
	 * @param passwordEncoder 회원정보 암호화 용도 encoder
	 * @return UserDTO userId를 담은 객체
	 */
	@RequestMapping("/user/register")
	public String userRegister(HttpSession session, UserDTO registerInfo) {
		
		System.out.println(registerInfo);
		int result = userService.userRegister(registerInfo, passwordEncoder);
		
		if(result == 1) {
			UserDTO loginUser = new UserDTO();
			loginUser.setUserId(registerInfo.getUserId());
			session.setAttribute("loginUser", loginUser);
		}
		
		return "redirect:/";
	}

}
