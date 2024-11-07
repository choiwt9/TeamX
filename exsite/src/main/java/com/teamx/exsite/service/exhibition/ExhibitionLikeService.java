package com.teamx.exsite.service.exhibition;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.exhibition.vo.ExhibitionLike;
import com.teamx.exsite.model.mapper.exhibition.ExhibitionLikeMapper;

@Service
public class ExhibitionLikeService implements ExhibitionLikeServiceInterface {

	@Autowired
	private ExhibitionLikeMapper exhibitionLikeMapper;
	
	@Override
	public void addLike(ExhibitionLike exhibitionLike) {
		
		try {
	        exhibitionLikeMapper.insertLike(exhibitionLike);
	    } catch (Exception e) {
	        // 로그를 남기고, 필요한 경우 사용자에게 적절한 예외를 던짐
	        throw new RuntimeException("좋아요 추가 중 오류 발생", e);
	    }
		
	}

	@Override
	public void removeLike(int userNo, int exhibitionNo) {

		exhibitionLikeMapper.deleteLike(userNo, exhibitionNo);
		
	}

	@Override
	public List<Integer> getLikesByUser(int userNo) {

		return exhibitionLikeMapper.selectLikesByUser(userNo);
		
	}

}