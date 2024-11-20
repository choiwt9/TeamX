package com.teamx.exsite.common.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import com.teamx.exsite.service.user.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AccountRecoverInterceptor implements HandlerInterceptor {

	private final AuthService authService;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String userId = (String)request.getAttribute("userId");
		String code = (String)request.getAttribute("code");
		
		if(userId == null || code == null) {
			return false;
		} else {
			boolean result = authService.getVerificationCodes().get("userId")
										.getCode()
										.equals(code);
			if(result) {
				return true;
			}
		}
		return true;
	}
	
	

}