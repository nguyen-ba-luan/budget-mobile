import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header} from './_components';
import {useLogic} from './logic';
import Icon from 'react-native-vector-icons/AntDesign';
import {useKeyboard} from '../../hook';
import {formatNumber} from '../../util';

const AddLedger = () => {
  const {handlers, state, inputRef} = useLogic();
  const {keyboardShown, keyboardHeight} = useKeyboard();

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
          <Text style={styles.label}>Category</Text>
          <Text style={styles.valueText}>{''}</Text>
        </View>

        {state.categoryList.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.rowItem}
            activeOpacity={0.8}
            onPress={handlers.ON_EDIT_CATEGORY(category?.id)}>
            <View style={styles.row}>
              <View
                style={[
                  styles.categoryIconWrapper,
                  {backgroundColor: category?.color},
                ]}>
                <Icon name="smile-circle" color={'white'} size={18} />
              </View>
              <Text style={{fontSize: 18}}>{category?.name}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.valueWrapper}>
                <Text style={styles.valueText}>{`${
                  category?.budget?.period
                } ₫${formatNumber(category?.budget?.cost)}`}</Text>
              </View>
              <Icon name="right" color={'slategray'} />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.addCategoryWrapper}
          activeOpacity={0.8}
          onPress={handlers.ON_ADD_CATEGORY}>
          <Icon name="pluscircleo" size={22} />
          <Text style={{fontSize: 18}}>Add Category</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.8}>
          <Icon name="delete" color={'red'} size={26} />
        </TouchableOpacity>
      </ScrollView>
      <TextInput
        ref={inputRef}
        placeholder={'Enter name here'}
        style={[
          styles.input,
          {
            bottom: keyboardShown ? keyboardHeight : -100,
          },
        ]}
        value={state.name}
        onChangeText={handlers.ON_CHANGE_INPUT}
        returnKeyType="done"
      />
    </View>
  );
};

export default AddLedger;

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
  addCategoryWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryIconWrapper: {
    height: 35,
    aspectRatio: 1,
    borderRadius: 20,
    backgroundColor: 'violet',
    alignItems: 'center',
    justifyContent: 'center',
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
  deleteBtn: {
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
});
