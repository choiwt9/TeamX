package com.teamx.exsite.service.exhibition;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;
import com.teamx.exsite.model.mapper.exhibition.ExhibitionMapper;

@Service
public class ExhibitionService {

	private final ExhibitionMapper exhibitionMapper;
	
	@Autowired
	public ExhibitionService(ExhibitionMapper exhibitionMapper) {
		
		this.exhibitionMapper = exhibitionMapper;
	
	}
	
	public List<ExhibitionEvent> findAllExhibition(){
	
		return exhibitionMapper.getAllExhibitions();
	
	}

	public List<ExhibitionEvent> findExhibitionSortedByEndDate() {

		return exhibitionMapper.getExhibitionsSortedByEndDate();
		
	}

	public List<ExhibitionEvent> findExhibitionSortedByReviews() {

		return exhibitionMapper.getExhibitionSortedByReviews();
		
	}

	public List<ExhibitionEvent> findFreeExhibitions() {
		
		return exhibitionMapper.getFreeExhibitions();
		
	}

	public List<ExhibitionEvent> findPaidExhibitions() {
		
		return exhibitionMapper.getPaidExhibitions();
		
	}

	public ExhibitionEvent findExhibitionById(int exhibitionNo) {
		
		return exhibitionMapper.getExhibitionById(exhibitionNo);
	
	}
	
	public List<ExhibitionEvent> findAllEvents() {
		
		return exhibitionMapper.getAllEvents();
		
	}

	public List<ExhibitionEvent> findEventSortedByEndDate() {

		return exhibitionMapper.getEventsSortedByEndDate();
		
	}

	public List<ExhibitionEvent> findEventSortedByReviews() {
		
		return exhibitionMapper.getEventSortedByReviews();
		
	}

	public List<ExhibitionEvent> findFreeEvents() {
		
		return exhibitionMapper.getFreeEvents();
	}

	public List<ExhibitionEvent> findPaidEvents() {
		
		return exhibitionMapper.getPaidEvents();
	}

	public void addLike(int userNo, int exhibitionNo) {
		 
		exhibitionMapper.insertLike(userNo, exhibitionNo);
		
	}

	public void removeLike(int userNo, int exhibitionNo) {
		
		 exhibitionMapper.deleteLike(userNo, exhibitionNo);
		 
	}

	public int checkLike(int userNo, int exhibitionNo) {
		return exhibitionMapper.checkLike(userNo, exhibitionNo);
	}

	// 관리자 페이지 전시목록 불러오기
	public List<ExhibitionEvent> findAllExhibitionEvent() {

		return exhibitionMapper.findAllExhibitionEvent();
			
	}
		
	// 관리자 페이지 전시 검색하기
	public List<ExhibitionEvent> searchExhibitions(String title) {
					
		return exhibitionMapper.findExhibitionsByTitle(title);
				
	}

	// 관리자 페이지 전시관리버튼
	public void deleteExhibition(int exhibitionNo) {
		
		exhibitionMapper.updateExhibitionStatus(exhibitionNo, "Y");
		
	}
	
}
