import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import {
  CategorySelector,
  TransactionSelector,
  useRootStore,
} from '../../../store';
import {
  formatDate,
  formatNumber,
  groupAndSortTransactions,
  map,
} from '../../../util';
import {ITransaction, LedgerCategoryType} from '../../../constant';
import {SubCategorySelector} from '../../../store/sub-category.store';
import Icon from 'react-native-vector-icons/AntDesign';

const TransactionList = () => {
  const transactionList = useRootStore(
    TransactionSelector.selectTransactionListForHome,
  );

  const list = groupAndSortTransactions(transactionList);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {map(list, data => {
        return <Item key={data?.type + data.date} data={data} />;
      })}
    </ScrollView>
  );
};

export default memo(TransactionList);

const Item = ({
  data,
}: {
  data: {
    type: LedgerCategoryType;
    date: string;
    totalCost: number;
    transactionList: ITransaction[];
  };
}) => {
  const isExpenses = data.type === LedgerCategoryType.EXPENSES;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.rowDate}>
        <Text>
          {formatDate(data?.transactionList?.[0]?.time, 'ddd, D MMM')}
        </Text>
        <View>
          <Text>
            <Text style={{color: isExpenses ? 'tomato' : 'seagreen'}}>
              {isExpenses ? 'OUT' : 'IN'}{' '}
            </Text>
            {`₫${formatNumber(data.totalCost)}`}
          </Text>
        </View>
      </View>
      <FlatList
        id="transactionList"
        scrollEnabled={false}
        nestedScrollEnabled={true}
        keyExtractor={item => item?.id?.toString()}
        data={data?.transactionList}
        renderItem={({item}) => {
          return <TransactionItem transaction={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const TransactionItem = ({transaction}: {transaction: ITransaction}) => {
  const isExpenses = transaction.type === LedgerCategoryType.EXPENSES;

  const category = useRootStore(
    CategorySelector.selectLedgerCategory(transaction.categoryId),
  );
  const subCategory = useRootStore(
    SubCategorySelector.selectSubCategoryById(transaction.subCategoryId),
  );
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.rowTransaction}>
      <View style={styles.rowIcon}>
        <View style={[styles.wrapperIcon, {backgroundColor: category?.color}]}>
          <Icon name={category.icon} color={'white'} />
        </View>
        <View>
          <Text style={styles.categoryName}>{category.name}</Text>
          {!!subCategory.name && <Text>{subCategory.name}</Text>}
        </View>
      </View>
      <View>
        <Text
          style={[
            styles.costText,
            {color: isExpenses ? 'tomato' : 'seagreen'},
          ]}>{`${isExpenses ? '-' : '+'}₫${formatNumber(
          transaction.cost,
        )}`}</Text>
        <Text style={styles.timeText}>
          {formatDate(transaction.time, 'HH:mm')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  rowDate: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'whitesmoke',
  },
  separator: {
    height: 1,
    backgroundColor: 'whitesmoke',
  },
  rowTransaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  rowIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  wrapperIcon: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 16,
  },
  costText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  timeText: {
    color: 'silver',
    textAlign: 'right',
  },
});
