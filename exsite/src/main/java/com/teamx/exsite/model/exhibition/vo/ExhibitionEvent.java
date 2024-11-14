package com.teamx.exsite.model.exhibition.vo;

import lombok.Data;

@Data
public class ExhibitionEvent {

	private int exhibitionNo;
	private String title;
	private String place;
	private String mainImg;
	private String exDate;
	private String codeName;
	private String isFree;
	private String useFee;
	private String strtDate;
	private String endDate;
	private String detailImgUrl;
	private int userNo;
	private int likeCount; // 좋아요 개수 추가
	
	private String orgLink;
	
}
