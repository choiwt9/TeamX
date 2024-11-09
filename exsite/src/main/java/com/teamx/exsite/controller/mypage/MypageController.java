package com.teamx.exsite.controller.mypage;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MypageController {

	@GetMapping("/mypage/main")
	public String mypageMain() {
		return "/mypage/mypageMain";
	}
	
	@GetMapping("/mypage/view")
    public String mypageView(@RequestParam(value = "view", required = false) String view, Model model) {
        // 상태값 초기화
        model.addAttribute("showModifyUserPasswordCheck", false);
        model.addAttribute("showModifyUser", false);
        model.addAttribute("showPasswordChange", false);
        model.addAttribute("showTicketList", false);
        model.addAttribute("showTicketDetail", false);
        model.addAttribute("showLikeList", false);
        model.addAttribute("showReviewList", false); 
        model.addAttribute("showWithdraw", false);

        // view 파라미터에 따라 상태값을 true로 설정
        if (view != null) {
            switch (view) {
                case "modifyUserPasswordCheck":
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
}
