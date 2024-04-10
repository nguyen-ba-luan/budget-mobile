import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  useController,
  useFormContext,
  UseControllerProps,
} from 'react-hook-form';
import {capitalizeFirstLetter} from '../util';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  defaultValue?: string;
}
export const TextInput = (props: TextInputProps) => {
  const {name} = props;

  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
};

const ControlledInput = (props: TextInputProps) => {
  const {name, rules, defaultValue, ...inputProps} = props;

  const {field, formState} = useController({name, rules, defaultValue});

  const errorMessage = formState?.errors?.[name]?.message as string;
  const touched = formState?.touchedFields?.[name];
  const isSubmitted = formState?.isSubmitted;

  return (
    <View style={styles.container}>
      <RNTextInput
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
      />
      {!!errorMessage && (touched || isSubmitted) && (
        <Text style={styles.errorMessage}>
          {capitalizeFirstLetter(errorMessage)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    gap: 6,
  },
  errorMessage: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
  },
});
