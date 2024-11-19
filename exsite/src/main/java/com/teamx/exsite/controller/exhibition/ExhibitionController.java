package com.teamx.exsite.controller.exhibition;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;
import com.teamx.exsite.service.exhibition.ExhibitionService;

@RestController
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
	
	@ResponseBody
	@GetMapping(value="/exhibition/likes/add", produces="application/json; charset=utf-8")
    public Map<String, String> addLike(@RequestParam int userNo, @RequestParam int exhibitionNo) {
        int result = exhibitionService.checkLike(userNo, exhibitionNo);
        Map<String, String> responseResult = new HashMap<>();
		if(result == 0) {
			responseResult.put("status", "add");
			exhibitionService.addLike(userNo, exhibitionNo);
			return responseResult;
		} else {
			responseResult.put("status", "remove");
			exhibitionService.removeLike(userNo, exhibitionNo);
			return responseResult;
		}
    }
	
	@ResponseBody
	@GetMapping(value="/exhibition/likes/status", produces="application/json; charset=utf-8")
    public Map<String, String> likeStatus(@RequestParam int userNo, @RequestParam int exhibitionNo) {
        int result = exhibitionService.checkLike(userNo, exhibitionNo);
        Map<String, String> responseResult = new HashMap<>();
		if(result == 1) {
			responseResult.put("status", "true");
			return responseResult;
		} else {
			responseResult.put("status", "false");
			return responseResult;
		}
    }
	
	// 관리자 페이지 전시목록 불러오기
	@GetMapping("/api/exhibitions")
	@ResponseBody
	public List<ExhibitionEvent> getAllExhibitionEvents() {
		 
		return exhibitionService.findAllExhibitionEvent();
	 
	}
	 
	// 관리자 페이지 전시 검색하기
	@GetMapping("/api/exhibitions/search")
	public List<ExhibitionEvent> searchExhibitions(@RequestParam String title) {
		 
		return exhibitionService.searchExhibitions(title);
		 
	}
	 
	// 관리자 페이지 전시관리버튼
	@PatchMapping("/api/exhibitions/{exhibitionNo}")
	public ResponseEntity<String> deleteExhibition(@PathVariable int exhibitionNo) {
		 
		exhibitionService.deleteExhibition(exhibitionNo);
	     
		return ResponseEntity.ok().build();
	    
	}
	  
}