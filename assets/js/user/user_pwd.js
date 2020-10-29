$(function () {
    var form = layui.form
    //密码格式校验
    form.verify({
        //确认密码格式
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        //新旧密码要求不能相同
        samePwd: function (value) {
            if(value === $('input[name=oldPwd]').val()) {
                return '新密码不能与原密码相同'
            }
        },
        rePwd : function (value) {
            if(value !== $('input[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    //修改密码 表单提交
    var layer = layui.layer
    $('.layui-form').on('submit',function (e) {
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data : $(this).serialize(),
            success:function (res) {
                if(res.status !== 0 ) {
                    return layer.msg(res.message)
                }
                layer.msg('修改密码成功')
                $('.layui-form')[0].reset();
            }
        })
    })
})