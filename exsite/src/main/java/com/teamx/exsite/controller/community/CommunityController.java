package com.teamx.exsite.controller.community;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.common.template.Pagination;
import com.teamx.exsite.model.dto.user.UserDTO;
import com.teamx.exsite.model.vo.community.Board;
import com.teamx.exsite.model.vo.community.ParentReply;
import com.teamx.exsite.service.community.BoardService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CommunityController {
	
	private final BoardService boardService;
	
	@Autowired
	public CommunityController(BoardService boardService) {
		this.boardService = boardService;
	}
	
	/********** 페이지 이동처리 ************/
	
	/**
	 * 글작성 페이지로 이동
	 * @return
	 */
	@GetMapping("/community/write")
	public String toCommunityWrite() {
		return "community/communityWrite"; // templates/community/communityWrite.html 파일을 반환
	}
	
	
	/**
	 * 글수정 페이지로 이동
	 * @return
	 */
	@GetMapping("/community/edit")
	public String toCommunityEdit() {
		return "community/communityEdit";
	}
	
	/********** 기능구현부 ************/
	
	/**
	 * 글목록 조회 페이지로 이동 및 리스트 불러오기
	 * @param currentPage: 현재페이지
	 * @param model: 게시글 리스트(boardList), 페이지네이션정보(pageInfo)
	 * @return
	 */
	@GetMapping("/community/list")
	public String communityList(@RequestParam(value="cpage", defaultValue="1")int currentPage, Model model) {

		// 전체 게시글 수 조회
		int listCount = boardService.selectListCount();
		
		// 페이지네이션 설정
		PageInfo pageInfo = Pagination.getPageInfo(listCount, currentPage, 10, 15);

		
		ArrayList<Board> boardList = boardService.selectList(pageInfo);
		for(Board b: boardList) {
			String dateOnly = b.getFormattedPostDatetime().substring(0, 10);
			b.setPostDate(dateOnly);
		}
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("pageInfo", pageInfo);
		
		return "community/communityList"; // templates/community/communityList.html 파일을 반환
	}
	
	/**
	 * 글작성 기능
	 * @param board: 게시글 정보 객체
	 * @return 통신 성공여부(게시글 정보 DB에 저장 성공여부)
	 */
	@ResponseBody
	@PostMapping("/community/board/write")
	public String communityWrite(@RequestBody Board board) {
		log.info("data : {}", board);
		
		int result = boardService.insertBoard(board);

		return result > 0 ? "ok" : "fail";
	}
	
	/**
	 * 전달된 이미지파일들을 서버에 저장한 뒤, 해당 파일들의 이름 목록을 반환
	 * @param imgList 이미지 파일 목록
	 * @return 이미지 파일명 목록
	 */
	@ResponseBody
	@PostMapping(value="/upload", produces="application/json;charset=UTF-8")
	public String uploadImage(List<MultipartFile> imgList) {
		log.info("img : {}", imgList);
		
		List<String> changeNameList = new ArrayList<>();
		
		for(MultipartFile file : imgList) {
			String changeName = saveFile(file);
			log.info("change name : {}", changeName);
			changeNameList.add(changeName);
		}
		
		return new Gson().toJson(changeNameList);
	}
	
	/**
	 * 서버에 파일 저장하는 메소드
	 * @param upfile 업로드할 파일
	 * @return 파일경로+파일명
	 */
	private String saveFile(MultipartFile upfile) {
		// 파일명을 변경하여 저장
		// 	변경 파일명 => yyyyMMddHHmmss + xxxxx(랜덤값) + .확장자
		
		// * 현재 날짜 시간 정보
		String currTime = new SimpleDateFormat("yyyMMddHHmmss").format(new Date());
		//	* 5자리 랜덤값 ( 10000 ~ 99999 )
		int random = (int)(Math.random()*(99999-10000+1))+10000;
		
		
		//기존이름가져오기
		String orgName = upfile.getOriginalFilename();		// "test.png" .의 위치: indexof // "test.2024.png" 확장자.의위치: lastindexof
		
		//* 확장자 (.txt, .java, .png, ... ) 가져오기
		String ext = orgName.substring( orgName.lastIndexOf(".") );
		
		// 저장할 네임
		String chgName = currTime + random + ext;
		
		// 업로드할 파일을 저장할 위치의 물리적인 경로 조회
		String uploadDir= "./uploads/";
		Path savePath =Paths.get(uploadDir + chgName);		// "./uploads/20241106101823421.jpg"

		try {
			Files.createDirectories(savePath.getParent());	// 상위 디렉토리가 없을 경우 생성
			Files.write(savePath, upfile.getBytes());		// 파일을 서버에 저장
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "/uploads/" + chgName;
	}
	
	/**
	 * 게시글 상세정보 조회 메소드
	 * @param postNo: 게시글 번호
	 * @param model: 게시글 상세정보
	 * @return
	 */
	@GetMapping("/community/post/{postNo}")
	public String communityDetail(@PathVariable("postNo")int postNo, Model model) {
		// 게시글 조회수 업데이트 함수 실행
		int result = boardService.increaseCount(postNo);
		
		if(result > 0) {
			// 게시글 조회수 증가 성공 시
			Board board = boardService.selectDetail(postNo);
			model.addAttribute("boardDetail", board);
			
			return "community/communityPost";
		} else {
			// 게시글 조회수 증가 실패 시
			return "common/";
		}
		
	}
	
	@ResponseBody
	@GetMapping("/community/parentReply")
	public String insertParentReply(HttpSession session, ParentReply parentReply) {
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			parentReply.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.insertParentReply(parentReply);
		
		return result > 0 ? "ok" : "failed";
	}
	
}
