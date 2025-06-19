import { useRuntimeConfig } from 'nuxt/app'

// API基础URL
// console.log('当前环境:', process.env.NODE_ENV);

// const baseUrl = process.env.NODE_ENV === 'development'
//   ? '/nuxtRequest'
//   : 'https://art.hailuo2.com';

const baseUrl = 'https://art.hailuo2.com';

// console.log('当前baseUrl:', baseUrl);
// API接口URL列表
export const urlList = {
  setUserInfo: baseUrl + '/api/user/auth',        // 设置用户信息
  getCurrentUser: baseUrl + '/api/user/info',   // 获取当前用户信息
  createTasksImgVideo: baseUrl + '/api/task/volcengine/img2video',     // 创建任务-图生视频
  createTasksTextVideo: baseUrl + '/api/task/volcengine/text2video',     // 创建任务-文生视频
  getSubPlans: baseUrl + '/api/website/priceList',     // 获取套餐信息
  payOrder: baseUrl + '/api/pay/stripe',  // 支付
  opusList: baseUrl + '/api/user/opus_list', // 获取用户作品列表
  checkTask: baseUrl + '/api/task/volcengine/check_task_status', // 检查任务
  friendLinkList: baseUrl + '/api/cms/friendLinkList', // 获取友情链接列表
  getScore: baseUrl + '/api/volcengine/score', // 获取积分
  getUserOpus: baseUrl + '/api/volcengine/show', // 查询用户作品展示列表
  getShareInfo: baseUrl + '/api/volcengine/get_share_info', // 获取用户作品展示详情
  upload: baseUrl + '/api/common/upload', // 上传图片获取url
  getTimesLog: baseUrl + '/api/user/times_log', // 获取使用次数日志、消费记录
}

/**
 * 设置用户信息
 * @param data 用户信息数据
 * @returns 用户信息响应
 */
export const setUserInfo = async (data: any) => {
  try {
    // 如果已有有效Token，直接返回缓存的用户信息
    const token = getValidToken();
    if (token) {
      const expireAtStr = getCookie(TOKEN_EXPIRY_COOKIE_NAME);
      const expireAt = expireAtStr ? parseInt(expireAtStr, 10) : undefined;
      
      return { 
        code: 0, 
        msg: '成功', 
        data: { 
          access_token: token,
          expire_at: expireAt
        } 
      };
    }

    const response = await apiRequest<UserInfoResponse>(urlList.setUserInfo, 'POST', data, false);
    
    // 检查响应
    if (!response || !response.data) {
      throw new Error('响应数据无效');
    }
    
    // 保存访问令牌和过期时间
    if (response.data?.access_token) {
      setAccessToken(
        response.data.access_token,
        response.data.expire_at
      );
    } else {
      console.error('响应中没有access_token:', response);
    }
    
    return response;
  } catch (error: any) {
    console.error('设置用户信息失败:', error);
    throw error;
  }
}

/**
 * 获取当前用户信息
 * @returns 用户信息
 */
export const getCurrentUser = async () => {
  return apiRequest(urlList.getCurrentUser, 'GET', undefined, true);
}

/**
 * 创建任务-图生视频
 * @param prompt - 描述-必填
 * @param image_file - 图片文件-必填
 * @param resolution - 分辨率-必填
 * @param ratio - 比例-必填
 * @param duration - 时长-必填
 * @param is_show - 是否显示-必填
 * @returns {Object} - 返回任务结果
 */
export const createTaskImgVideo = async (data: any) => {
  try {
    return await apiRequest(urlList.createTasksImgVideo, 'POST', data, true);
  } catch (error) {
    console.error('创建任务失败:', error);
    throw error;
  }
}
/**
 * 创建任务-文生视频
 * @param prompt - 描述-必填
 * @param resolution - 分辨率-必填
 * @param ratio - 比例-必填
 * @param duration - 时长-必填
 * @param is_show - 是否显示-必填
 * @returns {Object} - 返回任务结果
 */
export const createTaskTextVideo = async (data: any) => {
  try {
    return await apiRequest(urlList.createTasksTextVideo, 'POST', data, true);
  } catch (error) {
    console.error('创建任务失败:', error);
    throw error;
  }
}

/**
 * 获取套餐信息
 * @returns 套餐列表
 */
export const getSubPlans = async () => {
  return apiRequest(urlList.getSubPlans, 'GET', undefined, false);
}

