/* eslint-disable arrow-parens */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return, no-undef */
import crypto from 'crypto';

/**
 * 转换查询字符串
 * 这是第二行描述
 * @param  {String} search 查询字符串
 * @return {Object} 转换后的查询字符串对象
 * @author muzi
 * @version 1.0.0
 * @example
 * import { getSearchString } from '@helper';
 * getSearchString('?a=1&b=2'); // -> { a: '1', b: '2' }
 */
export const getSearchString = (search = window.location.search) => {
  // 取得查询字符串并去掉开头的问号
  const str = (search.length > 0 ? search.substring(1) : '');
  const args = {};// 保存数据的对象

  const items = str.length ? str.split('&') : [];// 取得每一项
  let item = null;
  let name = null;
  let value = null;
  for (let i = 0; i < items.length; i += 1) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);
    if (name.length) {
      args[name] = value;
    }
  }
  return args;
};

/**
 * 转换对象为查询字符串
 * @param  {Object} searchObj 对象格式参数
 * @return {String} 返回查询字符串
 */
export const setSearchString = function(searchObj) {
  let queryString = '';
  Object.keys(searchObj).map((key, i) => {
    if (i === 0) {
      queryString += `${key}=${searchObj[key]}`;
    } else {
      queryString += `&${key}=${searchObj[key]}`;
    }
  });

  return queryString;
};

/**
 * 获取 APP 语言
 */
export const getAppLanguage = () => {
  const { navigator: { userAgent } } = window;
  const SUPPORT_LANG = new Set(['zh_CN']);

  let language = '';

  if (userAgent.indexOf('lang=zh_CN') > -1) {
    language = 'zh_CN';
  } if (userAgent.indexOf('lang=zh_HK') > -1) {
    language = 'zh_HK';
  } if (userAgent.indexOf('lang=en_US') > -1) {
    language = 'en_US';
  }

  let _language = '';
  if (SUPPORT_LANG.has(language)) {
    _language = language;
  } else {
    _language = 'zh_CN';
  }

  return _language;
};

export const timeoutPromise = (ms = 20000, msg = '请求超时！') => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject({
      resultCode: '000003',
      resultMsg: msg,
    });
  }, ms);
});

export const aesEncrypt = (target) => {
  const cipher = crypto.createCipher('aes192', AUTH_KEY);
  let crypted = cipher.update(target, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

export const aesDecrypt = (encrypted) => {
  const decipher = crypto.createDecipher('aes192', AUTH_KEY);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

/**
 * 生成唯一码
 * @param  {Number} len  生成唯一码长度，默认 32
 * @return {String} uuid
 */
export const getUuid = (len = 32) => {
  /* eslint-disable no-multi-assign,no-bitwise */
  let radix = 16; // 16进制
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    for (i = 0; i < len; i += 1) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (i = 0; i < 36; i += 1) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('');
};

/**
 * 判断APP当前所属 OS 环境
 * @return {String} ios | android | undefined
 */
export const judgeAppOS = () => {
  const { userAgent } = window.navigator;
  const isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  const isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1;

  if (isIos) {
    return 'ios';
  }

  if (isAndroid) {
    return 'android';
  }

  return 'undefined';
};

/**
 * 根据支持版本，判断APP版本
 * @param  {Object|undefined} supportVersion { ios: '2.2.0', android: '2.3.0' }
 * @return {boolean} 返回布尔值，是否当前版本支持
 */
export const judgeAppVersion = (supportVersion) => {
  let state = true;

  const add = (_version) => _version.split('.').map(d => Number(d)).reduce((a, b) => a += b);

  if (supportVersion) {
    const os = judgeAppOS();
    const { version } = jssdk.getSystemInfo();

    switch (os) {
      case 'ios':
        state = add(version) >= add(supportVersion.ios);
        break;
      case 'android':
        state = add(version) >= add(supportVersion.android);
        break;
      default:
        break;
    }
  }

  return state;
};
