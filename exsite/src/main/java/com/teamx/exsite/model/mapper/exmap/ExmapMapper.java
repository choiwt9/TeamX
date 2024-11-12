package com.teamx.exsite.model.mapper.exmap;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.teamx.exsite.model.vo.exmap.ExmapCoordinate;
import com.teamx.exsite.model.vo.exmap.ExmapExhibition;



@Mapper
public interface ExmapMapper {
	List<ExmapCoordinate> selectAllExmapCoordinates(String guname);
	List<String> selectDistinctGuname();
	ExmapExhibition findRecentExhibitionByCoordinates(String lat, String lot);
}
