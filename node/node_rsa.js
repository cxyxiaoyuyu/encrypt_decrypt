const crypto = require('crypto')

var privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgG+u7KERg6DWKDhK7NRUe63FPpxbzBAUWxULzjYCJexsvgzXjj/m
UPvTR/wjFXf49sidHDcEwhzx18k8aJ0+Rt5AUtNExTeAIIGo/mytyQwlS0GuazdW
Sqw+1IOEJe88f/I62prFuuVuY+cIxucXDVpxwv5mfkMjeiTIixWyju4tAgMBAAEC
gYABkOtiitNUswwXVf2iMJkXY7ewC5198DsivWqj2T3c5d14YqFtBfbGwTy2LWvE
peoYABQANYHfVAjZmo5A/jmSKWHaCHd+k8sMQeThdklGVGHBctZ46aJ32c4CRmZa
pHAtgYVYBxOyn/55WlJb9cYEYGE1M9ouOmsEwW/sUruyZQJBANmmXVhte5LNCrmr
c7GFbJQLNT4YTcGPXHyRdxjGBRfcgAK0IHREUrBGjCY+N4DYd3QxRYTAF+EYileF
ou3C1bcCQQCDXKz9d3pibVtfi/qcO6bn3Bdqfv641sEO5++dD/SCAeUSTrd8KO/e
ZoVIkYV8lcj5Ol6cRhXr9TGTGHUXzbs7AkACvxmwcvk7OgEnpKU6GT/sglOyq+XX
SnLVU5SYKG+KBItM/W7naLFObiV4mhJjOtgPDEwfR7lFauTcA+CxdWLzAkBaOEVr
lCqO/VKbTdVihim85tGCSBSEOKLBrRRJyBKDU+/TYhLtCGSuV7VEwQVwKqOsYKVo
KU6XD4Dr6QlKvvbPAkEAkjlU5ua5BfGh601U8va1xWyxh0TqemBTsyoQ8bSwOpZH
NgGjWqv5Z0QoK99pJv7VfReKbLyIg2MXhpigTogeWA==
-----END RSA PRIVATE KEY-----`

var publicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgG+u7KERg6DWKDhK7NRUe63FPpxb
zBAUWxULzjYCJexsvgzXjj/mUPvTR/wjFXf49sidHDcEwhzx18k8aJ0+Rt5AUtNE
xTeAIIGo/mytyQwlS0GuazdWSqw+1IOEJe88f/I62prFuuVuY+cIxucXDVpxwv5m
fkMjeiTIixWyju4tAgMBAAE=
-----END PUBLIC KEY-----`;

// 生成需要加密的随机数 key
// var keyGenerator = randomString(16)


// var keyGenerator = '¸ÁyËNÑìÛ½Ü}_«'
// console.log('加密前的key:   '+keyGenerator)
// var key = Buffer.from(keyGenerator)   // 转成Buffer
// console.log('加密前的key为：     '+key+'\n')

var key_utf16 = 'b80cc179cb4ed1ecdbbddc7d5fab8005'
var key = Buffer.from(key_utf16,'hex')
console.log('加密前的key:   '+key)

// 对key进行加密
var keyEnc = publicEncrypt(key)
console.log("加密后的结果为：    "+keyEnc+'\n')

// 对key进行解密
var keyDec = privateDecrypt(keyEnc)
console.log('解密后的结果为：    '+keyDec+'\n',keyDec)



// RSA公钥加密函数
function publicEncrypt(key){
    var keyEnc = crypto.publicEncrypt({key:publicKey,padding:crypto.constants.RSA_PKCS1_PADDING}, key);
    return keyEnc.toString('hex');
}

// RSA私钥解密函数
function privateDecrypt(keyEnc){
    var keyDec = crypto.privateDecrypt(
        {
          key:privateKey,
          padding:crypto.constants.RSA_PKCS1_PADDING
        },
        // `keyEnc`是16进制第二个参数就是`hex` `keyEnc`是Base64第二个参数就是`base64`
        Buffer.from(keyEnc,'hex')
    )
    return keyDec
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
