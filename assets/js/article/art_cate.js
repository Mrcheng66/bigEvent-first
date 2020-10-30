$(function () {
    var layer = layui.layer
    var form = layui.form
    initCateList()
    function initCateList() {
        $.ajax({
            type:"get",
            url:'/my/article/cates',
            success: function (res) {
              var str = template('tpl_cate', res)
                // console.log(res);
                $('tbody').html(str)
            }
        })
       
    }
    
    $('#btnAdd').on('click',function () {
      indexAdd = layer.open({
            type:'1',
            title: '添加文章分类',
            content: $('#log_add').html(),
            area:['500px','260px']
          }); 
    })
    var indexAdd;
    //提交文章分类委托
    $('body').on('submit','#add_form',function (e) {
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success: function (res) {
                if(res.status !== 0 ) {
                    return layer.msg(res.message)
                }
                layer.msg('文章分类添加成功')
                //更新数据
                initCateList()
                //关闭弹出窗口
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit
    $('tbody').on('click','#btn_edit' ,function () {
        indexEdit = layer.open({
            type:'1',
            title: '添加文章分类',
            content: $('#log_edit').html(),
            area:['500px','260px']
          }); 
        //获取id,发送请求,渲染表单数据
        var id = $(this).data('id')
        // console.log(id);
        $.ajax({
            url:'/my/article/cates/' + id,
            success: function (res) {
                // console.log(res);
                if(res.status !== 0 ) {
                    return
                }
                form.val('form-edit',res.data)
            }
        })
    })

    //提交编辑的表单信息
    $('body').on('submit','#edit_form',function (e) {
        e.preventDefault()
        $.ajax({
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            method:'post',
            success: function (res) {
                if(res.status !== 0 ) {
                    return layer.msg(res.message)
                }
                layer.msg('文章编辑成功')
                //更新数据
                initCateList()
                //关闭弹出窗口
                layer.close(indexEdit)
            }
        })
    })

    //删除功能
    $('tbody').on('click','#btn_delete' ,function () {
         
        //获取id,发送请求
        var id = $(this).attr('data-id')
        // console.log(id);
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:'/my/article/deletecate/' + id,
                success: function (res) {
                    // console.log(res);
                    if(res.status !== 0 ) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    layer.close(index);
                    initCateList()
                }
            })
          });
       
    })


})