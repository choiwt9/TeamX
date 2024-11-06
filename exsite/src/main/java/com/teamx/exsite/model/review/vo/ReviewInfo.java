package com.teamx.exsite.model.review.vo;

import lombok.Data;

@Data
public class ReviewInfo {
	private String ticketNo;
	private int userNo;
	private String reviewTitle;
	private String reviewContent;
	private int reviewDate;
	private String reviewStatus;
}
