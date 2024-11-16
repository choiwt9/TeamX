package com.teamx.exsite.model.vo.exhibition;

import lombok.Data;

@Data
public class ReviewDTO {
	private String name;
	private String merchantUid;
	private String exhibitionTitle;
	private int userNo;
	private String reviewTitle;
	private String reviewContent;
	private String reviewDate;
	private String reviewStatus;
	private int exhibitionNo;
}
