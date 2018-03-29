<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>唯一时光only time</title>
</head>

<style>

</style>
<body>
${descrip}<br />
<#include "top/top.ftl">
<#--<img src="/images/big_20171125b.jpg" alt="some_text"><br/>-->
<#--<img src="/images/big_20171125b.jpg" alt="some_text">-->
<#include "nav/nav.ftl">
<div class="container">
<#include "container/container_left.ftl">
<#include "container/container_right.ftl">
    <video width="320" height="240" controls>
        <source src="/videos/WeChat_20171125131333.mp4" type="video/mp4">
        你的浏览器不支持 video 标签。
    </video>
</div>
<#include "connect/connect.ftl">
<#include "foot/foot.ftl">
</body>
</html>