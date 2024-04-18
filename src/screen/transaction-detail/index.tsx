import {
  Alert,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from './_components';
import {StatisticTransactionParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CategorySelector, TransactionSelector, useRootStore} from '../../store';
import {formatDate, formatNumber} from '../../util';
import {IKeyCap, KeyCapType, LedgerCategoryType} from '../../constant';
import {SubCategorySelector} from '../../store/sub-category.store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {deleteTransaction, updateTransaction} from '../../service/api';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import dayjs from 'dayjs';
import {Keyboard} from '../add-transaction/_components';
import useMergingState from '../../hook/useMergingState';

const TransactionDetail = ({
  navigation,
  route,
}: NativeStackScreenProps<
  StatisticTransactionParamList,
  'TransactionDetail'
>) => {
  const transactionId = route.params.transactionId;
  const transaction = useRootStore(
    TransactionSelector.selectTransactionById(transactionId),
  );

  const category = useRootStore(
    CategorySelector.selectLedgerCategory(transaction.categoryId),
  );
  const subCategory = useRootStore(
    SubCategorySelector.selectSubCategoryById(transaction.subCategoryId),
  );

  const [state, setState] = useMergingState({
    isDatePickerVisible: false,
    cost: transaction?.cost,
    showKeyboard: false,
  });

  const hideDatePicker = useCallback(() => {
    setState({isDatePickerVisible: false});
  }, []);

  const {setGlobalLoading, fetchApplicationData} = useRootStore();

  const openDatePicker = useCallback(() => {
    setState({isDatePickerVisible: true});
  }, []);

  const onShowKeyboard = useCallback(() => {
    setState({showKeyboard: true});
  }, []);

  const onHideKeyboard = useCallback(() => {
    setState({showKeyboard: false});
  }, []);

  const handleConfirm = useCallback(
    async (date: Date) => {
      hideDatePicker();
      const newTime = date.toISOString();

      if (newTime === transaction.time) return;

      try {
        await updateTransaction({
          id: transaction?.id,
          time: newTime,
        });

        fetchApplicationData();
      } finally {
        setGlobalLoading(false);
      }
    },
    [hideDatePicker, transaction],
  );

  const isExpenses = transaction.type === LedgerCategoryType.EXPENSES;

  const onDelete = useCallback(() => {
    Alert.alert('Confirm', 'Are you sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            setGlobalLoading(true);
            await deleteTransaction(transactionId);
            fetchApplicationData();
            navigation.goBack();
          } catch (error) {
            setGlobalLoading(false);
          } finally {
            setGlobalLoading(false);
          }
        },
      },
    ]);
  }, [transactionId]);

  const onSubmitEditingNote = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    try {
      const newNote = e.nativeEvent.text?.trim();

      if (newNote === transaction.note) return;
      setGlobalLoading(true);

      await updateTransaction({
        id: transaction?.id,
        note: newNote,
      });

      fetchApplicationData();
    } finally {
      setGlobalLoading(false);
    }
  };

  const onPressKeyCap = async (keyCap: IKeyCap) => {
    if (keyCap.type === KeyCapType.SUBMIT) {
      onHideKeyboard();
      const newCost = state.cost;

      if (newCost === transaction.cost) return;

      try {
        setGlobalLoading(true);

        await updateTransaction({
          id: transaction?.id,
          cost: newCost,
        });

        fetchApplicationData();
      } finally {
        setGlobalLoading(false);
      }
    }

    if (keyCap.type === KeyCapType.NUMBER) {
      setState({
        cost: Number(String(state.cost) + String(keyCap.label)),
      });
    }

    if (keyCap.type === KeyCapType.DELETE) {
      setState({
        cost: Math.floor(state.cost / 10),
      });
    }
  };

  const onPressBackdrop = () => {
    onHideKeyboard();
    setState({cost: transaction?.cost});
  };

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity
        style={[
          styles.wrapperCost,
          state.showKeyboard && styles.wrapperCostActive,
        ]}
        onPress={onShowKeyboard}>
        <Text
          style={[
            styles.costText,
            {color: isExpenses ? 'tomato' : 'seagreen'},
          ]}>{`₫${formatNumber(state.cost)}`}</Text>
      </TouchableOpacity>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Type</Text>
          <View>
            <Text>{transaction.type}</Text>
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Category</Text>
          <View>
            <Text>{category.name}</Text>
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Subcategory</Text>
          <View>
            <Text>{subCategory.name || 'None'}</Text>
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Time</Text>
          <TouchableOpacity style={styles.enablePress} onPress={openDatePicker}>
            <Text>
              {formatDate(transaction.time, 'DD MMM YYYY [at] hh:mm')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Note</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="None"
            defaultValue={transaction.note}
            returnKeyType="done"
            onSubmitEditing={onSubmitEditingNote}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.wrapperDeleteIcon}
          onPress={onDelete}>
          <FontAwesome name={'trash'} color={'salmon'} size={30} />
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      <DateTimePickerModal
        isVisible={state.isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        display="inline"
        date={dayjs(transaction.time).toDate()}
      />
      {state.showKeyboard && (
        <TouchableOpacity
          style={styles.wrapperKeyboard}
          onPress={onPressBackdrop}>
          <Keyboard
            containerStyle={styles.keyboard}
            onPressKeyCap={onPressKeyCap}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapperCost: {
    backgroundColor: 'whitesmoke',
    alignSelf: 'center',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginVertical: 30,
  },
  wrapperCostActive: {
    backgroundColor: 'gold',
  },
  costText: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  scrollView: {
    flexGrow: 1,
  },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  label: {
    fontSize: 18,
    color: 'gray',
  },
  wrapperDeleteIcon: {
    backgroundColor: 'whitesmoke',
    width: 50,
    aspectRatio: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  noteInput: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    maxWidth: '80%',
  },
  enablePress: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  wrapperKeyboard: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
  },
  keyboard: {
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingTop: 10,
  },
});
