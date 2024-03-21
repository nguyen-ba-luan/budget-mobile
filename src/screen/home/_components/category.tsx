import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import {LedgerSelector, useRootStore} from '../../../store';
import {useNavigation} from '@react-navigation/native';
import {Metrics} from '../../../theme/metric';
import Icon from 'react-native-vector-icons/AntDesign';
import Accordion from 'react-native-collapsible/Accordion';
import {LedgerCategoryType} from '../../../constant';
import {RootStackParamList} from '../../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const CategoryList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectedLedger = useRootStore(LedgerSelector.selectSelectedLedger);

  const categories = selectedLedger?.categories;

  const [activeSections, setActiveSections] = useState([0, 1]);

  const onAddTransaction = useCallback(
    (categoryId: number) => () => {
      navigation.navigate('AddTransaction', {
        categoryId,
        ledgerId: selectedLedger?.id,
      });
    },
    [navigation, selectedLedger.id],
  );

  const sections = [
    {
      type: LedgerCategoryType.EXPENSES,
      categories: categories?.filter(
        item => item?.type === LedgerCategoryType.EXPENSES,
      ),
    },
    {
      type: LedgerCategoryType.INCOME,
      categories: categories?.filter(
        item => item?.type === LedgerCategoryType.INCOME,
      ),
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
              <Text>{content?.type}</Text>
              <Text>{`${selectedLedger?.currency?.symbol}${0}`}</Text>
              <Icon
                name={isActive ? 'downcircle' : 'upcircle'}
                color={'plum'}
                size={12}
              />
            </View>
          );
        }}
        renderContent={content => {
          return (
            <View style={styles.itemWrapper}>
              {content.categories.map(category => {
                return (
                  <TouchableOpacity
                    key={category.id}
                    activeOpacity={0.8}
                    onPress={onAddTransaction(category.id)}
                    style={styles.itemContainer}>
                    <Text>{category?.name}</Text>
                    <Icon name="team" color={'deeppink'} size={30} />
                    <Text>{`${selectedLedger?.currency?.symbol}${0}`}</Text>
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
  },
  itemContainer: {
    width: (Metrics.screenWidth - 60) / 3,
    backgroundColor: 'lightpink',
    marginBottom: 15,
    marginRight: 10,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    gap: 15,
  },
});
