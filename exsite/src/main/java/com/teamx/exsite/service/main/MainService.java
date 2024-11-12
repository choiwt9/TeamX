package com.teamx.exsite.service.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;
import com.teamx.exsite.model.mapper.main.MainMapper;

@Service
public class MainService {

	private final MainMapper mapper;
	
	@Autowired
	public MainService(MainMapper mapper) {
		this.mapper = mapper;
	}
	
	public List<ExhibitionEvent> getAllExhibitionsEvents() {
		return mapper.getAllExhibitionsEvents();
	}

	public List<ExhibitionEvent> getTop10ExhibitionsEvents() {
		return mapper.getTop10ExhibitionsEvents();
	}

}
