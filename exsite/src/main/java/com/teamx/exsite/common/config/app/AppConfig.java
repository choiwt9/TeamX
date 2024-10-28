package com.teamx.exsite.common.config.app;

import org.aspectj.lang.annotation.Aspect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.teamx.exsite.common.aspect.LoggingAOP;

@Configuration
@EnableAspectJAutoProxy  // AOP 프록시 활성화
public class AppConfig implements WebMvcConfigurer {

    // AOP Aspect 빈 등록
    @Bean
    public LoggingAOP myAspect() {
        return new LoggingAOP();
    }
}