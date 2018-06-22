var Crypto = require('/cryptojs.js').Crypto;
var md5 = require('/netMD5.js')
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function downloadFile(url) {   
  try {
    var elemIF = document.createElement("iframe");
    elemIF.src = url;
    elemIF.style.display = "none";
    document.body.appendChild(elemIF);
  } catch (e) {

  }
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}
var gettime=time=>{
  var hour = Math.floor(time / 3600);
  var other = time % 3600;
  var minute = Math.floor(other / 60);
  var second = Math.floor(other % 60);
  return PrefixInteger(minute, 2) + ":" + PrefixInteger(second,2);
}
var getMD5Data=function(data){
  return Crypto.MD5(data, 'MD5').toUpperCase() ;
  // return md5.md5(data);2种用其一即可
}
var decryptData = function (encryptedData, iv) {
  this.appId = wx.getStorageSync("appid");
  this.sessionKey = wx.getStorageSync("sessionkey");
  // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  // debugger;
  var encryptedData = Crypto.util.base64ToBytes(encryptedData)
  var key = Crypto.util.base64ToBytes(this.sessionKey);
  var iv = Crypto.util.base64ToBytes(iv);

  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  // debugger;
  if(encryptedData=="")return ""
  try {
    // 解密
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
      asBpytes: true,
      iv: iv,
      mode: mode
    });

    var decryptResult = JSON.parse(bytes);

  } catch (err) {
    console.log(err)
  }
  if (typeof decryptResult.watermark =="undefined")return null
  if (decryptResult.watermark.appid !== this.appId) {
    console.log(err)
  }

  return decryptResult
}
//版本比较v1:当前版本,v2:最低版本 返回true当前功能不可用,返回false可用
var compareVersion=function(v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  var len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i])
    var num2 = parseInt(v2[i])

    if (num1 > num2) {
      return true
    } else if (num1 < num2) {
      return false
    }
  }

  return true;
}
var lasttime = Date.parse(new Date())
//防止按钮多次点击
var isfastclick=function(time){
  var curenttime = Date.parse(new Date());
  if (curenttime-lasttime<time){
      return true;
  }
  lasttime=curenttime;
  return false
}
// 开放接口
module.exports = {
  formatTime: formatTime,
  gettime:gettime,
  decryptData:decryptData,
  downloadFile: downloadFile,
  compareVersion:compareVersion,
  isfastclick: isfastclick,
  getMD5Data: getMD5Data,
}
// exports.formatTime=formatTime
