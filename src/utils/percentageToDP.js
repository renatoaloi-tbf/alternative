import {Dimensions, PixelRatio} from 'react-native';
// const widthPercentageToDP = widthPercent => {
//   const screenWidth = Dimensions.get('window').width;
//   const elemWidth = parseFloat(widthPercent);
//   return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
// };

// const heightPercentageToDp = heightPercent => {
//   const screenHeight = Dimensions.get('window').height;
//   const elemHeight = parseFloat(heightPercent);
//   return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
// };

// // export const  = {widthPercentageToDP, heightPercentageToDp};

export const percentageToDP = {
  widthPercentageToDP: widthPercent => {
    const screenWidth = Dimensions.get('window').width;
    const elemWidth = parseFloat(widthPercent);
    return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  },
  heightPercentageToDp: heightPercent => {
    const screenHeight = Dimensions.get('window').width;
    const elemHeight = parseFloat(heightPercent);
    return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
  }
};
