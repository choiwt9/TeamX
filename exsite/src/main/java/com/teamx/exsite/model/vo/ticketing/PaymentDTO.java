package com.teamx.exsite.model.vo.ticketing;

import lombok.Data;

@Data
public class PaymentDTO {
	private String applNum;	// 신용카드 승인번호
    private String bankName; // 은행 이름
    private String buyerAddr; // 구매자 주소
    private String buyerEmail; // 구매자 이메일
    private String buyerName; // 구매자 이름
    private String buyerPostcode; // 구매자 우편번호
    private String buyerTel; // 구매자 전화번호
    private String cardName; // 카드 이름
    private String cardNumber; // 카드 번호
    private int cardQuota; // 카드 할부 개월 수
    private String currency; // 통화 단위
    private String customData; // 사용자 정의 데이터
    private String impUid; // 아임포트 고유 ID
    private String merchantUid; // 상점 주문 번호
    private String name; // 상품 이름
    private int paidAmount; // 결제 금액
    private long paidAt; // 결제 시각 (타임스탬프)
    private String payMethod; // 결제 방법
    private String pgProvider; // PG사 제공자 이름
    private String pgTid; // PG사 거래 ID
    private String pgType; // PG 타입 (결제 유형)
    private String receiptUrl; // 영수증 URL
    private String status; // 결제 상태
    private boolean success; // 결제 성공 여부
    
    private int amount;	// 결제 요청 시 금액
    private int ticketCount;	// 티켓 수량
    private String place;	// 전시 고유 번호
}
