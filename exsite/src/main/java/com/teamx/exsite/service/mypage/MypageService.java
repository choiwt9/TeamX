package com.teamx.exsite.service.mypage;

import java.util.List;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import com.teamx.exsite.common.model.vo.PageInfo;
import com.teamx.exsite.model.mapper.exhibition.ExhibitionMapper;
import com.teamx.exsite.model.mapper.review.ReviewMapper;
import com.teamx.exsite.model.mapper.ticketing.TicketingMapper;
import com.teamx.exsite.model.vo.exhibition.ExhibitionEvent;
import com.teamx.exsite.model.vo.ticketing.PaymentDTO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class MypageService {
	
	private final ExhibitionMapper exhibitionMapper;
	private final TicketingMapper ticketingMapper;
	private final ReviewMapper reviewMapper;

	public List<ExhibitionEvent> selectLikeList(int userNo) {
		return exhibitionMapper.selectLikeList(userNo);
	}

	public int selectTicketingListCount(int userNo, String ticketingDateRange) {
		log.info("ticketingDateRange {}", ticketingDateRange);
		return ticketingMapper.selectTicketingListCount(userNo, ticketingDateRange);
	}
	
	public List<PaymentDTO> selectTicketingList(int userNo, PageInfo pageInfo, String ticketingDateRange) {
	    //offset: 데이터 조회의 시작 위치를 지정하는 값으로, 예를 들어 offset이 10이라면 10번째 레코드부터 데이터를 조회
	      //limit: 조회할 최대 레코드 수를 지정하는 값으로, 예를 들어 limit이 10이라면 최대 10개의 레코드만 조회
		int offset = (pageInfo.getCurrentPage() - 1) * pageInfo.getBoardLimit();
		RowBounds rowBounds = new RowBounds(offset, pageInfo.getBoardLimit());
	      // 예시) 
	      // offset = (현재 페이지 - 1) * 페이지 당 게시글 수 = (2 - 1) * 15 = 15
	      // limit = 15 (한 페이지에 표시할 게시글 수) => RowBounds에 매개변수로 15, 15를 전달하면 15번째 로우부터 15개 조회해서 반환해줌(레전드;;)
	      // 이모든걸 마이바티스 rowBounds가 해준다 이말씀
		log.info("ticketingDateRange {}", ticketingDateRange);
		return ticketingMapper.selectTicketingList(userNo, ticketingDateRange, rowBounds);
	}

	public PaymentDTO selectTicketingInfo(String merchantUid) {
		return ticketingMapper.selectTicketingInfo(merchantUid);
	}

	public int selectMyPageReviewCount(int userNo) {
		return reviewMapper.selectMyPageReviewCount(userNo);
	}

}