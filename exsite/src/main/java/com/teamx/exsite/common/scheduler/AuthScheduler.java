package com.teamx.exsite.common.scheduler;

import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.teamx.exsite.controller.user.UserController;
import com.teamx.exsite.model.user.vo.VerificationInfo;
import com.teamx.exsite.service.user.AuthService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AuthScheduler {
	
	private final AuthService authService;
	// 3분마다 authService에 Map으로 저장된 인증코드 객체들을 가져와서
	// 생성되고 3분 이상 지난 인증코드 객체일 때 삭제하는 코드
	@Scheduled(fixedRate = 180000)
	public void run() {
		LocalDateTime now = LocalDateTime.now();
		Map<String, VerificationInfo> verificationCodes = authService.getVerificationCodes();
		Iterator<VerificationInfo> iterator = verificationCodes.values().iterator();
		while (iterator.hasNext()) {
		    VerificationInfo value = iterator.next();
		    if(now.isAfter(value.getTimeStamp().plusMinutes(3))) {
		    	iterator.remove();
		    }
		}
	}
}
