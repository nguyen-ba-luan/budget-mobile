import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Header} from './_components';
import {useLogic} from './logic';
import Icon from 'react-native-vector-icons/AntDesign';

const AddLedger = () => {
  const {handlers, state} = useLogic();

  return (
    <View style={styles.container}>
      <Header onSave={handlers.ON_SUBMIT} />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Name</Text>
          <TouchableOpacity style={styles.valueWrapper} activeOpacity={0.8}>
            <Text style={styles.valueText}>{'Enter name here'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Color</Text>
          <TouchableOpacity style={styles.color} activeOpacity={0.8} />
        </View>
        <View style={styles.rowItem}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.valueText}>{''}</Text>
        </View>

        <TouchableOpacity
          style={styles.rowItem}
          activeOpacity={0.8}
          onPress={handlers.ON_EDIT_CATEGORY}>
          <View style={styles.row}>
            <View style={styles.categoryIconWrapper}>
              <Icon name="smile-circle" color={'white'} size={18} />
            </View>
            <Text style={{fontSize: 18}}>CategoryName</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.valueWrapper}>
              <Text style={styles.valueText}>₫10.000.000</Text>
            </View>
            <Icon name="right" color={'slategray'} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.addCategoryWrapper}
          activeOpacity={0.8}
          onPress={handlers.ON_ADD_CATEGORY}>
          <Icon name="pluscircleo" size={22} />
          <Text style={{fontSize: 18}}>Add Category</Text>
        </TouchableOpacity>
      </ScrollView>
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
});
