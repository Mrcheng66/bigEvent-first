$(function () {
     // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //选择文件功能
  $('#chooseImg').on('click',function () {
    $('#file').trigger('click')
  })

  //修改裁剪图片
  var layer = layui.layer
  $('#file').on('change',function (e) {
    // 拿到用户选择的文件  这里e.target可以换成this
    var file = e.target.files[0]
    //非空校验
    if(file === undefined) {
      return layer.msg('请选择上传的图片')
    }
    //根据用户选择的文件生成 url值
    var newImgUrl = URL.createObjectURL(file)
    //使用cropper插件
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgUrl)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })

  //提交图像并更新
  $('#btnUpload').on('click',function () {
    //获取base64 类型的头像(字符串)
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      // console.log(dataURL);

      //发送ajax请求
      $.ajax({
        url:'/my/update/avatar',
        data:{
          avatar:dataURL
        },
        type:'post',
        success: function (res) {
          if(res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('跟换头像成功')
          //更新父框架中的图像
          window.parent.getUserinfo()
        }
      })
  })
})