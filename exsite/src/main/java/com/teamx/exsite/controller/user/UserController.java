package com.teamx.exsite.controller.user;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.service.user.AuthService;
import com.teamx.exsite.service.user.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final AuthService authService;

	@GetMapping("/signup")
	public String enrollForm() {
		return "/user/enrollForm";
	}

	@GetMapping("/login")
	public String loginForm(Model model, @RequestParam(value = "userId", required = false) String userId) {
		if (userId != null)
			model.addAttribute("userId", userId);
		return "/user/loginForm";
	}

	@GetMapping("/logout/normal")
	public String basicLogout(HttpSession session) {
		session.invalidate();
		return "redirect:/";
	}

	@ResponseBody
	@PostMapping(value = "/login/normal", produces = "application/json; charset=utf-8")
	public Map<String, String> basicLogin(HttpSession session, UserDTO loginInfo) {

		Map<String, String> result = new HashMap();

		if (userService.basicLogin(loginInfo) > 0) {
			session.setAttribute("loginUser", loginInfo);
			result.put("response", "success");
			return result;
		}
		result.put("response", "false");
		return result;
	}

	@ResponseBody
	@PostMapping(value = "/id/check", produces = "application/json; charset=utf-8")
	public int idCheck(String userId) {
		return userService.idCheck(userId);
	}

	/**
	 * @param email: 인증번호를 받을 주소
	 * @return 페이지에서 받을 응답
	 * @throws Exception
	 */
	@ResponseBody
	@PostMapping(value = "/mail/signup/authnumber", produces = "application/json; charset=utf-8")
	public Map<String, String> mailAuth(String email) throws Exception {
		log.info("email: {}", email);
		Map<String, String> response = new HashMap<>();
		int mailCheckResult = authService.mailCheck(email.trim());
		if (mailCheckResult > 0) {
			response.put("status", "exist");
			return response;
		}
		authService.javaMailSender(email);
		response.put("status", "ok");
		return response;
	}

	/**
	 * @param email: 이메일 정보
	 * @param code:  해당 이메일로 전송된 코드값
	 * @return
	 */
	@ResponseBody
	@PostMapping(value = "/mail/signup/verificationcode", produces = "application/json; charset=utf-8;")
	public Map<String, String> returningMailAuth(String email, String code) {
		return authService.verifyCode(email, code);
	}

	// --------------------------계정정보 메일 인증 기능 -------------------------------
	@ResponseBody
	@PostMapping(value = "/mail/authnumber")
	public Map<String, String> emailAuthNumberTransfer(String name, String email) throws Exception {

		Map<String, String> response = new HashMap<>();

		int mailCheckResult = authService.mailCheck(email.trim());
		int nameCheckResult = userService.nameCheck(name.trim());
		if (mailCheckResult > 0 && nameCheckResult > 0) {
			authService.javaMailSender(name, email);
			response.put("status", "success");
			return response;
		}

		response.put("status", "notfound");
		return response;
	}

	@ResponseBody
	@PostMapping(value = "/mail/verification", produces = "application/json; charset=utf-8;")
	public Map<String, String> returningMailAuth(String name, String email, String code) {
		// name+email을 키로, 받은 code를 value로 인증
		Map<String, String> result = authService.verifyCode(name + email, code);
		// 사용자 이메일로 계정 정보를 찾음
		String userId = userService.idSearch(email);
		// 해당 인증정보를 result 맵에 같이 넣어 요청페이지로 전달
		result.put("userId", userId);
		return result;
	}
	// ------------------------------------------------------------------------
	// ------------------------ 아이디 찾기 ----------------------------------------

	@GetMapping("/id/recover")
	public String findIdForm() {
		return "/user/findIdForm";
	}

	@GetMapping("/id/recover/result")
	public String findIdResult() {
		return "/user/findIdResultForm";
	}

	// -------------------------------------------------------------------------
	// ------------------------ 비밀번호 찾기 ----------------------------------------
	@GetMapping("/password/recover/first")
	public String findPasswordFirstForm(@RequestParam(value = "userId", required = false) String userId, Model model) {
		if (userId != null) {
			model.addAttribute("userId", userId);
		}
		return "/user/findPasswordFirstForm";
	}

	@PostMapping("/password/recover/second")
	public String findPasswordSecondForm(@RequestParam(value = "userId", required = false) String userId, Model model) {
		if (userId != null) {
			model.addAttribute("userId", userId);
		}
		return "/user/findPasswordSecondForm";
	}

	@PostMapping("/password/reset/form")
	public String passwordResetForm(String userId, String name, String email, Model model) {
		model.addAttribute("userId", userId);
		model.addAttribute("name", name);
		model.addAttribute("email", email);
		String code = authService.generateAuthCode();
		authService.generateAuthInfo(email + name + userId, code);
		model.addAttribute("code", code);
		return "/user/resetPasswordForm";
	}

	@PostMapping("/password/reset")
	public String passwordReset(String userId, String name, String email, String code, String resetPassword,
			Model model) {
		String result = authService.verifyCode(email + name + userId, code).get("status");

		if (result.equals("timeout")) {
			model.addAttribute("alertMsg", "인증 유효시간이 초과되었습니다.");
			return "redirect:/";
		} else if (result.equals("success")) {
			int passwordResetResult = userService.passwordReset(userId, name, email, resetPassword);
			if (passwordResetResult == 1) {
				model.addAttribute("alertMsg", "비밀번호가 초기화되었습니다.");
			} else {
				model.addAttribute("alertMsg", "오류가 발생했습니다. 관리자에게 문의 바랍니다.");
			}
		} else if (result.equals("false")) {
			model.addAttribute("alertMsg", "오류가 발생했습니다. 관리자에게 문의 바랍니다.");

		}

		return "redirect:/";
	}

	// -------------------------------------------------------------------------

	/**
	 * @param session         회원가입 결과 UserDTO 객체를 담음
	 * @param registerInfo    회원가입 정보
	 * @param passwordEncoder 회원정보 암호화 용도 encoder
	 * @return UserDTO userId를 담은 객체
	 */
	@RequestMapping("/user/register")
	public String userRegister(HttpSession session, UserDTO registerInfo) {

		registerInfo.setAddress(registerInfo.getAddress() + "=" + registerInfo.getAddressDetail());

		int result = userService.userRegister(registerInfo);

		if (result == 1) {
			UserDTO loginUser = new UserDTO();
			loginUser.setUserId(registerInfo.getUserId());
			session.setAttribute("loginUser", loginUser);
		}

		return "redirect:/";
	}
}
