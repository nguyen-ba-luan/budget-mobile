import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {LedgerSelector, useRootStore} from '../../../store';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {isNilOrEmpty} from 'ramda-adjunct';
import {ILedger} from '../../../constant';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation';
import Filter from './filter';

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectedLedger = useRootStore(LedgerSelector.selectSelectedLedger);
  const ledgerList = useRootStore(LedgerSelector.selectLedgerList);
  const {selectLedger} = useRootStore();

  const [visible, setVisible] = useState(false);

  const onToggleModal = useCallback(() => {
    setVisible(prevVisible => !prevVisible);
  }, []);

  const onAddLedger = useCallback(() => {
    onToggleModal();
    setTimeout(() => {
      navigation.navigate('AddLedger');
    }, 500);
  }, [navigation, onToggleModal]);

  const onSelectLedger = useCallback(
    (id: number) => () => {
      onToggleModal();
      if (selectedLedger?.id === id) {
        return;
      }

      selectLedger(id);
    },
    [onToggleModal, selectLedger, selectedLedger?.id],
  );

  const onEditLedger = useCallback(
    (ledger: ILedger) => () => {
      onToggleModal();

      setTimeout(() => {
        navigation.navigate('AddLedger', {
          ledgerId: ledger?.id,
        });
      }, 500);
    },
    [navigation, onToggleModal],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.ledgerBtn}
        onPress={onToggleModal}
        activeOpacity={0.8}>
        <Text
          style={{
            color: 'slateblue',
            fontSize: 18,
          }}>
          {isNilOrEmpty(ledgerList) ? 'Add Ledger' : selectedLedger.name}
        </Text>
        <Icon name={'caretdown'} size={12} color={'slateblue'} />
      </TouchableOpacity>

      <Filter />

      <Modal transparent visible={visible} presentationStyle="overFullScreen">
        <TouchableWithoutFeedback onPress={onToggleModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {ledgerList?.map(ledger => {
                const active = selectedLedger?.id === ledger?.id;
                return (
                  <TouchableOpacity
                    key={ledger?.id}
                    style={styles.ledgerItem}
                    onPress={onSelectLedger(ledger?.id)}>
                    <View style={styles.ledgerItemLeft}>
                      <View
                        style={[
                          styles.ledgerItemLeftActive,
                          !active && styles.ledgerItemLeftInActive,
                        ]}
                      />
                      <Icon name={ledger.icon} size={18} color={ledger.color} />
                      <Text style={styles.ledgerName}>{ledger?.name}</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={onEditLedger(ledger)}>
                      <Ionicons
                        name={'settings-sharp'}
                        size={24}
                        color={'grey'}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity style={styles.ledgerItem} onPress={onAddLedger}>
                <View style={styles.ledgerItemLeft}>
                  <View
                    style={[
                      styles.ledgerItemLeftActive,
                      styles.ledgerItemLeftInActive,
                    ]}
                  />
                  <Icon name={'pluscircle'} size={18} color={'limegreen'} />
                  <Text style={styles.ledgerName}>{'Add Ledger'}</Text>
                </View>
                <Ionicons name={'baseball'} size={24} color={'limegreen'} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  ledgerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 4,
    alignSelf: 'baseline',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0003',
    paddingTop: 70,
  },
  modalContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingRight: 20,
    borderRadius: 20,
  },
  ledgerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  ledgerItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ledgerItemLeftActive: {
    width: 2,
    height: 20,
    backgroundColor: 'limegreen',
    marginRight: 10,
  },
  ledgerItemLeftInActive: {
    backgroundColor: 'transparent',
  },
  ledgerName: {
    fontSize: 18,
  },
});
