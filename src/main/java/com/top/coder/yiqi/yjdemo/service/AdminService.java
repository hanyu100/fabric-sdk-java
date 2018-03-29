package com.top.coder.yiqi.yjdemo.service;

import com.top.coder.yiqi.yjdemo.dao.AdminDAO;
import com.top.coder.yiqi.yjdemo.model.SMS;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Author: hanyu
 * Create: 2018/3/6
 * mailto:hanyu100@foxmail.com
 */
@Service
public class AdminService {

    @Autowired
    AdminDAO adminDAO;
    public List<SMS> getSmsByPhone(String phone) {
        return adminDAO.getSMSByPhone(phone);
    }
}
