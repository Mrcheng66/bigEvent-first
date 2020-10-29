$(function () {
    var form = layui.form;
    form.verify({
        nickname :function (value) {
            if(value.length > 6) {
                return '昵称长度为1~6为之间'
            }
        }
    });

    //获取用户信息
    initUserInfo();
    var layer = layui.layer
    function initUserInfo() {
        //ajax
        $.ajax({
            url:'/my/userinfo',
            success : function (res) {
                if(res.status !== 0 ) {
                    return layer.msg(res.message)
                }
                //用户信息渲染到表单中
                // console.log(res.data.nickname);
                // 利用layui中的表单赋值方法快速赋值操作
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单
    $('#btnReset').on('click',function (e) {
        e.preventDefault();
        initUserInfo()
    })
    //修改用户信息
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data :$(this).serialize(),
            success : function (res) {
                if(res.status !== 0 ) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                console.log(window.parent);
                window.parent.getUserinfo()
            }
        })
    })
})