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

const Header = () => {
  const navigation = useNavigation<any>();

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
  }, []);

  const onSelectLedger = useCallback(
    (id: number) => () => {
      if (selectedLedger?.id === id) return;

      selectLedger(id);
      onToggleModal();
    },
    [selectLedger, selectedLedger],
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
          {selectedLedger.name}
        </Text>
        <Icon name={'caretdown'} size={12} color={'slateblue'} />
      </TouchableOpacity>

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
                      <Icon
                        name={'pay-circle1'}
                        size={18}
                        color={'dodgerblue'}
                      />
                      <Text style={styles.ledgerName}>{ledger?.name}</Text>
                    </View>
                    <Ionicons
                      name={'settings-sharp'}
                      size={24}
                      color={'grey'}
                    />
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
  container: {},
  ledgerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 4,
    alignSelf: 'baseline',
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
