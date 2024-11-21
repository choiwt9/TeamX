package com.teamx.exsite.service.community;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.mapper.community.BoardMapper;
import com.teamx.exsite.model.vo.community.Board;
import com.teamx.exsite.model.vo.community.ChildrenReply;
import com.teamx.exsite.model.vo.community.ParentReply;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardService {

	private final BoardMapper mapper;
	
	public int insertBoard(Board board) {
		return mapper.insertBoard(board);
	}

	public int selectListCount() {
		return mapper.selectListCount();
	}

	public ArrayList<Board> selectList(PageInfo pi) {
		
		//offset: 데이터 조회의 시작 위치를 지정하는 값으로, 예를 들어 offset이 10이라면 10번째 레코드부터 데이터를 조회
		//limit: 조회할 최대 레코드 수를 지정하는 값으로, 예를 들어 limit이 10이라면 최대 10개의 레코드만 조회
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());
		// 예시) 
		// offset = (현재 페이지 - 1) * 페이지 당 게시글 수 = (2 - 1) * 15 = 15
		// limit = 15 (한 페이지에 표시할 게시글 수) => RowBounds에 매개변수로 15, 15를 전달하면 15번째 로우부터 15개 조회해서 반환해줌(레전드;;)
		// 이모든걸 마이바티스 rowBounds가 해준다 이말씀
		
		return mapper.selectList(pi, rowBounds);
	}
	
	public int increaseCount(int postNo) {
		return mapper.increaseCount(postNo);
	}
	
	public Board selectDetail(int postNo) {
		return mapper.selectDetail(postNo);
	}
	
	public int editBoard(Board board) {
		return mapper.editBoard(board);
	}
	
	public int deleteBoard(Board board) {
		return mapper.deleteBoard(board);
	}
	
	public int selectListCountByCategory(String postCategory) {
		return mapper.selectListCountByCategory(postCategory);
	}
	
	public ArrayList<Board> selectPostsByCategory(String postCategory, PageInfo pi) {
		
		// 페이징처리
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());
		
		return mapper.selectPostsByCategory(postCategory, pi, rowBounds);
	}
	
	
	
	public int insertParentReply(ParentReply parentReply) {
		return mapper.insertParentReply(parentReply);
	}

	public ArrayList<ParentReply> selectParentReply(int postNo) {
		return mapper.selectParentReply(postNo);
	}

	public int insertChildrenReply(ChildrenReply childrenReply) {
		return mapper.insertChildrenReply(childrenReply);
	}

	public ArrayList<ChildrenReply> selectChildrenReply(int parentReplyNo) {
		return mapper.selectChildrenReply(parentReplyNo);
	}

	public int deleteParentReply(ParentReply parentReply) {
		return mapper.deleteParentReply(parentReply);
	}

	public int deleteChildrenReply(ChildrenReply childrenReply) {
		return mapper.deleteChildrenReply(childrenReply);
	}

	public int editParentReply(ParentReply parentReply) {
		return mapper.editParentReply(parentReply);
	}

	public int editChildrenReply(ChildrenReply childrenReply) {
		return mapper.editChildrenReply(childrenReply);
	}

	public List<Board> selectPostList() {
		return mapper.selectPostList();
	}

	public int updateCategory(String category, int postNo) {
		return mapper.updateCategory(category, postNo);
	}

	public int deletePosts(List<Integer> postNos) {
		return mapper.deletePosts(postNos);
	}

	public int insertNotice(String postTitle, String postContent, int userNo) {
		return mapper.insertNotice(postTitle, postContent, userNo);
	}

	public List<Board> selectNotice() {
		return mapper.selectNotice();
	}

	public List<Board> searchPost(String keyword) {
		return mapper.searchPost(keyword);
	}


}
