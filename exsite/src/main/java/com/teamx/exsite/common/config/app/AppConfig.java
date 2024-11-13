package com.teamx.exsite.common.config.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.teamx.exsite.common.aspect.LoggingAOP;
import com.teamx.exsite.common.interceptor.LoginInterceptor;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableAspectJAutoProxy// AOP 프록시 활성화
@RequiredArgsConstructor
public class AppConfig implements WebMvcConfigurer {

	private final LoginInterceptor loginInterceptor;
	
    @Bean
    public LoggingAOP myAspect() {
        return new LoggingAOP();
    }
    
    @Override
	public void addInterceptors(InterceptorRegistry registry) {
	
		//메소드의 인자로 전달되는 InterceptorRegistry 객체를 이용해서 Interceptor 를 등록하면 된다. 
		registry.addInterceptor(loginInterceptor)
			.addPathPatterns("/mypage/**")
			.excludePathPatterns("/login");
	}
}