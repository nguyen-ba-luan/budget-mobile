import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('screen');

export const Metrics = {
  screenWidth: width,
  screenHeight: height,
};
