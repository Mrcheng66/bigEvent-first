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
    //添加请求路径
    // console.log(options.url);
    options.url= baseUrl + options.url
    // console.log(options.url);

    //对需要权限的接口配置头信息  给指定地址添加身份认证
    // 必须要以my开头
    if(options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //登录拦截
    options.complete = function (res) {
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if(obj.status === 1 && obj.message === '身份认证失败！'){
            //清空token
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'
        }
    }
})