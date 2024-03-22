import {useNavigation} from '@react-navigation/native';
import useMergingState from '../../hook/useMergingState';
import {RootStackParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const useLogic = () => {
  const [state, setState] = useMergingState({
    name: '',
    categoryList: [],
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlers = {
    ON_SELECT_COLOR: () => {
      // console.log('ON_SELECT_COLOR');
    },
    ON_ADD_CATEGORY: () => {
      navigation.navigate('AddCategory', {});
    },
    ON_EDIT_CATEGORY: () => {
      navigation.navigate('AddCategory', {});
    },
    ON_SUBMIT: () => {
      navigation.goBack();
    },
  };

  return {
    state,
    handlers,
  };
};