/**
 * 调起支付
 * @param data 支付数据
 * @returns 支付结果
 */
export const payOrder = async (data: any) => {
  return apiRequest(urlList.payOrder, 'POST', data,true);
}

/**
 * 查询用户制作的作品
 * @returns 用户作品列表
 */
export const getUserOpus = async () => {
  return apiRequest(urlList.getUserOpus, 'GET', undefined, false);
}

/**
 * 获取用户作品列表
 * @param data 用户作品列表数据
 * @param page 页码
 * @param page_size 每页数量
 * @returns 用户作品列表
 */
export const getOpusList = async (data: any) => {
  return apiRequest(urlList.opusList+`?page=${data.page}&page_size=${data.page_size}&status=${data.status}`, 'GET', undefined, true);
}

/**
 * 检查任务
 * @param task_id 任务id
 * @returns 任务结果
 */
export const checkTask = async (task_id:string) => {
  return apiRequest(urlList.checkTask+'?task_id='+task_id, 'GET', undefined, true);
}

/**
 * 获取友情链接列表
 * @returns 友情链接列表
 */
export const getFriendLinkList = async () => {
  return apiRequest(urlList.friendLinkList, 'GET', undefined, false);
}

/**
 * 获取积分
 * @returns 积分
 */
export const getScore = async () => {
  return apiRequest(urlList.getScore, 'GET', undefined, false);
}

/**
 * 获取用户作品展示详情
 * @returns 用户作品展示详情
 */
export const getShareInfo = async (task_id:string) => {
  return apiRequest(urlList.getShareInfo+'?task_id='+task_id, 'GET', undefined, false);
}

/**
 * 获取使用次数日志、消费记录
 * @returns 使用次数日志、消费记录
 */
export const getTimesLog = async (data:any) => {
  return apiRequest(urlList.getTimesLog+'?page='+data.page+'&page_size='+data.page_size, 'GET', undefined, true);
}
//////////////////////////////////////// 接口通用集成 //////////////////////////////////////////////
/**
 * API响应数据通用接口
 */
interface ApiResponse<T = any> {
  data: T;
  code: number;
  msg: string;
}

/**
 * 用户信息响应接口
 */
interface UserInfoResponse {
  access_token?: string;
  expire_at?: number;
  [key: string]: any;
}
// Cookie名称常量
const TOKEN_COOKIE_NAME = 'auth_token';
const TOKEN_EXPIRY_COOKIE_NAME = 'auth_token_expiry';

// Token Promise管理
let tokenPromise: Promise<void> | null = null;
let tokenResolve: ((value: void | PromiseLike<void>) => void) | null = null;

// 正在进行中的请求
let pendingUserInfoRequest: Promise<any> | null = null;

/**
 * 设置cookie
 * @param name cookie名
 * @param value cookie值
 * @param expDays 过期天数
 */
