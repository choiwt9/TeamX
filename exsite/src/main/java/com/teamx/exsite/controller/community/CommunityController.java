package com.teamx.exsite.controller.community;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommunityController {

	@GetMapping("/community/list")
	public String CommunityList() {
		return "community/communityList"; // templates/community/communityList.html 파일을 반환
	}
	
	@GetMapping("/community/write")
	public String CommunityWrite() {
		return "community/communityWrite"; // templates/community/communityWrite.html 파일을 반환
	}
	
	@GetMapping("/community/post")
	public String CommunityPost() {
		return "community/communityPost"; // templates/community/communityPost.html 파일을 반환
	}
	
	@GetMapping("/community/edit")
	public String CommunityEdit() {
		return "community/communityEdit";
	}
}
