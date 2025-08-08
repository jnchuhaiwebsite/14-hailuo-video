// 简单检测平台类型（PC端/移动端）
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// 检测设备类型详细信息
export const detectDeviceType = () => {
  const userAgent = navigator.userAgent;
  const deviceInfo = {
    // 基础平台类型
    platform: 'unknown',
    // 设备类型
    deviceType: 'unknown',
    // 操作系统
    os: 'unknown',
    // 浏览器
    browser: 'unknown'
  };

  // 检测设备类型
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    deviceInfo.platform = '移动端';
    
    // 细分移动设备类型
    if (/iPhone/i.test(userAgent)) {
      deviceInfo.deviceType = 'iPhone';
    } else if (/iPad/i.test(userAgent)) {
      deviceInfo.deviceType = 'iPad';
    } else if (/Android/i.test(userAgent)) {
      deviceInfo.deviceType = 'Android设备';
    } else if (/BlackBerry/i.test(userAgent)) {
      deviceInfo.deviceType = 'BlackBerry';
    } else {
      deviceInfo.deviceType = '其他移动设备';
    }
  } else {
    deviceInfo.platform = 'PC端';
    
    // 细分PC设备类型
    if (/Macintosh/i.test(userAgent)) {
      deviceInfo.deviceType = 'Mac';
    } else if (/Windows/i.test(userAgent)) {
      deviceInfo.deviceType = 'Windows PC';
    } else if (/Linux/i.test(userAgent)) {
      deviceInfo.deviceType = 'Linux PC';
    } else {
      deviceInfo.deviceType = '其他PC设备';
    }
  }

  // 检测操作系统
  if (/Windows/i.test(userAgent)) {
    deviceInfo.os = 'Windows';
  } else if (/Macintosh|Mac OS X/i.test(userAgent)) {
    deviceInfo.os = 'macOS';
  } else if (/Linux/i.test(userAgent)) {
    deviceInfo.os = 'Linux';
  } else if (/Android/i.test(userAgent)) {
    deviceInfo.os = 'Android';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    deviceInfo.os = 'iOS';
  } else if (/BlackBerry/i.test(userAgent)) {
    deviceInfo.os = 'BlackBerry OS';
  }

  // 检测浏览器
  if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) {
    deviceInfo.browser = 'Chrome';
  } else if (/Firefox/i.test(userAgent)) {
    deviceInfo.browser = 'Firefox';
  } else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
    deviceInfo.browser = 'Safari';
  } else if (/Edge/i.test(userAgent)) {
    deviceInfo.browser = 'Edge';
  } else if (/Opera|OPR/i.test(userAgent)) {
    deviceInfo.browser = 'Opera';
  } else if (/MSIE|Trident/i.test(userAgent)) {
    deviceInfo.browser = 'Internet Explorer';
  }

  return deviceInfo;
};
