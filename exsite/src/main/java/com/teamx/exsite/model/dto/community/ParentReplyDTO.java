package com.teamx.exsite.model.dto.community;

import java.util.List;

import lombok.Data;

@Data
public class ParentReplyDTO {

    private int postNo;
    private int parentReplyNo;
    private String parentReplyContent;
    private String parentReplyStatus;
    private String parentReplyDatetime;
    private int userNo;
    private String userId;

    private int childrenReplyNo;
    private String childrenReplyContent;
    private String childrenReplyDatetime;
}
