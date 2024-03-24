import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import ColorPicker from 'react-native-wheel-color-picker';
import {Header} from './_components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigation';

const ChooseColor = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ChooseColor'>) => {
  const route = useRoute<RouteProp<RootStackParamList, 'ChooseColor'>>();

  const [color, setColor] = useState(route?.params?.color || '');

  const onDone = useCallback(() => {
    navigation.navigate({
      name: route.params?.previousScreen,
      params: {
        color,
      },
      merge: true,
    } as any);
  }, [navigation, color, route.params?.previousScreen]);

  return (
    <View style={styles.container}>
      <Header onDone={onDone} />
      <View style={styles.pickerContainer}>
        <ColorPicker
          color={color}
          // swatchesOnly={this.state.swatchesOnly}
          // onColorChange={this.onColorChange}
          onColorChangeComplete={setColor}
          thumbSize={40}
          sliderSize={30}
          sliderHidden
          noSnap={true}
          row={false}
          // swatchesLast={this.state.swatchesLast}
          // swatches={this.state.swatchesEnabled}
          // discrete={this.state.disc}
          wheelLoadingIndicator={<ActivityIndicator size={40} />}
          sliderLoadingIndicator={<ActivityIndicator size={20} />}
          useNativeDriver={false}
          useNativeLayout={false}
        />
      </View>
    </View>
  );
};

export default ChooseColor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pickerContainer: {
    flex: 1,
    marginVertical: 100,
    marginHorizontal: 20,
  },
});
