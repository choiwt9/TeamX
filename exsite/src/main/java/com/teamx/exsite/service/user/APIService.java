package com.teamx.exsite.service.user;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class APIService {
	@Value("${google.tokenRequestUrl}")
	private String tokenRequestUrl;
	@Value("${google.client_id}")
	private String client_id;
	@Value("${google.client_secret}")
	private String client_secret;
	@Value("${google.redirect_uri}")
	private String redirect_uri;
	@Value("${google.userInfoRequestUrl}")
	private String userInfoRequestUri;
	
	
	public String getToken(String code) {

		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		// 요청 바디 설정
		MultiValueMap<String, String> bodyParams = new LinkedMultiValueMap<>();
		bodyParams.add("code", code);
		bodyParams.add("client_id", client_id);
		bodyParams.add("client_secret", client_secret);
		bodyParams.add("redirect_uri", redirect_uri);
		bodyParams.add("grant_type", "authorization_code");

		// 요청 바디를 Form 형식으로 변환
		HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(bodyParams, headers);

		// RestTemplate 객체로 POST 요청 전송
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(tokenRequestUrl, HttpMethod.POST, entity, String.class);

		// 응답 반환
		return response.getBody();
	}
	
	public String callGoogleLoginApi(String accessToken) {
		// 요청 헤더 설정
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken.trim()); // Access Token을 Bearer로 전달

		// 요청 바디는 필요 없으므로 null로 설정
		HttpEntity<String> entity = new HttpEntity<>(null, headers);

		// RestTemplate으로 API 호출
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(userInfoRequestUri, HttpMethod.GET, entity, String.class);

		// 응답 반환
		return response.getBody();
	}
	
	public JSONObject googleUserInfoGetProcess(String code) {
		String token = getToken(code);
		
		JSONObject tokenObj = new JSONObject(token);
		
		String accessToken = tokenObj.getString("access_token");
		
		String userInfo = callGoogleLoginApi(accessToken);
		
		JSONObject jsonUserInfo = new JSONObject(userInfo);
		
		return jsonUserInfo;
	}

}
