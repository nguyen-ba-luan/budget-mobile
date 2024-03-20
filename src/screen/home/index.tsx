import {StyleSheet, View} from 'react-native';
import React from 'react';
import {CategoryList, Header} from './_components';

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
      <CategoryList />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
