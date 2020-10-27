//开发环境服务器地址
baseUrl = 'http://ajax.frontend.itheima.net'
//测试环境服务器地址
// baseUrl = 'http://ajax.frontend.itheima.net'
//上线服务器地址
// baseUrl = 'http://ajax.frontend.itheima.net'
// .....................................................
// 在发送每个请求之前以及在$ .ajax（）处理它们之前，处理自定义Ajax选项或修改现有选项。
// 预过滤器,每次发起请求时,都会触发这个对象
$.ajaxPrefilter(function (options) {
    // console.log(options.url);
    options.url= baseUrl + options.url
    // console.log(options.url);
})