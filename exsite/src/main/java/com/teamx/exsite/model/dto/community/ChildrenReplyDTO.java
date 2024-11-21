package com.teamx.exsite.model.dto.community;

import lombok.Data;

@Data
public class ChildrenReplyDTO {
	private int parentReplyNo;
    private int childrenReplyNo;
    private String childrenReplyContent;
    private String childrenReplyDatetime;
    private int userNo;
    private String userId;
}
