// 每次调用$.ajax和$.get/post时，都会先调用这个函数：ajaxPrefilter；在这个函数中通过回调函数中的参数option可以拿到我们给ajax提供的配置对象；
$.ajaxPrefilter(function (options) {
  //   options.url 获取到get/post的不带根路径的具体url

  //在发起真正的ajax请求之前，统一拼接请求的根路径
  options.url = "http://www.liulongbin.top:3007" + options.url;
  console.log(options.url);
});
