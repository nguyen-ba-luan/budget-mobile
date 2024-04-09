import {TextInput} from 'react-native';
import {IKeyCap, KeyCapType} from '../../constant';
import useMergingState from '../../hook/useMergingState';
import dayjs from 'dayjs';
import {useRef} from 'react';
import {CategorySelector, useRootStore} from '../../store';
import {generateUUID} from '../../util';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {addTransaction} from '../../service/api';

export enum InputType {
  SUB_CATEGORY = 'SUB_CATEGORY',
  NOTE = 'NOTE',
}

export const useAddTransactionLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddTransaction'>>();

  const {categoryId, ledgerId} = route.params;

  const [state, setState] = useMergingState({
    cost: 0,
    selectedSubCategoryId: null as null | number,
    time: dayjs().toISOString(),
    note: '',
    inputType: '' as InputType,
  });

  const {addSubCategory, fetchApplicationData} = useRootStore();
  const category = useRootStore(
    CategorySelector.selectLedgerCategory(categoryId),
  );

  const inputRef = useRef<TextInput>(null);
  const inputValueRef = useRef('');

  const handlers = {
    ON_SELECT_SUB_CATEGORY: (subCategoryId: number) => {
      setState({
        selectedSubCategoryId:
          subCategoryId === state.selectedSubCategoryId ? null : subCategoryId,
      });
    },
    ON_ADD_MORE_SUB_CATEGORY: () => {
      inputRef.current?.focus();
      setState({inputType: InputType.SUB_CATEGORY});
    },
    ON_ADD_NOTE: () => {
      inputRef.current?.focus();
      setState({inputType: InputType.NOTE});
    },
    ON_CHANGE_INPUT: (text: string) => {
      inputValueRef.current = text;
    },
    ON_SUBMIT_EDITING: () => {
      inputRef.current?.clear();

      if (state.inputType === InputType.NOTE) {
        setState({note: inputValueRef.current});

        return;
      }

      if (!inputValueRef.current) return;

      addSubCategory({
        categoryId,
        subCategory: {
          id: generateUUID(),
          name: inputValueRef.current,
        },
      });
    },
    ON_CHANGE_TIME: (time: string) => {
      setState({time});
    },
    ON_PRESS_KEY_CAP: (keyCap: IKeyCap) => {
      if (keyCap.type === KeyCapType.SUBMIT) {
        return handlers.ON_SUBMIT();
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
    },
    ON_SUBMIT: async () => {
      if (state.cost === 0) {
        return;
      }

      await addTransaction({
        categoryId,
        ledgerId,
        cost: state.cost,
        note: state.note,
        subCategoryId: state.selectedSubCategoryId!,
        time: state.time,
        type: category?.type,
      });
      fetchApplicationData();
      navigation.goBack();
    },
  };

  return {
    handlers,
    state,
    inputRef,
    category,
  };
};
