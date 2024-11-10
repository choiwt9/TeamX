package com.teamx.exsite.controller.exhibition;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teamx.exsite.model.exhibition.vo.ExhibitionLike;
import com.teamx.exsite.service.exhibition.ExhibitionLikeService;

@RestController
@RequestMapping("/exhibition/likes")
public class ExhibitionLikeController {
	
	@Autowired
	private ExhibitionLikeService exhibitionLikeService;
	
	// 좋아요 추가
	@PostMapping
	public void addLike(@RequestBody ExhibitionLike exhibitionLike) {
		
		exhibitionLikeService.addLike(exhibitionLike);
		
	}
	
	// 좋아요 제거
	@DeleteMapping("/{userNo}/{exhibitionNo}")
	public void removeLike(@PathVariable int userNo, @PathVariable int exhibitionNo) {
		
		exhibitionLikeService.removeLike(userNo, exhibitionNo);
		
	}
	
	// 사용자가 좋아요한 전시 목록 조회
	@GetMapping("/{userNo}")
	public List<Integer> getLikesByUser(@PathVariable int userNo) {
		
		return exhibitionLikeService.getLikesByUser(userNo);
		
	}
}
