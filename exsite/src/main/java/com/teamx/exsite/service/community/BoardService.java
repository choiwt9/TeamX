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
		
		int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());
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
