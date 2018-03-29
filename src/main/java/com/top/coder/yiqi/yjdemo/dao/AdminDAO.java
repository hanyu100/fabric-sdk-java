package com.top.coder.yiqi.yjdemo.dao;

import com.top.coder.yiqi.yjdemo.model.SMS;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Author: hanyu
 * Create: 2018/3/6
 * mailto:hanyu100@foxmail.com
 */
@Mapper
@Component(value = "AdminDAO")
public interface AdminDAO {
    @Select("select * from tb_sms_send_flow where mobile=#{phone} order by id desc")
    List<SMS> getSMSByPhone(@Param("phone") String phone);
}
