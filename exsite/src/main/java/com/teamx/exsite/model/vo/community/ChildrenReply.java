package com.teamx.exsite.model.vo.community;

import java.util.Date;

import lombok.Data;

@Data
public class ChildrenReply {
	private int childrenReplyNo;
	private String childrenReplyContent;
	private Date childrenReplyDatetime;
	private String childrenReplyStatus;
	private int parentReplyNo;
	private int userNo;
}
