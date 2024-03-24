import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import React, {useCallback} from 'react';
import Keyboard from './keyboard';
import {IBudget, IKeyCap, KeyCapType, PeriodType} from '../../constant';
import useMergingState from '../../hook/useMergingState';
import {formatNumber} from '../../util';
import {RootStackParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const AddBudget = ({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'AddBudget'>) => {
  const [state, setState] = useMergingState({
    cost: route?.params?.budget?.cost || 0,
    period: route?.params?.budget?.period ?? PeriodType.MONTHLY,
  });

  const onPressKeyCap = useCallback(
    (keyCap: IKeyCap) => {
      if (keyCap.type === KeyCapType.SUBMIT) {
        navigation.navigate({
          name: route?.params?.previousScreen,
          params: {
            budget: {
              cost: state.cost,
              period: state.period,
            } as IBudget,
          },
          merge: true,
        } as any);
        return;
      }

      if (keyCap.type === KeyCapType.NUMBER) {
        setState({
          cost: Number(String(state.cost) + String(keyCap.label)),
        });
      }

      if (keyCap.type === KeyCapType.DELETE) {
        setState({
          cost: Math.floor(state.cost / 10),
        });
      }

      if (keyCap.type === KeyCapType.RESET) {
        setState({
          cost: 0,
          period: PeriodType.MONTHLY,
        });
      }
    },
    [
      navigation,
      route?.params?.previousScreen,
      setState,
      state.cost,
      state.period,
    ],
  );

  return (
    <TouchableWithoutFeedback onPress={navigation.goBack}>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Budget</Text>
            <View style={styles.valueWrapper}>
              <Text style={styles.valueText}>{`₫${formatNumber(
                state.cost,
              )}`}</Text>
            </View>
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Period</Text>
            <View style={styles.valueWrapper}>
              <Text style={styles.valueText}>{state.period}</Text>
            </View>
          </View>
          <Keyboard onPressKeyCap={onPressKeyCap} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddBudget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  wrapper: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
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
});
