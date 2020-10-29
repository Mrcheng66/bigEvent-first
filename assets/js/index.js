//获取用户基本信息函数必须写在入口函数外面,后面还要调用,所有声明为全局函数
$(function() {
    //获取用户基本信息
    getUserinfo()
    //退出登录 功能
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        //框架提供的询问框
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //清空token
            localStorage.removeItem('token')
            //跳转页面
            location.href = '/login.html'
            layer.close(index);
          });
    })
})

function getUserinfo() {
    //发送ajax 请求
    $.ajax({
        url:'/my/userinfo',
        
        success:function (res) {
            // console.log(res);
            if(res.status !==0) {
                return layui.layer.msg('res.message')
            }
            renderAvatar(res.data)
        }
    })
}
//渲染用户头像
function renderAvatar(user) {
    //昵称在先,名字在后
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp;&nbsp;'+name);
    //用户头像
    if(user.user_pic) {
        //有头像
        $('.text-avatar').hide()
        $('.layui-nav-img').show().attr('src',user.user_pic)
    }else{
        //没有头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}