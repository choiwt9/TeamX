package com.teamx.exsite.controller.user;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teamx.exsite.model.mapper.community.BoardMapper;
import com.teamx.exsite.model.mapper.customercenter.CustomercenterMapper;
import com.teamx.exsite.model.mapper.exhibition.ExhibitionMapper;
import com.teamx.exsite.model.mapper.exmap.ExmapMapper;
import com.teamx.exsite.model.mapper.user.UserMapper;
import com.teamx.exsite.service.user.AuthService;
import com.teamx.exsite.service.user.UserService;

import lombok.RequiredArgsConstructor;

@WebMvcTest(controllers = UserController.class, 
excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, classes = Mapper.class))
@RequiredArgsConstructor
public class UserControllerTest {

@MockBean
private UserService userService;
@MockBean
private AuthService authService;
@MockBean  // BoardMapper를 목 객체로 처리
private BoardMapper boardMapper;
@MockBean
private CustomercenterMapper customercenterMapper;
@MockBean
private ExhibitionMapper exhibitionMapper;
@MockBean
private ExmapMapper exmapMapper;
@MockBean
private UserMapper userMapper;


@Autowired
private MockMvc mockMvc;

@Autowired
private ObjectMapper objectMapper;

@Test
@DisplayName("로그인 테스트")
void changePasswordTest() throws Exception {
    Map<String, String> requestMap = new HashMap<>();
    
    requestMap.put("userId", "twwt0912");

    mockMvc.perform(post("/login/normal")
            .content(objectMapper.writeValueAsString(requestMap))
            .contentType(MediaType.APPLICATION_JSON))
        .andExpect(status().isOk());
}
}
