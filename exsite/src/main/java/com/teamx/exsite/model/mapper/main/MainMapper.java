package com.teamx.exsite.model.mapper.main;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.exhibition.vo.ExhibitionEvent;

@Mapper
public interface MainMapper {

	List<ExhibitionEvent> getAllExhibitionsEvents();

	List<ExhibitionEvent> getTop10ExhibitionsEvents();

}
