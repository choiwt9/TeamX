package com.teamx.exsite.model.review.vo;

import java.util.Date;

import lombok.Data;

@Data
public class ReviewInfo {
	private String ticketNo;
	private int userNo;
	private String reviewTitle;
	private String reviewContent;
	private Date reviewDate;
	private String reviewStatus;
}
