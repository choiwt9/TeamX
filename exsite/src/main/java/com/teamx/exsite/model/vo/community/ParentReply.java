package com.teamx.exsite.model.vo.community;

import java.util.Date;

import lombok.Data;

@Data
public class ParentReply {
	private int parentReplyNo;
	private String parentReplyContent;
	private Date parentReplyDatetime;
	private String parentReplyStatus;
	private int postNo;
	private int userNo;
	
}
