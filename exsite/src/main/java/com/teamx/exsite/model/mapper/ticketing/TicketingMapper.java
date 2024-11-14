package com.teamx.exsite.model.mapper.ticketing;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.vo.ticketing.PaymentDTO;

@Mapper
public interface TicketingMapper {
	
	int insertPaymentInfo(PaymentDTO cacheData);

	int insertTicketingInfo(String merchantUid, String visitDate, int ticketCount, String exhibitionNo, int userNo,
			String name, String buyerName, String buyerTel);

	PaymentDTO ticketingSuccessInfo(String merchantUid);
	
}
