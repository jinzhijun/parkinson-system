/* eslint-disable quotes */
import axios from 'axios';

// axios.post 本身就是个 Promise 对象，这里我们再用 Promise 封装一次，在本文件内对响应数据进行处理，对外只暴露请求成功时的有效数据
function encapsulatePromise(url, request) {

  var promise = new Promise(function(resolve, reject) {

    axios.post(url, request).then((response) => {
      if (response.data.code === 0) {
        resolve(response.data.data);
      } else {
        console.log('参数错误或服务器内部错误: ', response.data.msg);
        console.log('错误代码: ', response.data.code);
        reject(response.data.msg);
      }

    }).catch(function(error) {
      console.error('请求出错: ', error);
    });
  });

  return promise;
}

var baseUrl = 'http://apitest.gyenno.com';

export function getLoginInfo(accountNumber, pwd) {
  var request = {
    'accountNumber': accountNumber,
    'pwd': pwd
  };
  var url = baseUrl + '/usermgr/userSignIn';
  return encapsulatePromise(url, request);
};
