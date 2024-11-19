package com.teamx.exsite.model.vo.community;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class Board {

	private int postNo;
	private String postTitle;
	private String postContent;
	private String postCategory;
	
	//게시글 상세조회 시 날짜+시간까지 노출시키기 위한 필드(formattedPostDatetime)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm", timezone = "Asia/Seoul")
	private Timestamp postDatetime;
	
	//게시글 목록 조회 시 날짜까지만 노출시키기 위한 필드
	private String postDate;
	
	private int postViewCount;
	private String postStatus;
	private int userNo;
	private String userId;
	
	// 초가 없는 포맷된 날짜를 반환하는 메서드
	public String getFormattedPostDatetime() {
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
	    return sdf.format(postDatetime);
	}
}
