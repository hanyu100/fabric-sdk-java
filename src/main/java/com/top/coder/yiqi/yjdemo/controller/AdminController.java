package com.top.coder.yiqi.yjdemo.controller;

import com.top.coder.yiqi.yjdemo.model.SMS;
import com.top.coder.yiqi.yjdemo.service.AdminService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

/**
 * Author: hanyu
 * Create: 2018/3/6
 * mailto:hanyu100@foxmail.com
 */
@Controller
public class AdminController {
    private static Logger logger = LoggerFactory.getLogger(AdminController.class);

    @Autowired
    AdminService adminService;

    @RequestMapping(value = "/admin")
    public String getSMS(){
        return "demo";
    }

    @RequestMapping(value = "/admin/getByPhone")
    public String getSMS(Map<String, Object> map,String phone){
        List<SMS> smsList = adminService.getSmsByPhone(phone);
        map.put("smsList", smsList);
        return "demo";
    }
}
