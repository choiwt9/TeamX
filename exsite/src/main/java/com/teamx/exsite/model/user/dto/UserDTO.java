package com.teamx.exsite.model.user.dto;

import lombok.Data;

@Data
public class UserDTO {
	private int UserNo;
	private String name;
	private String userId;
	private String userPw;
	private String email;
	private String phone;
	private String address;
	private String addressDetail;
	private String createDate;
	private String updateDate;
	private char userStatus;
	private String method;
	private String socialUserIdentifier;
	private char grade;
}
