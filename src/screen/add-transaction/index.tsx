import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import {
  Cost,
  SubCategory,
  Header,
  Keyboard,
  Statistic,
  MoreAction,
} from './_components';
import {InputType, useAddTransactionLogic} from './logic';
import {useKeyboard} from '../../hook';

const AddTransaction = () => {
  const {handlers, state, inputRef} = useAddTransactionLogic();
  const {keyboardShown, keyboardHeight} = useKeyboard();

  return (
    <View style={styles.container}>
      <Header />
      <Cost cost={state.cost} />
      <Statistic />
      <SubCategory
        selectedSubCategoryId={state.selectedSubCategoryId}
        onSelect={handlers.ON_SELECT_SUB_CATEGORY}
        onAddMore={handlers.ON_ADD_MORE_SUB_CATEGORY}
      />
      <MoreAction
        time={state.time}
        onChangeTime={handlers.ON_CHANGE_TIME}
        onAddNote={handlers.ON_ADD_NOTE}
      />
      <Keyboard onPressKeyCap={handlers.ON_PRESS_KEY_CAP} />
      <TextInput
        ref={inputRef}
        placeholder={
          state.inputType === InputType.SUB_CATEGORY
            ? 'Sub category name'
            : 'Note'
        }
        style={[
          styles.input,
          {
            bottom: keyboardShown ? keyboardHeight : -100,
          },
        ]}
        onChangeText={handlers.ON_CHANGE_INPUT}
        onSubmitEditing={handlers.ON_SUBMIT_EDITING}
        returnKeyType="done"
      />
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
