import {StyleSheet, View} from 'react-native';
import React, {memo} from 'react';
import Filter from './filter';

const Header = () => {
  return (
    <View style={styles.container}>
      <Filter />
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});
