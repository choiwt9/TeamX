package com.teamx.exsite.model.mapper.exhibition;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;

@Mapper
public interface ExhibitionMapper {

	List<ExhibitionEvent> getAllExhibitions();

	List<ExhibitionEvent> getExhibitionsSortedByEndDate();

	List<ExhibitionEvent> getExhibitionSortedByReviews();

	List<ExhibitionEvent> getFreeExhibitions();

	List<ExhibitionEvent> getPaidExhibitions();
	
	ExhibitionEvent getExhibitionById(int exhibitionNo);
	
	List<ExhibitionEvent> getAllEvents();

	List<ExhibitionEvent> getEventsSortedByEndDate();

	List<ExhibitionEvent> getEventSortedByReviews();

	List<ExhibitionEvent> getFreeEvents();

	List<ExhibitionEvent> getPaidEvents();

	void insertLike(int userNo, int exhibitionNo);

	void deleteLike(int userNo, int exhibitionNo);

	int checkLike(int userNo, int exhibitionNo);

	//관리자 페이지 전시목록 불러오기
	List<ExhibitionEvent> findAllExhibitionEvent();

	// 관리자 페이지 전시 검색하기
	List<ExhibitionEvent> findExhibitionsByTitle(String title);

	// 관리자 페이지 전시관리버튼
	void updateExhibitionStatus(int exhibitionNo, String status);

}
