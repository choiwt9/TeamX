package com.teamx.exsite.controller.error;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class ExceptionViewController {
	
	@RequestMapping(value = "/makeError", method = RequestMethod.GET)
	public void makeError() throws Exception {
	    throw new NullPointerException(); // Internal Server Error
	}
	
	@RequestMapping(value = "/errorResolverTest", method = RequestMethod.GET)
	public void errorResolverTest() throws Exception {
	    throw new NoHandlerFoundException("GET", "/error404", new HttpHeaders()); // 에러처리할 url입력
	}
	
	@ExceptionHandler(NoHandlerFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String handle404(Exception e, Model model) {
		log.error("error404");
		return "common/errorPage";
	}
	
	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public String handleError(Exception e, Model model) {
		log.error("error500");
		return "common/errorPage";
	}

}
