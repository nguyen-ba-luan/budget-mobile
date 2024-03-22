import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Header} from './_components';

const AddCategory = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
