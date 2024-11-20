package com.teamx.exsite.controller.header;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.teamx.exsite.model.vo.exhibition.ExhibitionEvent;
import com.teamx.exsite.service.exhibition.ExhibitionService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SearchController {

	private final ExhibitionService exhibitionService;
	
	@GetMapping("/search/results")
	public String searchResults(@RequestParam("query") String query, Model model) {
		// 검색어로 전시 제목을 검색
		List<ExhibitionEvent> searchResults = exhibitionService.searchByTitle(query);
		
		model.addAttribute("searchQuery", query);
		model.addAttribute("searchResults", searchResults);
		
		return "common/searchResult";
		
	}
}