import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {memo, useCallback} from 'react';
import {Metrics} from '../../../theme/metric';
import {IKeyCap, keyCapList} from '../../../constant';
import Icon from 'react-native-vector-icons/Feather';

interface IProps {
  onPressKeyCap(keyCap: IKeyCap): void;
  containerStyle?: StyleProp<ViewStyle>;
}

const Keyboard = (props: IProps) => {
  const {onPressKeyCap, containerStyle} = props;

  const onPressItem = useCallback(
    (keyCap: IKeyCap) => () => {
      onPressKeyCap(keyCap);
    },
    [onPressKeyCap],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {keyCapList?.map((keyCap, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.itemKeyCap,
              keyCap?.bgColor ? {backgroundColor: keyCap?.bgColor} : {},
            ]}
            activeOpacity={0.8}
            onPress={onPressItem(keyCap)}>
            {!!keyCap?.icon ? (
              <Icon name={keyCap.icon} size={26} color={'slateblue'} />
            ) : (
              <Text style={styles.textKeyCap}>{keyCap.label}</Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default memo(Keyboard);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    gap: 5,
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  itemKeyCap: {
    width: (Metrics.screenWidth - 35) / 4,
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 2,
  },
  textKeyCap: {
    fontWeight: '600',
    fontSize: 20,
  },
});
