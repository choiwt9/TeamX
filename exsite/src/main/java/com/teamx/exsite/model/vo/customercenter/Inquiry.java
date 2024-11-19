package com.teamx.exsite.model.vo.customercenter;

import java.util.Date;

import lombok.Data;

@Data
public class Inquiry {
	
	private int inquiryNo;
	private int userNo;
	private String inquiryTitle;
	private String inquiryContent;
	private String inquiryOriginFile;
	private String inquiryChangeFile;
	private Date inquiryDate;
	private char inquiryResponse;
	private String responseContent;
	private String userId;
	
}
