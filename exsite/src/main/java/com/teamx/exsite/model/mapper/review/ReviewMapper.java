package com.teamx.exsite.model.mapper.review;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.vo.exhibition.ReviewDTO;

@Mapper
public interface ReviewMapper {

	public List<ReviewDTO> selectReviewList(int exhibitionNo);

	public int insertReview(ReviewDTO review);

	public int checkReviewWrited(int userNo, String merchantUid);

	public int updateReview(ReviewDTO replaceReview);

	public List<ReviewDTO> selelectViewedContent(int userNo);

	public List<ReviewDTO> selectWritedReviewList(int userNo);

	public int deleteReview(ReviewDTO deleteReview);

	public List<ReviewDTO> selectMyPageReviewList(int userNo, RowBounds rowBounds);

	public int selectMyPageReviewCount(int userNo);

}
