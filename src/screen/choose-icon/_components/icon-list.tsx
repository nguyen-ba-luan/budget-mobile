import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback} from 'react';
import {ICON_LIST} from '../../../constant';
import Icon from 'react-native-vector-icons/AntDesign';

interface IProps {
  selectedIcon: string;
  onChange(icon: string): void;
}

const IconList = (props: IProps) => {
  const {selectedIcon, onChange} = props;

  const onSelectIcon = useCallback(
    (icon: string) => () => {
      onChange(icon);
    },
    [onChange],
  );

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={ICON_LIST}
      keyExtractor={item => item}
      numColumns={6}
      renderItem={({item}) => {
        const selected = selectedIcon === item;
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.item, selected && styles.itemActive]}
            onPress={onSelectIcon(item)}>
            <Icon name={item} size={20} color={selected ? 'white' : 'gray'} />
          </TouchableOpacity>
        );
      }}
      columnWrapperStyle={{justifyContent: 'space-around'}}
    />
  );
};

export default memo(IconList);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 15,
    paddingTop: 20,
  },
  item: {
    backgroundColor: 'whitesmoke',
    height: 40,
    aspectRatio: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: 'gold',
  },
});
