package com.teamx.exsite.service.exhibition;

import java.util.List;

import com.teamx.exsite.model.exhibition.vo.ExhibitionLike;

public interface ExhibitionLikeServiceInterface {
	
	void addLike(ExhibitionLike exhibitionLike);
	void removeLike(int userNo, int exhibitionNo);
	List<Integer> getLikesByUser(int userNo);

}
