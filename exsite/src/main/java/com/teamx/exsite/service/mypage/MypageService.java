package com.teamx.exsite.service.mypage;

import java.util.List;

import org.springframework.stereotype.Service;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;
import com.teamx.exsite.model.mapper.exhibition.ExhibitionMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MypageService {
	
	private final ExhibitionMapper exhibitionMapper;

	public List<ExhibitionEvent> selectLikeList(int userNo) {
		return exhibitionMapper.selectLikeList(userNo);
	}

}
