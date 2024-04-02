import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Header, IconList} from './_components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';

const ChooseIcon = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ChooseIcon'>) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ChooseIcon'>>();

  const [icon, setIcon] = useState(route?.params?.icon || '');

  const onDone = useCallback(() => {
    navigation.navigate({
      name: route.params?.previousScreen,
      params: {
        icon,
      },
      merge: true,
    } as any);
  }, [navigation, icon, route.params?.previousScreen]);

  return (
    <View style={styles.container}>
      <Header onDone={onDone} />
      <IconList selectedIcon={icon} onChange={setIcon} />
    </View>
  );
};

export default ChooseIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
