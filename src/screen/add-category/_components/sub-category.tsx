import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {ISubCategory} from '../../../constant';
import Tooltip from 'react-native-walkthrough-tooltip';

interface IProps {
  subCategoryList: ISubCategory[];
  onAddMore(): void;
  onDelete(subCategory: ISubCategory): void;
  onEdit(subCategory: ISubCategory): void;
}

const SubCategory = (props: IProps) => {
  const {onAddMore, subCategoryList = [], onDelete, onEdit} = props;
  const [toolTipVisible, setToolTipVisible] = useState(false);

  const onToggleTooltip = useCallback(() => {
    setToolTipVisible(prevState => !prevState);
  }, []);

  const onDeleteSubCategory = useCallback(
    (subCategory: ISubCategory) => () => {
      onDelete(subCategory);
      onToggleTooltip();
    },
    [onDelete],
  );

  const onEditSubCategory = useCallback(
    (subCategory: ISubCategory) => () => {
      onEdit(subCategory);
      onToggleTooltip();
    },
    [onEdit],
  );

  return (
    <View style={styles.container}>
      {subCategoryList?.map(item => {
        return (
          <View key={item?.id || '' + item?.temporaryId || ''}>
            <Tooltip
              contentStyle={{width: 110}}
              isVisible={toolTipVisible}
              disableShadow
              useInteractionManager
              content={
                <View style={styles.tooltipRow}>
                  <TouchableOpacity
                    style={styles.tooltipBtn}
                    onPress={onDeleteSubCategory(item)}>
                    <Text style={styles.tooltipText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.tooltipBtn}
                    onPress={onEditSubCategory(item)}>
                    <Text style={styles.tooltipText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              }
              placement="top"
              onClose={onToggleTooltip}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subItem}
                onPress={onToggleTooltip}>
                <Text style={styles.subText}>{item?.name}</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
        );
      })}
      <TouchableOpacity
        style={styles.subItem}
        activeOpacity={0.8}
        onPress={onAddMore}>
        <Icon name="plus" style={styles.subText} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(SubCategory);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 5,
    flexWrap: 'wrap',
  },
  subItem: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'baseline',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    minWidth: 50,
  },
  subText: {
    color: 'dimgray',
  },
  tooltipRow: {
    flexDirection: 'row',
    gap: 2,
  },
  tooltipBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipText: {
    color: 'gray',
  },
});
