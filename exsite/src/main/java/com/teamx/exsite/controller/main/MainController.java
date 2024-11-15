package com.teamx.exsite.controller.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;
import com.teamx.exsite.service.main.MainService;

@Controller
public class MainController {

	private final MainService mainService;
	
	@Autowired
	public MainController(MainService mainService) {
		this.mainService = mainService;
	}
	
	@ResponseBody
	@GetMapping("/main/slide/list")
	public List<ExhibitionEvent> mainSlideList() {
		List<ExhibitionEvent> slideList = mainService.getAllExhibitionsEvents();
//		System.out.println(slideList);
		
		return slideList;
	}
	
	@ResponseBody
	@GetMapping("/main/top10/list")
	public List<ExhibitionEvent> top10List(){
		List<ExhibitionEvent> top10List = mainService.getTop10ExhibitionsEvents();
//		System.out.println(top10List);
		return top10List;
	}
}