package com.teamx.exsite.controller.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AdminController {
	
	@GetMapping({"/admin", "/admin/**"})
	public String returnAdminPage() {
		return "admin/index";
	}

}
