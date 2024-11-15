package com.teamx.exsite.service.community;

import java.util.ArrayList;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.mapper.community.BoardMapper;
import com.teamx.exsite.model.vo.community.Board;
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
	
	public int insertParentReply(ParentReply parentReply) {
		return mapper.insertParentReply(parentReply);
	}

}