const setCookie = (name: string, value: string, expDays?: number) => {
  if (typeof document === 'undefined') return; // 服务端渲染时跳过
  
  let expires = '';
  if (expDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/; SameSite=Strict`;
};

/**
 * 获取cookie
 * @param name cookie名
 * @returns cookie值或null
 */
const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null; // 服务端渲染时跳过
  
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

/**
 * 删除cookie
 * @param name cookie名
 */
const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return; // 服务端渲染时跳过
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

/**
 * 初始化Token Promise
 */
const initTokenPromise = () => {
  if (!tokenPromise) {
    tokenPromise = new Promise((resolve) => {
      tokenResolve = resolve;
    });
  }
}

/**
 * 设置访问令牌
 * @param token 令牌字符串
 * @param expireAt 过期时间戳
 */
export const setAccessToken = (token: string, expireAt?: number) => {
  // 计算过期天数（从秒转为天）
  let expDays = 1; // 默认1天
  
  // 如果提供了expireAt，计算到期日期与当前日期差异的天数
  if (expireAt) {
    const now = Date.now();
    const expireTime = expireAt * 1000; // 转为毫秒
    expDays = (expireTime - now) / (24 * 60 * 60 * 1000);
    expDays = Math.max(0.01, expDays); // 确保至少有一些时间（10分钟左右）
    
    // 在cookie中也保存过期时间戳，用于后续验证
    setCookie(TOKEN_EXPIRY_COOKIE_NAME, expireAt.toString(), expDays);
  }
  
  // 设置token cookie
  setCookie(TOKEN_COOKIE_NAME, token, expDays);
  
  // 解决token Promise
  if (tokenResolve) {
    tokenResolve();
    tokenResolve = null;
    tokenPromise = null;
  }
}

/**
 * 获取有效的访问令牌
 * @returns 访问令牌
 */
const getValidToken = (): string | null => {
  const token = getCookie(TOKEN_COOKIE_NAME);
  const expireAtStr = getCookie(TOKEN_EXPIRY_COOKIE_NAME);
  
  if (!token) return null;
  
  // 如果有过期时间，检查是否过期
  if (expireAtStr) {
    const expireAt = parseInt(expireAtStr, 10);
    // 检查令牌是否过期（提前5分钟判断过期）
    if (expireAt * 1000 - 5 * 60 * 1000 < Date.now()) {
      // 清除过期token
      deleteCookie(TOKEN_COOKIE_NAME);
      deleteCookie(TOKEN_EXPIRY_COOKIE_NAME);
      return null;
    }
  }
  
  return token;
}

/**
 * 清除访问令牌
 */
export const clearAccessToken = () => {
  deleteCookie(TOKEN_COOKIE_NAME);
  deleteCookie(TOKEN_EXPIRY_COOKIE_NAME);
}

/**
 * 退出登录，清除所有与用户身份相关的数据
 */
export const logoutCookie = () => {
  // 清除访问令牌相关的cookie
  clearAccessToken();
  // 重置token Promise状态
  tokenPromise = null;
  tokenResolve = null;
  // 清除用户请求缓存
  pendingUserInfoRequest = null;
}

/**
 * 等待Token设置完成
 */
const waitForToken = async () => {
  const token = getValidToken();
  if (!token && !tokenPromise) {
    // 初始化token Promise
    initTokenPromise();
    await tokenPromise;
  }
}

/**
 * 处理FormData数据
 * @param data 数据对象
 * @returns FormData对象
 */
const createFormData = (data: Record<string, any>) => {
  const formData = new FormData();
  let obj:any={};
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value as string | Blob);
      obj[key as string]=value;
    }
  });
  return formData;
}

/**
 * 创建通用请求头
 * @returns 请求头对象
 */
const createHeaders = () => {
  const token = getValidToken();
  return {
    'x-appid': useRuntimeConfig().public.appid,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
}

/**
 * 上传图片获取url
 * @param data 上传图片数据
 * @returns 上传图片url
 */
export const upload = async (data: any) => {
  return apiRequest(urlList.upload, 'POST', data, true);
}
/**
 * 通用API请求函数
 * @param url 请求地址
 * @param method 请求方法
 * @param data 请求数据
 * @param needToken 是否需要等待Token
 * @returns 响应数据
 */
const apiRequest = async <T>(url: string, method: 'GET' | 'POST', data?: any, needToken: boolean = true): Promise<ApiResponse<T>> => {
  try {
    if (needToken) {
      await waitForToken();
    }
    
    const options: any = {
      method,
      headers: createHeaders()
    };
    
    if (data && method === 'POST') {
      options.body = createFormData(data);
    }
    
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      
      // 检查响应状态
      if (!responseData) {
        throw new Error('响应数据为空');
      }
      return responseData;
    } catch (fetchError: any) {
      console.error(`请求失败 ${method} ${url}:`, fetchError);
      
      // 提取详细的错误信息
      let errorMessage = '网络请求失败';
      let errorCode = -999;
      
      if (fetchError.response) {
        try {
          const errorData = await fetchError.response.json();
          console.error('错误响应详情:', errorData);
          errorMessage = errorData.msg || errorData.error || '服务器错误';
          errorCode = errorData.code || errorData.status || -1;
        } catch (e) {
          console.error('解析错误响应失败:', e);
          errorMessage = fetchError.response.statusText || '服务器错误';
          errorCode = fetchError.response.status || -1;
        }
      } else if (fetchError.msg) {
        errorMessage = fetchError.msg;
      }
      
      throw {
        code: errorCode,
        msg: errorMessage,
        data: null,
        originalError: fetchError
      };
    }
  } catch (error: any) {
    console.error(`API请求异常 ${method} ${url}:`, error);
    throw error;
  }
}
//////////////////////////////////////////////////////////////////////////////////////
