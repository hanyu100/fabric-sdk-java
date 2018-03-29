<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>短信验证码</title>
</head>
<body>

<style type="text/css">
    .space { margin:10px;}
</style>

<form name="form1" method="post" action="./admin/getByPhone" id="form1">
    <div>

        <div class="space"></div>
        手机号 <input name="phone" type="phone" value="" id="phone" />
        <input type="submit" name="Button206" value="查短信验证码" id="Button206" title="输入手机号，模糊查最新100条短信码" />
        <div class="space"></div>
        <div>
        <#if (smsList)??>
            <#if (smsList?size > 0)>
                <#list smsList as sms>
                ${sms.name}　
                </#list>
            </#if>
        <#else>
        </#if>
        </div>
    </div>
</form>
</body>

</html>