import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useMergingState from '../../hook/useMergingState';
import {RootStackParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRootStore} from '../../store';
import {generateUUID} from '../../util';
import {CURRENCY, ILedgerCategory} from '../../constant';
import {useEffect, useRef} from 'react';
import {TextInput} from 'react-native';

export const useLogic = () => {
  const [state, setState] = useMergingState({
    name: '',
    categoryList: [] as ILedgerCategory[],
    color: 'yellow',
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddLedger'>>();

  const inputRef = useRef<TextInput>(null);

  const {addLedger} = useRootStore();

  useEffect(() => {
    if (!route.params?.color) return;

    setState({color: route.params?.color});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params?.color]);

  const handlers = {
    ON_SELECT_COLOR: () => {
      navigation.navigate('ChooseColor', {
        previousScreen: route?.name,
      });
    },
    ON_ADD_CATEGORY: () => {
      navigation.navigate('AddCategory', {
        callback(category) {
          setState(prevState => ({
            categoryList: [...prevState.categoryList, category],
          }));
        },
      });
    },
    ON_EDIT_CATEGORY: (categoryId: number) => () => {
      navigation.navigate('AddCategory', {
        categoryId,
        callback(category) {
          setState(prevState => ({
            categoryList: prevState?.categoryList?.map(item =>
              item?.id === categoryId ? category : item,
            ),
          }));
        },
      });
    },
    ON_CHANGE_NAME: () => {
      inputRef.current?.focus();
    },
    ON_CHANGE_INPUT: (text: string) => {
      setState({name: text});
    },
    ON_SUBMIT: () => {
      addLedger({
        id: generateUUID(),
        name: state.name || 'Ledger',
        categoryIdList: state.categoryList?.map(item => item?.id),
        color: 'color',
        currency: CURRENCY[1],
        icon: 'icon',
      });
      navigation.goBack();
    },
  };

  return {
    state,
    handlers,
    inputRef,
  };
};
