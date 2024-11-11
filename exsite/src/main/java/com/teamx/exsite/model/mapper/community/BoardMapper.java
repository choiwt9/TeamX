package com.teamx.exsite.model.mapper.community;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.vo.community.Board;
import com.teamx.exsite.model.vo.community.ParentReply;

@Mapper
public interface BoardMapper {
	
	int insertBoard(Board board);

	int selectListCount();

	ArrayList<Board> selectList(PageInfo pageInfo, RowBounds rowBounds);
	
	int increaseCount(int postNo);
	
	Board selectDetail(int postNo);

	int insertParentReply(ParentReply parentReply);

}
