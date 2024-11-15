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

	List<ExhibitionEvent> searchByTitle(String query);

}
