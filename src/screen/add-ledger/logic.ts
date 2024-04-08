import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useMergingState from '../../hook/useMergingState';
import {RootStackParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {LedgerSelector, useRootStore} from '../../store';
import {generateUUID} from '../../util';
import {CURRENCY, IFullLedgerCategory} from '../../constant';
import {useEffect, useRef} from 'react';
import {Alert, TextInput} from 'react-native';
import {
  addCategoryList,
  addLedger,
  addSubCategoryList,
  getApplicationData,
} from '../../service/api';

export const useLogic = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddLedger'>>();
  const ledgerId = route?.params?.ledgerId;

  const ledgerDetail = useRootStore(LedgerSelector.selectLedgerById(ledgerId));

  const [state, setState] = useMergingState({
    name: ledgerDetail?.name || '',
    categoryList: ledgerDetail?.categoryList || ([] as IFullLedgerCategory[]),
    color: ledgerDetail?.color || 'yellow',
    icon: ledgerDetail?.icon || 'smile-circle',
  });

  const inputRef = useRef<TextInput>(null);

  const {deleteLedger} = useRootStore();

  useEffect(() => {
    if (!route.params?.color) {
      return;
    }

    setState({color: route.params?.color});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.color]);

  useEffect(() => {
    if (!route.params?.icon) {
      return;
    }

    setState({icon: route.params?.icon});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.icon]);

  useEffect(() => {
    if (!route.params?.category) {
      return;
    }

    setState(prevState => {
      const isEditing =
        prevState.categoryList?.findIndex(
          item =>
            item?.id === route.params?.category?.id &&
            item?.temporaryId === route.params?.category?.temporaryId,
        ) > -1;

      return {
        categoryList: isEditing
          ? prevState.categoryList?.map(category =>
              category?.id === route.params?.category?.id &&
              category?.temporaryId === route.params?.category?.temporaryId
                ? {...category, ...route.params?.category}
                : category,
            )
          : [...prevState.categoryList, route.params?.category!],
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.category]);

  const handlers = {
    ON_SELECT_COLOR: () => {
      navigation.navigate('ChooseColor', {
        previousScreen: route?.name,
      });
    },
    ON_SELECT_ICON: () => {
      navigation.navigate('ChooseIcon', {
        previousScreen: route?.name,
        icon: state.icon,
      });
    },
    ON_ADD_CATEGORY: () => {
      navigation.navigate('AddCategory', {
        previousScreen: route.name,
      });
    },
    ON_EDIT_CATEGORY: (category: IFullLedgerCategory) => () => {
      navigation.navigate('AddCategory', {
        category,
        previousScreen: route.name,
      });
    },
    ON_CHANGE_NAME: () => {
      inputRef.current?.focus();
    },
    ON_CHANGE_INPUT: (text: string) => {
      setState({name: text});
    },
    ON_SUBMIT: async () => {
      const id = await addLedger({
        id: ledgerId || generateUUID(),
        name: state.name || 'Ledger',
        color: state.color,
        currency: CURRENCY[1],
        icon: state?.icon,
        categoryIdList: [],
      });

      const categories = await addCategoryList(state.categoryList, id!);

      for (let i = 0; i < state.categoryList.length; i++) {
        const category = state.categoryList[i];

        await addSubCategoryList(category.subCategoryList, categories?.[i]?.id);
      }

      await getApplicationData();
      navigation.goBack();
    },

    ON_DELETE_LEDGER: () => {
      if (!ledgerId) {
        return;
      }

      Alert.alert('Confirm', 'Are you sure?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteLedger(ledgerId);
            navigation.goBack();
          },
        },
      ]);
    },
  };

  return {
    state,
    handlers,
    inputRef,
    ledgerId,
  };
};
