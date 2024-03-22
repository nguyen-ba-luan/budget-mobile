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

const AddCategory = () => {
  const {handlers, state, inputRef} = useLogic();
  const {keyboardShown, keyboardHeight} = useKeyboard();

  return (
    <View style={styles.container}>
      <Header onSave={handlers.ON_SUBMIT} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Name</Text>
          <TouchableOpacity
            style={styles.valueWrapper}
            activeOpacity={0.8}
            onPress={handlers.ON_CHANGE_NAME}>
            <Text style={styles.valueText}>
              {state?.name || 'Enter name here'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Color</Text>
          <TouchableOpacity style={styles.color} activeOpacity={0.8} />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.valueWrapper}>
            <Text style={styles.valueText}>₫10.000.000</Text>
          </View>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Subcategory</Text>
          <View />
        </View>
        <SubCategory
          subCategoryList={[]}
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
});
