package com.teamx.exsite.model.vo.review;

import lombok.Data;

@Data
public class ReviewDTO {
	private String name;
	private String merchantUid;
	private String exhibitionTitle;
	private int userNo;
	private String visitDate;
	private String reviewTitle;
	private String reviewContent;
	private String reviewDate;
	private String reviewStatus;
	private int exhibitionNo;
}
