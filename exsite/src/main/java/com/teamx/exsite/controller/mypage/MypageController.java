package com.teamx.exsite.controller.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.service.user.AuthService;
import com.teamx.exsite.service.user.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MypageController {
	
	private final AuthService authService;
	private final UserService userService;

	@GetMapping("/mypage/main")
	public String mypageMain() {
		return "/mypage/mypageMain";
	}
	
	@GetMapping("/mypage/view")
    public String mypageView(@RequestParam(value = "view", required = false) String view, Model model, HttpSession session) {
        // view 파라미터에 따라 상태값을 true로 설정
        if (view != null) {
            switch (view) {
                case "modifyUserPasswordCheck":
                	UserDTO loginUser = (UserDTO)session.getAttribute("loginUser");
                	if(loginUser.getMethod() != null) {
                		if(loginUser.getMethod().equals("NAVER") || loginUser.getMethod().equals("GOOGLE")) {
                    		model.addAttribute("showModifyUser", true);
                    		return "mypage/mypageView";
                    	}
                	}
                    model.addAttribute("showModifyUserPasswordCheck", true);
                    break;
                case "modifyUser":
                    model.addAttribute("showModifyUser", true);
                    break;
                case "passwordChange":
                    model.addAttribute("showPasswordChange", true);
                    break;
                case "ticketList":
                    model.addAttribute("showTicketList", true);
                    break;
                case "ticketDetail":
                    model.addAttribute("showTicketDetail", true);
                    break;
                case "likeList":
                    model.addAttribute("showLikeList", true);
                    break;
                case "reviewList":
                    model.addAttribute("showReviewList", true);
                    break;
                case "withdraw":
                    model.addAttribute("showWithdraw", true);
                    break;
                default:
                    break;
            }
        }
        return "mypage/mypageView";
    }
	
	@PostMapping("/mypage/verify/password")
	public String passwordCheck(String password, HttpSession session, Model model) {
		
		boolean isTrue = authService.passwordCheck(password, session);
		if(isTrue) {
			model.addAttribute("showModifyUser", true);
		} else {
			model.addAttribute("showModifyUserPasswordCheck", true);
			model.addAttribute("alertMsg", "비밀번호가 틀렸습니다.");
		}
		
		return "mypage/mypageView";
	}
	
	@PostMapping("/mypage/modify/personalinfo")
	public String modifyPersonalInfo(Model model, HttpSession session, UserDTO modifyInfo) {
		UserDTO loginUser = (UserDTO)session.getAttribute("loginUser");
		modifyInfo.setUserNo(loginUser.getUserNo());
		modifyInfo.setSocialUserIdentifier(loginUser.getSocialUserIdentifier());
		UserDTO afterModifyInfo = loginUser.getMethod().equals("NORMAL") 
								 ? userService.normalUserModifyInfo(modifyInfo) 
								 : userService.socialUserModifyInfo(modifyInfo); 
		
		if(afterModifyInfo != null) {
			session.setAttribute("loginUser", afterModifyInfo);
		}
		
		model.addAttribute("showModifyUser", true);
		return "mypage/mypageView";
	}
	
	@PostMapping("/mypage/password/change")
	public String passwordchange(HttpSession session, Model model, String changePassword) {
		UserDTO loginUser = (UserDTO)session.getAttribute("loginUser");
		if(!loginUser.getMethod().equals("NORMAL")) {
			model.addAttribute("alertMsg", "소셜 로그인한 회원은 비밀번호를 설정할 수 없습니다.");
			model.addAttribute("showPasswordChange", true);
			return "mypage/mypageView";
		} else {
			int result = userService.passwordChange(loginUser.getUserNo(), changePassword);
			if(result == 1) {
				model.addAttribute("alertMsg", "비밀번호가 변경되었습니다.");
			} else {
				model.addAttribute("alertMsg", "비밀번호가 변경에 실패했습니다.");
			}
		}
		model.addAttribute("showPasswordChange", true);
		return "mypage/mypageView";
	}
	
	@PostMapping("/mypage/withdraw")
	public String withdraw(HttpSession session, Model model, String userPw) {
		int userNo = ((UserDTO)session.getAttribute("loginUser")).getUserNo();
		
		int result = userService.withDrawUser(userNo, userPw);
		
		if(result == 1) {
			model.addAttribute("alertMsg", "회원탈퇴 처리되었습니다.");
			session.invalidate();
			return "common/main";
		} else {
			model.addAttribute("alertMsg", "회원탈퇴처리에 실패했습니다. 비밀번호를 다시 확인해주세요.");
			model.addAttribute("showWithdraw", true);
			return "mypage/mypageView";
		}
		
	}
	
}
