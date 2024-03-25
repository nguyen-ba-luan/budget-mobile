import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import {LedgerSelector, useRootStore} from '../../../store';

interface IProps {
  onSave(): void;
}

const Header = (props: IProps) => {
  const {onSave} = props;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddLedger'>>();
  const ledgerId = route?.params?.ledgerId;

  const ledgerDetail = useRootStore(LedgerSelector.selectLedgerById(ledgerId));

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={navigation.goBack}
        activeOpacity={0.8}>
        <Icon name={'close'} size={22} color={'black'} />
      </TouchableOpacity>
      <Text style={styles.title}>{ledgerDetail?.name || 'Ledger'}</Text>
      <TouchableOpacity
        style={styles.saveBtn}
        onPress={onSave}
        activeOpacity={0.8}>
        <Text style={styles.save}>{'Save'}</Text>
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
