package com.teamx.exsite.model.review.dto;

import java.util.Date;

import com.teamx.exsite.model.review.vo.ReviewInfo;

import lombok.Data;

@Data
public class ReviewDTO {
	private String ticketNo;
	private String userNo;
	private String reviewTitle;
	private String reviewContent;
	private Date reviewDate;
	private String reviewStatus;
	private int exhibitionNo;

}
