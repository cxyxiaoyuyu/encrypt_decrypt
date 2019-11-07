const crypto = require('crypto')

//生成AES加密的密钥
//var key = randomString(16);
//var key = 'zCpdywHdFfPYQwYi'
// var key = '¸ÁyËNÑìÛ½Ü}_«'
// console.log('加密用的key：     '+key+'\n')

var key_utf16 = 'b80cc179cb4ed1ecdbbddc7d5fab8005'
var key = Buffer.from(key_utf16,'hex')
console.log('加密前的key:   '+key)


let plainText = "{id:'123',name:'xiaoyu',address:'address:'上海市浦东新区'}"
console.log('加密前的textPlain：  '+plainText+'\n')

// AES加密
let textEnc = AESEncrypt(plainText,key)
console.log('加密后的textPlain：    '+textEnc+'\n')

// AES解密
let textDec = AESDecrypt(textEnc,key)
console.log('解密后的textPlain：    '+textDec)

// AES加密函数
function AESEncrypt(content,key){
  var iv = '1234567812345678'
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var encrypted = cipher.update(content,'utf8','binary');
  encrypted += cipher.final('binary');
  encrypted = Buffer.from(encrypted,'binary').toString('base64')
  return encrypted;
}

// AES解密函数
function AESDecrypt(content,key){
  var iv = "1234567812345678";
  content = Buffer.from(content,'base64').toString('binary')
  var cipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  var decrypted = cipher.update(content,'binary','utf8');
  decrypted += cipher.final('utf8');
  return decrypted;
}

//生成随机数
function randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var str = '';
　　for (i = 0; i < len; i++) {
　　　　str += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return str;
}



