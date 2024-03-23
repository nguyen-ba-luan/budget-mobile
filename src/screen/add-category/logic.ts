import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useMergingState from '../../hook/useMergingState';
import {RootStackParamList} from '../../navigation';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useRef} from 'react';
import {TextInput} from 'react-native';

export enum InputType {
  SUB_CATEGORY = 'SUB_CATEGORY',
  NAME = 'NAME',
}

export const useLogic = () => {
  const [state, setState] = useMergingState({
    name: '',
    subCategoryList: [],
    inputType: '' as InputType,
    inputValue: '',
  });

  const inputRef = useRef<TextInput>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'AddLedger'>>();

  const handlers = {
    ON_SELECT_COLOR: () => {
      navigation.navigate('ChooseColor', {
        previousScreen: route?.name,
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
    ON_SUBMIT_EDITING: () => {
      if (!state.inputValue || state.inputType === InputType.NAME) {
        return;
      }
    },
    ON_SUBMIT: () => {
      navigation.goBack();
    },
  };

  return {
    state,
    handlers,
    inputRef,
  };
};
