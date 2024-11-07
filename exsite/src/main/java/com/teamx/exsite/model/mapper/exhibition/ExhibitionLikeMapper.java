package com.teamx.exsite.model.mapper.exhibition;

import java.util.List;

import com.teamx.exsite.model.exhibition.vo.ExhibitionLike;

public interface ExhibitionLikeMapper {

	void insertLike(ExhibitionLike exhibitionLike);

	void deleteLike(int userNo, int exhibitionNo);

	List<Integer> selectLikesByUser(int userNo);
	
	// ExhibitionLikeMapper 인터페이스에 추가
	void incrementLikeCount(int exhibitionNo);
	
	// ExhibitionLikeMapper 인터페이스에 추가
	void decrementLikeCount(int exhibitionNo);

}
