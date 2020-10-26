$(function () {
    //登录注册页面切换
    $('#link_reg').on('click',function () {
        $('.loginBox').hide()
        $('.regBox').show()
    })
    $('#link_login').on('click',function () {
        
        $('.loginBox').show()
        $('.regBox').hide()
    })

    //自定义表单校验规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //   获取第二次输入的值 layui中定义的
          repwd: function (value) {
              var pwd = $('.regBox input[name=password]').val()
            if(value !== pwd) {
                return '两次输入密码不一致,请重新输入'
            }
            }
    })

    //注册页面的ajax请求
    $('#form_reg').on('submit',function (e) {
        e.preventDefault()
        var data = $(this).serialize()
        $.ajax({
            type:'post',
            url:'http://ajax.frontend.itheima.net/api/reguser',
            data:data,
            success:function (res) {
                console.log(res);
                if(res.status !== 0 ) {
                    return res.message
                }
            }
        })
    })
})