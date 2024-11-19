package com.teamx.exsite.service.review;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.mapper.review.ReviewMapper;
import com.teamx.exsite.model.vo.review.ReviewDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewService {
	
	private final ReviewMapper reviewMapper;
	


	public List<ReviewDTO> selectReviewList(int exhibitionNo) {
		return reviewMapper.selectReviewList(exhibitionNo);
	}

	public int insertReview(ReviewDTO review) {
		return reviewMapper.insertReview(review);
	}

	public int checkReviewWrited(int userNo, String merchantUid) {
		return reviewMapper.checkReviewWrited(userNo, merchantUid);
	}

	public int updateReview(ReviewDTO replaceReview) {
		return reviewMapper.updateReview(replaceReview);
	}

	public List<ReviewDTO> selelectViewedContent(int userNo) {
		return reviewMapper.selelectViewedContent(userNo);
	}

	public List<ReviewDTO> selectWritedReviewList(int userNo) {
		return reviewMapper.selectWritedReviewList(userNo);
	}
	// 관람일이 지난 에매항목 중 이미 리뷰쓰는데 사용된 예매정보를 제외
	public List<ReviewDTO> writingPossibleReviews(List<ReviewDTO> viewedContent, List<ReviewDTO> writedReview) {
		
		return viewedContent.stream()
	    .filter(viewed -> 
	        writedReview.stream()
	            .noneMatch(writed -> 
	                viewed.getMerchantUid() != null 
	                && viewed.getMerchantUid().equals(writed.getMerchantUid())
	            )
	    )
	    .collect(Collectors.toList());
	}

	public int deleteReview(String merchantUid) {
		return reviewMapper.deleteReview(merchantUid);
	}

	public List<ReviewDTO> selectMyPageReviewList(int userNo, PageInfo pageInfo) {
		int offset = (pageInfo.getCurrentPage() - 1) * pageInfo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, pageInfo.getBoardLimit());
		return reviewMapper.selectMyPageReviewList(userNo, rowBounds);
	}

	public List<ReviewDTO> getReviewList() {
		return reviewMapper.getReviewList();
	}
	
	

}
