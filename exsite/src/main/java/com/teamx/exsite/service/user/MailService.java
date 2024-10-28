package com.teamx.exsite.service.user;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.vo.VerificationInfo;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {

	private final JavaMailSenderImpl mailSender;
	private Map<String, VerificationInfo> verificationCodes = new HashMap<>();
	
    public JavaMailSender javaMailSender(String mail) throws Exception {
        int code = 0;
        // SMTP 서버 설정
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("twwt0912@gmail.com");  // 이메일 주소
        mailSender.setPassword("ouvs afeg myie swsb");         // 이메일 비밀번호

        // 추가적인 프로퍼티 설정
        Properties prop = mailSender.getJavaMailProperties();
        prop.put("mail.smtp.auth", true);
        prop.put("mail.smtp.starttls.enable", true);

        
        MimeMessage mm = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mm, false, "UTF-8");
        code = 10000 + (int)(Math.random()*900000);
		helper.setSubject("[KH] 메일 테스트"); // 메일 제목
		helper.setText(String.valueOf(code)); // 메일 내용
		helper.setFrom("twwt0912@gmail.com", "[KH] 메일 전송"); // 발신자(이메일, 별칭)
		helper.setTo(mail);
		verificationCodes.put(mail, new VerificationInfo(String.valueOf(code), LocalDateTime.now()));
        
		mailSender.send(mm);
        return mailSender;
    }

    // 클라이언트가 제출한 코드와 대조
    public Map<String, String> verifyCode(String email, String inputCode) {
    	LocalDateTime now = LocalDateTime.now();
        VerificationInfo storedCode = verificationCodes.get(email);
        Map<String, String> response = new HashMap<>();
    	
        System.out.println("서버 저장 코드: " + storedCode + " 사용자가 입력한 코드: " + inputCode);
        if(now.isAfter(storedCode.getTimeStamp().plusMinutes(3))) {
        	 response.put("status", "인증 유효시간 초과");
        	 verificationCodes.remove(email);
        	 return response;
        }
        if(storedCode.getCode() != null && storedCode.getCode().equals(inputCode)) {
        	response.put("status", "이메일 인증 성공");
        	verificationCodes.remove(email);
        	return response;
        }
        response.put("status", "이메일 인증 실패");
        return response;
    }
    
}
