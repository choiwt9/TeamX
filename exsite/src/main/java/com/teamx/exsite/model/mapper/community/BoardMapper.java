package com.teamx.exsite.model.mapper.community;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.vo.community.Board;
import com.teamx.exsite.model.vo.community.ChildrenReply;
import com.teamx.exsite.model.vo.community.ParentReply;

@Mapper
public interface BoardMapper {
	
	int insertBoard(Board board);

	int selectListCount();

	ArrayList<Board> selectList(PageInfo pageInfo, RowBounds rowBounds);
	
	int increaseCount(int postNo);
	
	Board selectDetail(int postNo);

	int editBoard(Board board);
	
	int deleteBoard(Board board);

	int selectListCountByCategory(String postCategory);

	ArrayList<Board> selectPostsByCategory(String postCategory, PageInfo pageInfo, RowBounds rowBounds);

	
	int insertParentReply(ParentReply parentReply);

	ArrayList<ParentReply> selectParentReply(int postNo);

	int insertChildrenReply(ChildrenReply childrenReply);

	ArrayList<ChildrenReply> selectChildrenReply(int parentReplyNo);

	int deleteParentReply(ParentReply parentReply);

	int deleteChildrenReply(ChildrenReply childrenReply);

	int editParentReply(ParentReply parentReply);

	int editChildrenReply(ChildrenReply childrenReply);

	List<Board> selectPostList();

	int updateCategory(String category, int postNo);

	int deletePosts(List<Integer> postNos);

	int insertNotice(String postTitle, String postContent, int userNo);

	List<Board> selectNotice();

	List<Board> searchPost(String keyword);

}
