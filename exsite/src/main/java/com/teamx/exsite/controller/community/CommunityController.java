package com.teamx.exsite.controller.community;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.teamx.exsite.model.vo.community.ChildrenReply;
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
		return "community/communityWrite";
	}
	
	
	/********** 게시글 관련 기능구현부 ************/
	
	/**
	 * 글목록 조회 페이지로 이동 및 리스트 불러오기(READ)
	 * @param currentPage: 현재페이지
	 * @param model: 게시글 리스트(boardList), 페이지네이션정보(pageInfo)
	 * @return
	 */
	@GetMapping("/community/list")
	public String getPostList(@RequestParam(value="cpage", defaultValue="1")int currentPage, Model model) {

		// 전체 게시글 수 조회
		int listCount = boardService.selectListCount();
		
		// 페이지네이션 설정(전체게시글수, 현재페이지번호, 페이징바 최대페이지갯수, 페이지별게시글갯수)
		PageInfo pageInfo = Pagination.getPageInfo(listCount, currentPage, 10, 15);

		
		ArrayList<Board> boardList = boardService.selectList(pageInfo);
		
		// 각각 보드객체들의 postDate를 dateOnly로 변환
		for(Board b: boardList) {
			String dateOnly = b.getFormattedPostDatetime().substring(0, 10);
			b.setPostDate(dateOnly);
		}
		
		model.addAttribute("boardList", boardList);
		model.addAttribute("pageInfo", pageInfo);
		
		return "community/communityList"; // templates/community/communityList.html 파일을 반환
	}
	
	/**
	 * 글작성 기능(CREATE)
	 * @param board: 게시글 정보 객체
	 * @return 통신 성공여부(게시글 정보 DB에 저장 성공여부)
	 */
	@ResponseBody
	@PostMapping("/community/board/write")
	public String postWrite(@RequestBody Board board, HttpSession session) {
		log.info("data : {}", board);
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			board.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.insertBoard(board);

		return result > 0 ? "ok" : "fail";
	}
	
	/**
	 * 게시글 상세정보 조회 메소드(READ)
	 * @param postNo: 게시글 번호
	 * @param model: 게시글 상세정보
	 * @return
	 */
	@GetMapping("/community/post/{postNo}")
	public String postDetail(@PathVariable("postNo")int postNo, Model model) {
		// 게시글 조회수 업데이트 함수 실행
		int result = boardService.increaseCount(postNo);
		
		if(result > 0) {
			// 게시글 조회수 증가 성공 시
			Board board = boardService.selectDetail(postNo);
			model.addAttribute("boardDetail", board);
			
			return "community/communityPost";
		} else {
			// 게시글 조회수 증가 실패 시
			return "common/오류페이지주소";
		}
		
	}
	
	/**
	 * 게시글 수정페이지 조회 메소드(READ)
	 * @param postNo
	 * @param model
	 * @return
	 */
	@GetMapping("/community/edit/{postNo}")
	public String toEditPost(@PathVariable int postNo, Model model) {
	    // 기존 게시글 정보를 조회
	    Board board = boardService.selectDetail(postNo);

	    model.addAttribute("boardDetail", board);
	    
	    return "community/communityEdit";
	}

	/**
	 * 게시글 수정 메소드(UPDATE)	
	 * @param board
	 * @return 데이터 업데이트 성공 여부
	 */
	@ResponseBody
	@PostMapping("/community/board/edit")
	public String postEdit(@RequestBody Board board, HttpSession session) {
		log.info("data : {}", board);
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			board.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.editBoard(board);

		return result > 0 ? "ok" : "fail";
	}

	/** 게시글 삭제 메소드(DELETE)
	 * 실제론 지워지지는 않고 상태값만 'Y'로 변경
	 * @param board
	 * @return 상태값 업데이트 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/board/delete")
	public String postDelete(@RequestBody Board board) {
		log.info("data : {}", board);
		
		int result = boardService.deleteBoard(board);

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

	/******* 게시글 목록 정렬 관련 메소드 ********/
	
	/**
	 * 전달받은 카테고리에 따라 게시글을 조회하는 메소드
	 * @param postCategory
	 * @param currentPage
	 * @param model
	 * @return
	 */
	@ResponseBody
	@GetMapping("/community/category")
	public Map<String, Object> getPostsByCategory(@RequestParam("postCategory") String postCategory, 
	                                              @RequestParam(value="cpage", defaultValue="1") int currentPage) {

	    // 선택된 카테고리의 게시글 수 조회
	    int listCount = boardService.selectListCountByCategory(postCategory);

	    // 페이지네이션 설정
	    PageInfo pageInfo = Pagination.getPageInfo(listCount, currentPage, 10, 15);

	    // 카테고리에 맞는 게시물 목록을 가져오는 서비스 호출
	    ArrayList<Board> boardListByCategory = boardService.selectPostsByCategory(postCategory, pageInfo);

	    // 각각의 보드 객체들의 postDate를 dateOnly로 변환
	    for (Board b : boardListByCategory) {
	        String dateOnly = b.getFormattedPostDatetime().substring(0, 10);
	        b.setPostDate(dateOnly);
	    }

	    // 결과를 Map 형태로 반환하여 JSON 응답으로 페이지네이션 정보와 함께 전달
	    Map<String, Object> result = new HashMap<>();
	    result.put("boardList", boardListByCategory);
	    result.put("pageInfo", pageInfo);
	    
	    return result;
	}
	
	/**
	 * 카테고리 - 전체 목록 조회 메소드
	 * @param postCategory
	 * @param currentPage
	 * @return 보드객체 리스트와 페이지정보를 담은 맵 객체
	 */
	@ResponseBody
	@GetMapping("/community/all/category")
	public Map<String, Object> getPostsByAllCategory(@RequestParam("postCategory") String postCategory, @RequestParam(value="cpage", defaultValue="1") int currentPage) {

	    // 전체 게시글 수 조회
	    int listCount = boardService.selectListCount();
	    
	    // 페이지네이션 설정
	    PageInfo pageInfo = Pagination.getPageInfo(listCount, currentPage, 10, 15);

	    ArrayList<Board> boardList = boardService.selectList(pageInfo);
	    
	    // 각각의 보드 객체들의 postDate를 dateOnly로 변환
	    for (Board b : boardList) {
	        String dateOnly = b.getFormattedPostDatetime().substring(0, 10);
	        b.setPostDate(dateOnly);
	    }

	    // 결과를 Map 형태로 저장하여 반환
	    Map<String, Object> result = new HashMap<>();
	    result.put("boardList", boardList);
	    result.put("pageInfo", pageInfo);
	    
	    return result;
	}
	
	/******* 댓글 관련 메소드 ********/
	/**
	 * 부모댓글 조회 메소드
	 * @param postNo 게시글 식별번호
	 * @return 부모댓글 리스트
	 */
	@ResponseBody
	@GetMapping("/community/parent/reply/select/{postNo}")
	public List<ParentReply> selectParentReply(@PathVariable("postNo")int postNo) {
		ArrayList<ParentReply> parentReplyList = boardService.selectParentReply(postNo);
		
		return parentReplyList;
	}
	
	/**
	 * 부모댓글 입력 메소드
	 * @param session
	 * @param parentReply 부모댓글 객체
	 * @return 입력 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/parent/reply/insert")
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
	
	/**
	 * 자식댓글 조회 메소드
	 * @param parentReplyNo 부모댓글 식별번호 
	 * @return 자식댓글 리스트 객체
	 */
	@GetMapping("/community/children/reply/select/{parentReplyNo}")
	@ResponseBody
	public List<ChildrenReply> getChildrenReply(@PathVariable("parentReplyNo")int parentReplyNo) {
	    
		ArrayList<ChildrenReply> childrenReplyList = boardService.selectChildrenReply(parentReplyNo);
		
		return childrenReplyList;
	}
	
	/**
	 * 자식댓글 입력 메소드
	 * @param session
	 * @param childrenReply 자식댓글 객체
	 * @return 입력 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/children/reply/insert")
	public String insertChildrenReply(HttpSession session, ChildrenReply childrenReply) {
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			childrenReply.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.insertChildrenReply(childrenReply);
		
		return result > 0 ? "ok" : "failed";
	}
	
	/**
	 * 부모댓글 삭제 메소드
	 * 실제로는 삭제되지않고 STATUS만 'Y'로 변경됨
	 * @param parentReply 부모댓글 객체
	 * @return 삭제 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/parent/reply/delete")
	public String deleteParentReply(@RequestBody ParentReply parentReply, HttpSession session) {
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			parentReply.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.deleteParentReply(parentReply);

		return result > 0 ? "ok" : "fail";
	}
	
	/**
	 * 자식댓글 삭제 메소드
	 * 실제로는 삭제되지않고 STATUS만 'Y'로 변경됨
	 * @param childrenReply 자식댓글 객체
	 * @return 삭제 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/children/reply/delete")
	public String deleteChildrenReply(@RequestBody ChildrenReply childrenReply, HttpSession session) {
		
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			childrenReply.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.deleteChildrenReply(childrenReply);

		return result > 0 ? "ok" : "fail";
	}
	
	/**
	 * 부모댓글 수정 메소드
	 * @param parentReply 부모댓글 식별용 부모댓글객체
	 * @param session 유저 식별번호 검증용 세션객체
	 * @return 수정 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/parent/reply/edit")
	public String editParentReply(ParentReply parentReply, HttpSession session) {
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			parentReply.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.editParentReply(parentReply);

		return result > 0 ? "ok" : "fail";
	}
	
	/**
	 * 자식댓글 수정 메소드
	 * @param childrenReply 자식댓글 식별용 부모댓글객체
	 * @param session 유저 식별번호 검증용 세션객체
	 * @return 수정 성공여부
	 */
	@ResponseBody
	@PostMapping("/community/children/reply/edit")
	public String editChildrenReply(ChildrenReply childrenReply, HttpSession session) {
		UserDTO loginUser = (UserDTO) session.getAttribute("loginUser");
		
		if(loginUser != null) {
			childrenReply.setUserNo(loginUser.getUserNo());
		} else {
			return "로그인해주세요.";
		}
		
		int result = boardService.editChildrenReply(childrenReply);

		return result > 0 ? "ok" : "fail";
	}
}
