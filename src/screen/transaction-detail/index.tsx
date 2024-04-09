import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Header} from './_components';
import {StatisticTransactionParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CategorySelector, TransactionSelector, useRootStore} from '../../store';
import {formatDate, formatNumber} from '../../util';
import {LedgerCategoryType} from '../../constant';
import {SubCategorySelector} from '../../store/sub-category.store';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {deleteTransaction} from '../../service/api';

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
  const {setGlobalLoading, fetchApplicationData} = useRootStore();

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

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.wrapperCost}>
        <Text
          style={[
            styles.costText,
            {color: isExpenses ? 'tomato' : 'seagreen'},
          ]}>{`₫${formatNumber(transaction.cost)}`}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
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
          <View>
            <Text>
              {formatDate(transaction.time, 'DD MMM YYYY [at] hh:mm')}
            </Text>
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Note</Text>
          <Text>{transaction.note || 'None'}</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.wrapperDeleteIcon}
          onPress={onDelete}>
          <FontAwesome name={'trash'} color={'salmon'} size={30} />
        </TouchableOpacity>
      </ScrollView>
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
});
