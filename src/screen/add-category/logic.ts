import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useMergingState from '../../hook/useMergingState';
import {RootStackParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect, useRef} from 'react';
import {TextInput} from 'react-native';
import {
  IBudget,
  IFullLedgerCategory,
  ISubCategory,
  LedgerCategoryType,
  PeriodType,
} from '../../constant';
import {generateUUID} from '../../util';

export enum InputType {
  SUB_CATEGORY = 'SUB_CATEGORY',
  NAME = 'NAME',
  BUDGET = 'BUDGET',
}

export const useLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddCategory'>>();
  const category = route?.params?.category;

  const [state, setState] = useMergingState({
    name: category?.name || '',
    subCategoryList: category?.subCategoryList || ([] as ISubCategory[]),
    inputType: '' as InputType,
    inputValue: '',
    color: category?.color || 'yellow',
    type: category?.type || LedgerCategoryType.EXPENSES,
    budget:
      category?.budget ||
      ({
        cost: 0,
        period: PeriodType.MONTHLY,
      } as IBudget),
  });

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!route.params?.color) {
      return;
    }

    setState({color: route.params?.color});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.color]);

  useEffect(() => {
    if (!route.params?.budget) {
      return;
    }

    setState({budget: route.params?.budget, inputType: '' as InputType});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.budget]);

  const handlers = {
    ON_SELECT_COLOR: () => {
      navigation.navigate('ChooseColor', {
        previousScreen: route?.name,
      });
    },
    ON_CHANGE_BUDGET: () => {
      setState({inputType: InputType.BUDGET});

      navigation.navigate('AddBudget', {
        previousScreen: route?.name,
        budget: state.budget,
      });
    },
    ON_ADD_MORE_SUB_CATEGORY: () => {
      inputRef.current?.focus();
      setState({inputType: InputType.SUB_CATEGORY, inputValue: ''});
    },
    ON_CHANGE_NAME: () => {
      inputRef.current?.focus();
      setState({inputType: InputType.NAME, inputValue: state.name});
    },
    ON_CHANGE_INPUT: (text: string) => {
      if (state.inputType === InputType.NAME) {
        setState({inputValue: text, name: text});

        return;
      }

      setState({inputValue: text});
    },
    ON_CHANGE_TYPE: (type: LedgerCategoryType) => {
      setState({type});
    },
    ON_SUBMIT_EDITING: () => {
      if (!state.inputValue || state.inputType === InputType.NAME) {
        return;
      }

      const newSubCategory: ISubCategory = {
        id: generateUUID(),
        name: state.inputValue,
      };

      setState(prevState => ({
        subCategoryList: [newSubCategory, ...prevState.subCategoryList],
      }));
    },
    ON_SUBMIT: () => {
      const newCategory: IFullLedgerCategory = {
        id: category?.id ?? generateUUID(),
        name: state.name || 'Category',
        type: state.type,
        color: state.color,
        icon: 'icon',
        budget: state.budget,
        subCategoryList: state.subCategoryList,
      };

      navigation.navigate({
        name: route?.params?.previousScreen,
        params: {
          categoryId: category?.id,
          category: newCategory,
        },
        merge: true,
      } as any);
    },
  };

  return {
    state,
    handlers,
    inputRef,
  };
};
