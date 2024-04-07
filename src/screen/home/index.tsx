import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {CategoryList, Header} from './_components';
import {useRootStore} from '../../store';

const Home = () => {
  const {fetchApplicationData} = useRootStore();

  useEffect(() => {
    fetchApplicationData();
  }, [fetchApplicationData]);

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
