// 入口函数
$(function () {
  // 给两个a链接绑定事件
  //    注册账号的链接
  $("#link_reg").on("click", function () {
    // 只要点击了注册账号的链接 我们就要把登录盒子隐藏 注册盒子显示出来
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //登录链接
  $("#link_login").on("click", function () {
    $(".reg-box").hide();
    $(".login-box").show();
  });

  // 自定义layui的表单校验规则
  // 从layui中获取form对象
  //layui类似于jquery中的$ 都是全局对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过form.verify()函数来自定义校验规则
  form.verify({
    // 传入一个配置对象 对象中是配置校验的规则信息
    //自定义了一个叫pwd的校验规则  不符合校验规则会提示：密码必须6到12位，且不能出现空格
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    // 校验注册表单中两次密码是否一致的规则
    repwd: function (value) {
      // value就是用户输入确认密码的值
      //我们只要拿到第一次输入密码的值和确认密码的值value进行全等判断即可
      // 如果两次的密码值不匹配 通过return返回提示信息即可
      // 获取第一次密码的值
      //fuck:类选择器和属性选择器之间要用空格隔开!!!!!!!!!!!!!!!!!!!!!!.reg-box [name=password]
      var pwd = $(".reg-box [name=password]").val();
      //判断
      if (pwd !== value) {
        return "两次密码不一致！";
      }
    },
  });

  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (e) {
    //阻止事件的默认提交行为
    e.preventDefault();
    //发起post请求
    var data = {
      username: $("#form_reg [name=username]").val(),
      password: $("#form_reg [name=password]").val(),
    };
    $.post("/api/reguser", data, function (res) {
      //res存放着服务器接口响应回来的信息
      // 根据接口文档判断响应请求是否成功
      if (res.status !== 0) {
        //响应失败
        // return console.log(res.message);
        return layer.msg(res.message);
      }
      // console.log("注册成功!");
      layer.msg("注册成功");
      //当提示注册成功之后 自动将页面切换到登录表单
      //实现:获取登入的超链接,绑定点击事件
      $("#link_login").click();
    });
  });

  // 监听登录表单的提交事件
  $("#form_login").submit(function (e) {
    //先阻止表单的默认提交行为
    e.preventDefault();
    //发起Ajax的get请求
    $.ajax({
      url: "/api/login",
      method: "post",
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("登录成功!");
        // 登录成功之后的token字符串保存到localStorage中
        localStorage.setItem("token", res.token);
        // console.log(res.token);
        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODI1NSwidXNlcm5hbWUiOiJkZXNzb24iLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY1Mjg4NzMzMiwiZXhwIjoxNjUyOTIzMzMyfQ.PqumEOTBJ_F5LjQNd-7RdnVyt4SxMREuE0bvy1v48yQ
        // //登录成功之后跳转到后台主页 这里指定跳转的网页路径
        location.href = "/index.html";
      },
    });
  });
});
