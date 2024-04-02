import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {
  LedgerSelector,
  TransactionSelector,
  useRootStore,
} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {Metrics} from '../../../theme/metric';
import Icon from 'react-native-vector-icons/AntDesign';
import Accordion from 'react-native-collapsible/Accordion';
import {ITransaction, LedgerCategoryType} from '../../../constant';
import {RootStackParamList} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatNumber} from '../../../util';

const CategoryList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectedLedger = useRootStore(LedgerSelector.selectSelectedLedger);
  const transactionList = useRootStore(
    TransactionSelector.selectTransactionListForHome,
  );
  const {
    totalExpenses,
    totalExpensesByCategory,
    totalIncome,
    totalIncomeByCategory,
  } = getTransactionHome(transactionList);

  const categoryList = selectedLedger?.categoryList;

  const [activeSections, setActiveSections] = useState([0, 1]);

  const onAddTransaction = useCallback(
    (categoryId: number, costTotal: number) => () => {
      navigation.navigate('AddTransaction', {
        categoryId,
        costTotal,
        ledgerId: selectedLedger?.id,
      });
    },
    [navigation, selectedLedger.id],
  );

  const sections = [
    {
      type: LedgerCategoryType.EXPENSES,
      categoryList: categoryList
        ?.filter(item => item?.type === LedgerCategoryType.EXPENSES)
        ?.map(item => ({
          ...item,
          costTotal: totalExpensesByCategory[item?.id] || 0,
        })),
      total: totalExpenses,
    },
    {
      type: LedgerCategoryType.INCOME,
      categoryList: categoryList
        ?.filter(item => item?.type === LedgerCategoryType.INCOME)
        ?.map(item => ({
          ...item,
          costTotal: totalIncomeByCategory[item?.id] || 0,
        })),
      total: totalIncome,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Accordion
        activeSections={activeSections}
        sections={sections}
        expandMultiple
        onChange={setActiveSections}
        touchableComponent={TouchableWithoutFeedback}
        renderHeader={(content, _, isActive) => {
          return (
            <View style={styles.headerContainer}>
              <Text style={styles.headerType}>{content?.type}</Text>
              <Text style={styles.headerTotal}>{`${
                selectedLedger?.currency?.symbol || '₫'
              }${formatNumber(content?.total || 0)}`}</Text>
              <Icon
                name={isActive ? 'downcircle' : 'upcircle'}
                color={'plum'}
                size={14}
              />
            </View>
          );
        }}
        renderContent={content => {
          return (
            <View style={styles.itemWrapper}>
              {content.categoryList.map(category => {
                return (
                  <TouchableOpacity
                    key={category.id}
                    activeOpacity={0.8}
                    onPress={onAddTransaction(category.id, category?.costTotal)}
                    style={[
                      styles.itemContainer,
                      {backgroundColor: category?.color},
                    ]}>
                    <Text style={styles.categoryName}>{category?.name}</Text>
                    <Icon name="team" color={'deeppink'} size={30} />
                    <Text style={styles.costTotal}>{`${
                      selectedLedger?.currency?.symbol
                    }${formatNumber(category?.costTotal)}`}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default memo(CategoryList);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5,
  },
  itemWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    gap: 15,
  },
  itemContainer: {
    width: (Metrics.screenWidth - 60) / 3,
    backgroundColor: 'lightpink',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 15,
  },
  headerType: {
    fontSize: 18,
  },
  headerTotal: {
    fontWeight: '600',
    fontSize: 18,
  },
  categoryName: {
    fontSize: 18,
  },
  costTotal: {
    // fontSize: 18,
  },
});

const getTransactionHome = (transactionList: ITransaction[]) => {
  let totalExpenses = 0;
  let totalIncome = 0;

  let totalExpensesByCategory: {
    [categoryId: number]: number;
  } = {};
  let totalIncomeByCategory: {
    [categoryId: number]: number;
  } = {};

  for (let i = 0; i < transactionList.length; i++) {
    const transaction = transactionList[i];

    if (transaction.type === LedgerCategoryType.EXPENSES) {
      totalExpenses += transaction.cost;
      totalExpensesByCategory = {
        ...totalExpensesByCategory,
        [transaction.categoryId]:
          (totalExpensesByCategory[transaction.categoryId] || 0) +
          transaction.cost,
      };
    } else {
      totalIncome += transaction.cost;
      totalIncomeByCategory = {
        ...totalIncomeByCategory,
        [transaction.categoryId]:
          (totalIncomeByCategory[transaction.categoryId] || 0) +
          transaction.cost,
      };
    }
  }

  return {
    totalExpenses,
    totalIncome,
    totalExpensesByCategory,
    totalIncomeByCategory,
  };
};
