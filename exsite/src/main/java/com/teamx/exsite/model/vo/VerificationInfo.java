package com.teamx.exsite.model.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class VerificationInfo {
	private String code;
	private LocalDateTime timeStamp;
}
