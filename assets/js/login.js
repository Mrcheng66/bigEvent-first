$(function () {
    //登录注册页面切换
    $('#link_reg').on('click', function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#link_login').on('click', function () {
        $('.loginBox').show()
        $('.regBox').hide()
    })

    //自定义表单校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        //   获取第二次输入的值 layui中定义的
        repwd: function (value) {
            var pwd = $('.regBox input[name=password]').val()
            if (value !== pwd) {
                return '两次输入密码不一致,请重新输入'
            }
        }
    })

    //注册页面的ajax请求
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    // return res.message
                    layer.msg(res.message)
                }
                layer.msg('注册成功,请登录')
                $('#link_login').trigger('click')
                $('#form_reg')[0].reset();
            }
        })
    })

    //登录
    $('#form_login').on('submit',function (e) {
        e.preventDefault()
        //发送登录请求
        $.ajax({
            type:'post',
            url:'/api/login',
            data:$(this).serialize(),
            success:function (res) {
                console.log(res);
                if(res.status !==0) {
                  return  layer.msg(res.message)
                }
                layer.msg('登录成功')
                //保存访问内部网页的token属性(权限)
                localStorage.setItem('token',res.token)
                // 跳转到主页
                location.href='/index.html'
            }
        })
    })
})