
// 这里提供一些用来方便我们操作业务数据的函数

// 在数组中找到具有特定键值对 的 对象元素，并将其返回
function getElement(keyName, value, array) {
  if (!array || !(array instanceof Array)) {
    return {};
  }
  var target = array.filter((element) => {
    return element[keyName] === value;
  })[0];
  // 如果不存在符合条件的对象，则返回空对象
  return target ? target : {};
}

// 将完整的时间字符串（包含时分秒，时区等信息）简化为适合 element-ui 控件的 yyyy-MM-dd 的形式
function simplifyDate(dateStr) {
  // 如果参数本身就为空，那么直接返回 undefined
  if (!dateStr) {
    return undefined;
  }
  var dateObj = new Date(dateStr);
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var date = dateObj.getDate();
  date = date < 10 ? '0' + date : date;
  return year + '-' + month + '-' + date;
}

function simplifyTime(dateStr) {
  // 如果参数本身就为空，那么直接返回 undefined
  if (!dateStr) {
    return undefined;
  }
  var dateObj = new Date(dateStr);
  var year = dateObj.getFullYear();
  var month = dateObj.getMonth() + 1;
  month = month < 10 ? '0' + month : month;
  var date = dateObj.getDate();
  date = date < 10 ? '0' + date : date;
  var hour = dateObj.getHours();
  hour = hour < 10 ? '0' + hour : hour;
  var min = dateObj.getMinutes();
  min = min < 10 ? '0' + min : min;
  return year + '-' + month + '-' + date + ' ' + hour + ':' + min;
}

function calculateYearsBetween(fromDate, toDate) {
  // 计算参数日期到今天，所经历的完整的年数
  var formatDate = simplifyDate(fromDate);
  var dateList = formatDate.split('-');
  var year = Number(dateList[0]);
  var month = Number(dateList[1]);
  var date = Number(dateList[2]);

  var formatTodayDate = simplifyDate(toDate);
  var todayList = formatTodayDate.split('-');
  var currentYear = Number(todayList[0]);
  var currentMonth = Number(todayList[1]);
  var currentDate = Number(todayList[2]);

  /* if (date > currentDate) {
    month += 1;
  }
  if (month > currentMonth) {
    year += 1;
  } */
  if (currentMonth > month) {
    year -= 1;
  } else if (currentMonth === month && currentDate > date) {
    year -= 1;
  };
  return currentYear - year > 0 ? currentYear - year : 1;
}

function checkId(ID) {
  if (typeof ID !== 'string') {
    return '非法字符串';
  }
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  var birthday = ID.substr(6, 4) + '-' + Number(ID.substr(10, 2)) + '-' + Number(ID.substr(12, 2));
  var d = new Date(birthday);
  var newBirthday = d.getFullYear() + '-' + Number(d.getMonth() + 1) + '-' + Number(d.getDate());
  var currentTime = new Date().getTime();
  var time = d.getTime();
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = 0;
  var i;
  var residue;

  if (!/^\d{17}(\d|x)$/i.test(ID)) return '非法身份证';
  if (city[ID.substr(0, 2)] === undefined) return '非法地区';
  if (time >= currentTime || birthday !== newBirthday) return '非法生日';
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) return '非法身份证';

  return city[ID.substr(0, 2)] + ',' + birthday + ',' + (ID.substr(16, 1) % 2 ? '男' : '女');
}

// 检查 num 是否为正整数
function checkIfPositiveInteger(num) {
  var reg = /^[1-9][0-9]*$/;
  return reg.test(num);
}

// 检查 num 是否为非负整数
function checkIfNonNegativeInteger(num) {
  var reg = /^([1-9][0-9]*|0)$/;
  return reg.test(num);
}

// 检查 num 是否为非负实数（至多 n 位小数）
function checkIfNotMoreThanNDecimalNums(num, n) {
  n = checkIfPositiveInteger(n) ? n : 1;
  var reg = new RegExp('^[0-9]+(\.[0-9]{1,' + n + '})?$');
  return reg.test(num);
}

// 检查 num 是否为电话号码（由数字和短横线组成，且第一位是数字）
function checkIfValidPhoneNum(num) {
  var reg = /^[0-9][0-9-]*/;
  return reg.test(num);
}

// 检查 num 是否为纯数字 （首位可以是 0，第二个参数是最少的位数，第三个参数是最多的位数，如果没有该参数则不设限制）
function checkIfPureNum(num, minDigit, maxDigit) {
  minDigit = checkIfPositiveInteger(num) ? minDigit : 0;
  maxDigit = checkIfPositiveInteger(num) ? maxDigit : '';
  var reg = new RegExp('^\d{' + minDigit + ',' + maxDigit + '}$');
  return reg.test(num);
}

export default {
  getElement,
  simplifyDate,
  simplifyTime,
  calculateYearsBetween,
  checkId,
  checkIfPositiveInteger,
  checkIfNonNegativeInteger,
  checkIfNotMoreThanNDecimalNums,
  checkIfValidPhoneNum,
  checkIfPureNum
};
