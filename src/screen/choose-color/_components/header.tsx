import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';

interface IProps {
  onDone(): void;
}

const Header = (props: IProps) => {
  const {onDone} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={navigation.goBack}
        activeOpacity={0.8}>
        <Icon name={'close'} size={22} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.title}>{'Color'}</Text>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={onDone}
        activeOpacity={0.8}>
        <Text style={styles.save}>{'Done'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    position: 'absolute',
    left: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  saveBtn: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'thistle',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  save: {
    fontSize: 16,
    color: 'slateblue',
  },
});
