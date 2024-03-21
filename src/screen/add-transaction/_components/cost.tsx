import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {RootStoreSelector, useRootStore} from '../../../store';

interface IProps {
  cost: number;
}

const Cost = (props: IProps) => {
  const {cost} = props;
  const selectedLedger = useRootStore(RootStoreSelector.selectSelectedLedger);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${
        selectedLedger?.currency?.symbol
      }${cost.toLocaleString('vi')}`}</Text>
    </View>
  );
};

export default memo(Cost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 40,
  },
});
