package com.teamx.exsite.controller.community;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommunityController {

	@GetMapping("/communityList")
	public String CommunityList() {
		return "community/communityList"; // templates/community/communityList.html 파일을 반환
	}
	
	@GetMapping("/communityWrite")
	public String CommunityWrite() {
		return "community/communityWrite"; // templates/community/communityWrite.html 파일을 반환
	}
	
	@GetMapping("/communityPost")
	public String CommunityPost() {
		return "community/communityPost"; // templates/community/communityPost.html 파일을 반환
	}
	
	@GetMapping("/communityEdit")
	public String CommunityEdit() {
		return "community/communityEdit";
	}
}
