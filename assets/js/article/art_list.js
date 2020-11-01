$(function () {
    //定义事件过滤器
    template.defaults.imports.dateFormate = function (dtStr) {
        var dt = new Date(dtStr)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义时间格式函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //定义提交到服务器的参数
    var q = {
        pagenum: 1, //  页码值
        pagesize: 3, //  每页显示多少条数据
        cate_id: '', //	文章分类的 Id
        state: '', //文章的状态，可选值有：已发布、草稿
    }
    initTable()
    var layer = layui.layer

    function initTable() {
        $.ajax({
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //渲染数据  模板引擎
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    //初始化分类选项
    var form = layui.form
    initCate()

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //渲染 分类选项框的内容
                var strHtml = template('tpl-cates', res)
                $('[name=cate_id]').html(strHtml)
                //有些时候，你的有些表单元素可能是动态插入的。这时 form 模块 的自动化渲染是会对其失效的
                //刷新select选择框渲染
                form.render('select')
            }
        })
    }
    //筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initTable()
    })

    //分页
    var laypage = layui.laypage;
    function renderPage(num) {
        // console.log(num);
        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox',    //注意，这里的 test1 是 ID，不用加 # 号
            count: num,           //数据总数，从服务端得到
            limit:q.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2, 3, 5, 10],
            //触发jump:分页初始化的时候 ,页码改变的时候
            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                //console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                //console.log(obj.limit); //得到每页显示的条数
                //首次不执行(页面初始化的时候不执行切换,只有点击切换页码的时候在执行内容改变)
                if(!first){
                    q.pagenum = obj.curr
                    q.pagesize = obj.limit
                    initTable()
                }
              }
        });
    }

    //删除
    $('tbody').on('click','#btn_delete' ,function () {
        var id = $(this).data('id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                url:'/my/article/delete/' + id,
                success : function (res) {
                    if(res.status !== 0) {
                        return layer.msg('删除文章失败')
                    } 
                    layer.msg('成功删除')
                    //小问题,在最后删除所有文章跳转到上一页不显示文章
                    //判断页面的删除按钮的个数对应就是文章的数量 (这里不能用id 因为id只有一个只能类选择器)
                    //当文章只有一个时候,且不在第一页就会将页码数-- 
                    if($('.btn_delete').length === 1 && q.pagenum > 1) {
                        q.pagenum--
                    }
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})