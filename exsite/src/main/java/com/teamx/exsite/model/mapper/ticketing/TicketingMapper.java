package com.teamx.exsite.model.mapper.ticketing;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import com.teamx.exsite.model.vo.ticketing.PaymentDTO;

@Mapper
public interface TicketingMapper {
	
	int insertPaymentInfo(PaymentDTO cacheData);

	int insertTicketingInfo(String merchantUid, String visitDate, int ticketCount, String exhibitionNo, int userNo,
			String name, String buyerName, String buyerTel);

	PaymentDTO ticketingSuccessInfo(String merchantUid);

	int insertFreeTicketingInfo(PaymentDTO freeTicketingInfo);

	PaymentDTO freeTicketingSuccessInfo(String merchantUid);
	
	List<PaymentDTO> selectTicketingList(int userNo, String ticketingDateRange, RowBounds rowBounds);

	int selectTicketingListCount(int userNo, String ticketingDateRange);

	PaymentDTO selectTicketingInfo(String merchantUid);

	PaymentDTO findPaymentInfo(int userNo);

	List<PaymentDTO> findPaymentInfoList(int userNo, int exhibitionNo);
	
}
