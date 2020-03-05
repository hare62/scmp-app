import { Dimensions } from 'react-native';
 
// 设备宽度，单位 dp
const deviceWidthDp = Dimensions.get('window').width;
 
// 设计稿宽度（这里为640px），单位 px
const uiWidthPx = 750;
 
// px 转 dp（设计稿中的 px 转 rn 中的 dp）
export const fitSize = (uiElePx) => {
 return (uiElePx * deviceWidthDp / uiWidthPx)*2;
}

// 导航栏在iOS中的高度
const NAV_BAR_HEIGHT_IOS = 44;

// 导航栏在Android中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;

// 导航栏的高度
export const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;

// 状态栏的高度
export const STATUS_BAR_HEIGHT = (Platform.OS !== 'ios' || DeviceInfo.isIPhoneX_deprecated) ? 0 : 20;
