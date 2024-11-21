package com.teamx.exsite.service.user;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.model.mapper.user.UserMapper;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class UserService {
   
   private final UserMapper userMapper;
   private final PasswordEncoder passwordEncoder;
   private final AuthService authService;
   private final APIService apiService;
   
   public UserDTO userRegister(UserDTO registerInfo) {
      String encodePass = passwordEncoder.encode(registerInfo.getUserPw());
      registerInfo.setUserPw(encodePass);
      int registerResult = userMapper.registerUser(registerInfo);
      if(registerResult  == 1) {
           int userNo = userMapper.getGeneratedUserNo();
           registerInfo.setUserNo(userNo);
           registerInfo.setMethod("NORMAL");
           registerInfo.setGrade('U');
           return registerInfo;
      }
      return null;
   }
   
   public int idCheck(String id) {
      return userMapper.idCheck(id);
   }
   
   public UserDTO basicLogin(UserDTO loginInfo) {
      UserDTO loginResult = userMapper.basicLogin(loginInfo);
      if(loginResult == null) {
         return null;
      }
      if(passwordEncoder.matches(loginInfo.getUserPw(), loginResult.getUserPw())) {
         loginResult.setUserPw(null);
         return loginResult;
      }
      return null;
   }

   public int nameCheck(String name) {
      int result = userMapper.searchUserName(name);
      return result;
   }
   
   public int accountCheck(String signupMethod, String email) {
      return userMapper.accountCheck(signupMethod, email);
   }

   public UserDTO idSearch(String authMethod) {
      return userMapper.idSearch(authMethod);
   }
   
   public String idSearch(String authMethod, String loginMethod) {
      return userMapper.socialUserIdSearch(authMethod, loginMethod);
   }
   
   public int passwordChange(int userNo, String changePassword) {
      String encodedPassword = passwordEncoder.encode(changePassword);
      return userMapper.loginUserPasswordChange(userNo, encodedPassword);
   }

   public int passwordChange(String userId, String name, String authMethod, String changePassword) {
      String encodedPassword = passwordEncoder.encode(changePassword);
      return userMapper.passwordChange(userId, name, authMethod, encodedPassword);
   }
   
   public Map<String, String> naverUserRegistration(UserDTO user, HttpSession session) {
       Map<String, String> result = new HashMap<>();
       if (accountCheck("NAVER", user.getEmail()) == 0 && identifierCheck(user.getSocialUserIdentifier()) == 0) {
           int signupResult = userMapper.registerWithNaver(user);
           if (signupResult > 0) {
               user = userMapper.socialUserLogin(user.getSocialUserIdentifier());
               session.setAttribute("loginUser", user);
               result.put("status", "success");
           } else {
              result.put("status", "false");
           }
       }
       return result;
   }

   private int identifierCheck(String socialUserIdentifier) {
      return userMapper.identifierCheck(socialUserIdentifier);
   }

   public Map<String, String> naverUserLogin(UserDTO user, HttpSession session) {
       Map<String, String> result = new HashMap<>();
       // 네이버로 가입한 이메일인지 확인, 맞으면 로그인 유저 객체 session에 담아 로그인 성공 응답
       if (accountCheck("NAVER", user.getEmail()) == 1 && identifierCheck(user.getSocialUserIdentifier()) == 1) {
           user = userMapper.socialUserLogin(user.getSocialUserIdentifier());
           if(user != null) {
              session.setAttribute("loginUser", user);
               result.put("status", "success");
           } else {
              result.put("status", "withdraw");
           }
       // 네이버로 가입한 이메일이 아닐 때, 이미 사용중인 이메일인지 확인, 존재하는 이메일이면 exist 응답
       } else if(authService.mailCheck(user.getEmail()) == 1 || authService.phoneCheck(user.getPhone()) == 1) {
          result.put("status", "exist");
       // 둘 다 아니면 false, -> 사용자 응답 확인 후 naverUserRegistration 실행여부 결정
       } else {
          result.put("status", "false");
       }
       
       
       return result;
   }
   
   public Map<String, String> googleUserRegistration(UserDTO user, HttpSession session) {
       Map<String, String> result = new HashMap<>();
       if (accountCheck("GOOGLE", user.getEmail()) == 0 && identifierCheck(user.getSocialUserIdentifier()) == 0) {
           int signupResult = userMapper.registerWithGoogle(user);
           if (signupResult > 0) {
               user = userMapper.socialUserLogin(user.getSocialUserIdentifier());
               session.setAttribute("loginUser", user);
               result.put("status", "success");
           } else {
              result.put("status", "false");
           }
       }
       return result;
   }
   
   public Map<String, String> googleUserLogin(String code, HttpSession session) {
      Map<String, String> result = new HashMap<>();
      
      JSONObject userInfo = apiService.googleUserInfoGetProcess(code);
      int accountCheck = accountCheck("GOOGLE", userInfo.getString("email"));
      int identifierCheck = identifierCheck(userInfo.getString("sub"));
      int mailCheck = authService.mailCheck(userInfo.getString("email"));
      if(accountCheck == 1 && identifierCheck == 1) {
         UserDTO user = userMapper.socialUserLogin(userInfo.getString("sub"));
         if(user != null) {
            session.setAttribute("loginUser", user);
            result.put("status", "success");
         } else {
            result.put("status", "withdraw");
         }
      } else if(mailCheck == 1) {
         result.put("status", "exist");
      } else {
         JSONObject registrationInfo = new JSONObject();
         registrationInfo.put("name", userInfo.getString("name"));
         registrationInfo.put("socialUserIdentifier", userInfo.getString("sub"));
         registrationInfo.put("email", userInfo.getString("email"));
         result.put("registrationInfo", registrationInfo.toString());
         result.put("status", "false");
      }
      return result;
   }

   // 관리자 페이지 전체 유저 정보 불러오기
   public List<UserDTO> getAllUsers() {
      
      return userMapper.getAllUsers();
      
   }

   // 관리자 페이지 회원 검색하기
   public List<UserDTO> searchUsers(String name) {

      return userMapper.searchUsers(name);
   
   }

   // 관리자 페이지 해당회원 정보 불러오기
   public UserDTO getUserByNo(int userNo) {

      return userMapper.findByUserNo(userNo);
      
   }

   // 관리자 페이지 해당회원 정보 수정하기
   public UserDTO updateUserInfo(int userNo, UserDTO member) {
      
      member.setUserNo(userNo);
      
      userMapper.updateUserInfo(member);
      
      return member;
      
   }

   // 관리자 페이지 해당회원 탈퇴 처리하기
   public boolean withdrawUserInfo(String userId) {
      
      return userMapper.updateUserStatus(userId) > 0;
      
   }   

   public UserDTO normalUserModifyInfo(UserDTO modifyInfo) {
      int result = userMapper.normalUserModifyInfo(modifyInfo);
      
      if(result == 1) {
         return userMapper.selectUserInfo(modifyInfo);
      }
      return null;
   }

   public UserDTO socialUserModifyInfo(UserDTO modifyInfo) {
      int result = userMapper.socialUserModifyInfo(modifyInfo);
      
      if(result == 1) {
         return userMapper.socialUserLogin(modifyInfo.getSocialUserIdentifier());
      }
      return null;
   }

   public int withDrawUser(int userNo, String userPw) {
      String encodedPassword = userMapper.getPassword(userNo);
      
      boolean isTrue = passwordEncoder.matches(userPw, encodedPassword);
      
      if(isTrue) {
         return userMapper.withDrawUser(userNo);
      } else {
         return 0;
      }
   }

   public int withDrawSocialUser(String email, int userNo) {
      
      return userMapper.withDrawSocialUser(email, userNo);
      
   }
}