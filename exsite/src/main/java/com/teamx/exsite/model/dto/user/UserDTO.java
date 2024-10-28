package com.teamx.exsite.model.dto.user;

import lombok.Data;

@Data
public class UserDTO {
	private int UserNo;
	private String userId;
	private String userPw;
	private String email;
	private int phone;
	private String address;
	private String createDate;
	private String updateDate;
	private char userStatus;
	private String method;
	private char grade;
}
