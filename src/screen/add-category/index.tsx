import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header, SubCategory} from './_components';
import {InputType, useLogic} from './logic';
import {useKeyboard} from '../../hook';
//@ts-ignore
import SwitchSelector from 'react-native-switch-selector';
import {LedgerCategoryType} from '../../constant';
import {formatNumber} from '../../util';
import {useIsFocused} from '@react-navigation/native';

const AddCategory = () => {
  const {handlers, state, inputRef} = useLogic();
  const {keyboardShown, keyboardHeight} = useKeyboard();
  const isFocus = useIsFocused();

  return (
    <View style={styles.container}>
      <Header onSave={handlers.ON_SUBMIT} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Name</Text>
          <TouchableOpacity
            style={[
              styles.valueWrapper,
              keyboardShown && styles.valueWrapperActive,
            ]}
            activeOpacity={0.8}
            onPress={handlers.ON_CHANGE_NAME}>
            <Text style={styles.valueText}>
              {state?.name || 'Enter name here'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Color</Text>
          <TouchableOpacity
            style={[styles.color, {backgroundColor: state.color}]}
            activeOpacity={0.8}
            onPress={handlers.ON_SELECT_COLOR}
          />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Type</Text>
          <SwitchSelector
            initial={0}
            options={[
              {label: 'Expenses', value: LedgerCategoryType.EXPENSES},
              {label: 'Income', value: LedgerCategoryType.INCOME},
            ]}
            textColor={'gray'}
            selectedColor={'slateblue'}
            buttonColor={'white'}
            borderColor={'whitesmoke'}
            backgroundColor={'whitesmoke'}
            hasPadding
            valuePadding={2}
            style={styles.switchContainer}
            onPress={handlers.ON_CHANGE_TYPE}
            height={35}
          />
        </View>
        {state.type === LedgerCategoryType.EXPENSES && (
          <View style={styles.rowItem}>
            <Text style={styles.label}>Budget</Text>
            <TouchableOpacity
              style={[
                styles.valueWrapper,
                state.inputType === InputType.BUDGET &&
                  !isFocus &&
                  styles.valueWrapperActive,
              ]}
              activeOpacity={0.8}
              onPress={handlers.ON_CHANGE_BUDGET}>
              <Text style={styles.valueText}>{`${
                state.budget?.period
              } ₫${formatNumber(state.budget?.cost)}`}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.rowItem}>
          <Text style={styles.label}>Subcategory</Text>
          <View />
        </View>
        <SubCategory
          subCategoryList={state.subCategoryList}
          onAddMore={handlers.ON_ADD_MORE_SUB_CATEGORY}
        />
      </ScrollView>
      <TextInput
        ref={inputRef}
        placeholder={
          state.inputType === InputType.SUB_CATEGORY
            ? 'Sub category name'
            : 'Enter name here'
        }
        style={[
          styles.input,
          {
            bottom: keyboardShown ? keyboardHeight : -100,
          },
        ]}
        value={state.inputValue}
        onChangeText={handlers.ON_CHANGE_INPUT}
        onSubmitEditing={handlers.ON_SUBMIT_EDITING}
        returnKeyType="done"
      />
    </View>
  );
};

export default AddCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    color: 'slateblue',
  },
  valueText: {
    fontWeight: '700',
    fontSize: 16,
  },
  valueWrapper: {
    backgroundColor: 'whitesmoke',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  valueWrapperActive: {
    backgroundColor: 'khaki',
  },
  color: {
    backgroundColor: 'red',
    height: 40,
    aspectRatio: 1,
    borderRadius: 20,
  },
  input: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 12,
    alignSelf: 'stretch',
    right: 0,
    left: 0,
    bottom: -100,
  },
  switchContainer: {
    width: 180,
  },
});
