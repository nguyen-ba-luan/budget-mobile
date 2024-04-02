import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';

const FilterByWeek = () => {
  return (
    <View style={styles.container}>
      <Text>Coming soon</Text>
    </View>
  );
};

export default memo(FilterByWeek);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});
