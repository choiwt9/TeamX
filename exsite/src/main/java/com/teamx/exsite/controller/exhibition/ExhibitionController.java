package com.teamx.exsite.controller.exhibition;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;
import com.teamx.exsite.service.exhibition.ExhibitionService;

@Controller
public class ExhibitionController {
	
	private final ExhibitionService exhibitionService;
	
	@Autowired
	public ExhibitionController(ExhibitionService exhibitionService) {
		
		this.exhibitionService = exhibitionService;
	
	}
	
	@GetMapping("/exhibition/list/search")
	public String exhibitionListSearch(Model model) {
		
		List<ExhibitionEvent> exhibitions = exhibitionService.findAllExhibition();
		model.addAttribute("exhibitions", exhibitions);
		return "exhibition/exhibitionListSearch";
		
	}
	
	@GetMapping("/event/list/search")
	public String eventListSearch(Model model) {
		
		List<ExhibitionEvent> events = exhibitionService.findAllEvents();
		model.addAttribute("exhibitions", events);
		return "event/eventListSearch"; 
	
	}
	
	@GetMapping("/exhibition/detail")
	public String exhibitionDetail(@RequestParam(value="id") int exhibitionNo, Model model) {

		ExhibitionEvent exhibition = exhibitionService.findExhibitionById(exhibitionNo);
		if (exhibition == null) {
	        // 전시회가 없을 경우 에러 페이지로 리다이렉트하거나 적절한 처리
	        return "error"; // error.html 페이지로 이동
	    }
		
		String detailImgUrls = exhibition.getDetailImgUrl();
		if(detailImgUrls != null) {
			List<String> detailImgUrlList = Arrays.asList(detailImgUrls.split(" "));
			model.addAttribute("detailImgUrlList", detailImgUrlList);
		}
		
		
	    model.addAttribute("exhibition", exhibition);
	    
	    return "/exhibition/exhibitionDetail";
		
	}
	
	@GetMapping("/event/detail")
	public String getExhibitionDetail(@RequestParam(value="id") int exhibitionNo, Model model) {
		
		ExhibitionEvent exhibition = exhibitionService.findExhibitionById(exhibitionNo);
		if (exhibition == null) {
	        // 전시회가 없을 경우 에러 페이지로 리다이렉트하거나 적절한 처리
	        return "error"; // error.html 페이지로 이동
	    }
		
		String detailImgUrls = exhibition.getDetailImgUrl();
		if(detailImgUrls != null) {
			List<String> detailImgUrlList = Arrays.asList(detailImgUrls.split(" "));
			model.addAttribute("detailImgUrlList", detailImgUrlList);
		}
		
	    model.addAttribute("exhibition", exhibition);
		
		return "event/eventDetail";
	
	}
	
	@GetMapping("/exhibition/list/sort")
	@ResponseBody
	public List<ExhibitionEvent> sortExhibitions(@RequestParam String sortType, @RequestParam(required = false) String codename) {
		
		if ("event".equals(codename)) {
			switch (sortType) {
				case "endSoon":
					return exhibitionService.findEventSortedByEndDate();
				case "mostReviewed":
					return exhibitionService.findEventSortedByReviews();
				case "free":
					return exhibitionService.findFreeEvents();
				case "paid":
					return exhibitionService.findPaidEvents();
				default:
					return Collections.emptyList();
			}
		} else {
			switch (sortType) {
				case "endSoon":
					return exhibitionService.findExhibitionSortedByEndDate();
				case "mostReviewed":
					return exhibitionService.findExhibitionSortedByReviews();
				case "free":
					return exhibitionService.findFreeExhibitions();
				case "paid":
					return exhibitionService.findPaidExhibitions();
				default:
					return Collections.emptyList();
					
			}
		}
	}
}