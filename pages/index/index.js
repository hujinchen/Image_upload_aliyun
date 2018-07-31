//index.js
//获取应用实例
const app = getApp()
var uploadImage = require('../../utils/uploadFile.js');
var util = require('../../utils/util.js');

Page({
   data: {
      
   },

   //选择照片
   choose:function(){
      wx.chooseImage({
         count: 9, // 默认最多一次选择9张图
         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            var nowTime = util.formatTime(new Date());

            //支持多图上传
            for (var i = 0; i < res.tempFilePaths.length; i++) {
               //显示消息提示框
               wx.showLoading({
                  title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
                  mask: true
               })

               //上传图片
               //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
               //图片路径可自行修改
               uploadImage(res.tempFilePaths[i], 'cbb/' + nowTime + '/',
                  function (result) {
                     console.log("======上传成功图片地址为：", result);
                     wx.hideLoading();
                  }, function (result) {
                     console.log("======上传失败======", result);
                     wx.hideLoading()
                  }
               )
            }
         }
      })
   }
})
