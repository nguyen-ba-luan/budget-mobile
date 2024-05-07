import {Dimensions, Platform, PixelRatio} from 'react-native';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('screen');

export const Metrics = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,
};

const ROOT_SCREEN = {
  width: 375,
  height: 812,
};

const scale = SCREEN_WIDTH / ROOT_SCREEN.width;
const scaleVertical = SCREEN_HEIGHT / ROOT_SCREEN.height;

export const actuatedNormalize = (size: number) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const actuatedNormalizeVertical = (size: number) => {
  const newSize = size * scaleVertical;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const isTab = () => SCREEN_WIDTH > 550;

export const isScreenHeight770 = () =>
  SCREEN_HEIGHT > 740 && SCREEN_HEIGHT < 760;

type WidthKeys = `w${number}`;
type HeightKeys = `h${number}`;

type Size = {
  [K in WidthKeys | HeightKeys]: number;
};

const generateSizeObject = () => {
  const sizeObj = {} as Size;
  for (let i = 1; i <= 1000; i++) {
    const widthKey = `w${i}` as WidthKeys;
    const heightKey = `h${i}` as HeightKeys;
    sizeObj[widthKey] = actuatedNormalize(i);
    sizeObj[heightKey] = actuatedNormalizeVertical(i);
  }

  return sizeObj;
};

export const Size = generateSizeObject();
