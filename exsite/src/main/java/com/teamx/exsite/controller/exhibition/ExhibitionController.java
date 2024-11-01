package com.teamx.exsite.controller.exhibition;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExhibitionController {
	
	@GetMapping("/exhibition/list/search")
	public String ExhibitionListSerach() {
	
		return "exhibition/exhibitionListSearch";
	
	}
	
	@GetMapping("/event/list/search")
	public String EventListSearch() {
		
		return "exhibition/exhibitionListSearch"; 
	
	}
	
	@GetMapping("/exhibition/detail")
	public String ExhibitionDetail() {
		
		return "exhibition/exhibitionDetail";
		
	}
	
	
}
