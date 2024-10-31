package com.teamx.exsite.service.user;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.mapper.user.UserMapper;
import com.teamx.exsite.model.vo.VerificationInfo;

import jakarta.mail.internet.MimeMessage;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Service
@Data
@RequiredArgsConstructor
public class AuthService {

	private final JavaMailSenderImpl mailSender;
	private Map<String, VerificationInfo> verificationCodes = new HashMap<>();
	private final UserMapper userMapper;
	
	public int mailCheck(String email) {
		return userMapper.mailCheck(email);
	}
	
	//회원가입을 위한 이메일 인증
    public JavaMailSender javaMailSender(String mail) throws Exception {

        String code = generateAuthCode();
        MimeMessage mm = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mm, false, "UTF-8");
		helper.setSubject("[EX-SITE] 회원가입 인증번호"); // 메일 제목
		helper.setText(String.valueOf(code)); // 메일 내용
		helper.setFrom("twwt0912@gmail.com", "[EX-SITE] 회원가입 인증번호입니다."); // 발신자(이메일, 별칭)
		helper.setTo(mail);
		generateAuthInfo(mail, code);
		
		mailSender.send(mm);
        return mailSender;
    }
    
    // name+mail을 키값으로 인증정보 저장하고, 이메일로 인증번호 전달
    public JavaMailSender javaMailSender(String name, String mail) throws Exception {

        String code = generateAuthCode();
        MimeMessage mm = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(mm, false, "UTF-8");
		helper.setSubject("[EX-SITE] 아이디 찾기 인증 번호"); // 메일 제목
		helper.setText(String.valueOf(code)); // 메일 내용
		helper.setFrom("twwt0912@gmail.com", "[EX-SITE] 아이디 찾기 인증번호입니다."); // 발신자(이메일, 별칭)
		helper.setTo(mail);
		generateAuthInfo(name+mail, code);
		
		mailSender.send(mm);
        return mailSender;
    }

    // 전달받은 두 값을 각각 key - value로 인증정보 vericationCodes 맵에서 일치하는 값을 찾아 결과 반환
    public Map<String, String> verifyCode(String key, String inputCode) {
    	LocalDateTime now = LocalDateTime.now();
        VerificationInfo storedCode = verificationCodes.get(key);
        Map<String, String> response = new HashMap<>();
    	
        if(now.isAfter(storedCode.getTimeStamp().plusMinutes(3))) {
        	 response.put("status", "timeout");
        	 verificationCodes.remove(key);
        	 return response;
        }
        if(storedCode.getCode() != null && storedCode.getCode().equals(inputCode)) {
        	response.put("status", "success");
        	verificationCodes.remove(key);
        	return response;
        }
        response.put("status", "false");
        return response;
    }
    
    // 전달받은 값을 각각 key - value 값 쌍으로 인증정보 객체를 생성
    public void generateAuthInfo(String key, String value) {
    	this.verificationCodes.put(key, new VerificationInfo(value, LocalDateTime.now()));
    }
    
    // 6자리 랜덤 인증번호를 생성
    public String generateAuthCode() {
    	return String.valueOf(10000 + (int)(Math.random()*900000));
    }
    
}
