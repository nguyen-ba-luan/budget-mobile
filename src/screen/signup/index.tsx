import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {supabase} from '../../../App';
import {AuthParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRootStore} from '../../store';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {FormProvider, useForm} from 'react-hook-form';
import {TextInput} from '../../component';

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
  })
  .required();

type FormValues = {
  email: string;
  password: string;
};

const SignUp = ({
  navigation,
}: NativeStackScreenProps<AuthParamList, 'SignUp'>) => {
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
    shouldFocusError: true,
  });
  const {setToken, setGlobalLoading} = useRootStore();

  const onSubmit = useCallback(
    async ({email, password}: FormValues) => {
      try {
        setGlobalLoading(true);
        const res = await supabase.auth.signUp({
          email,
          password,
        });

        if (res.error) {
          return Alert.alert(res.error?.name || 'Error', res.error?.message);
        }

        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', JSON.stringify(error));
      } finally {
        setGlobalLoading(false);
      }
    },
    [setToken],
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps={'handled'}>
      <Text style={styles.label}>Create Account</Text>
      <FormProvider {...methods}>
        <TextInput
          name="email"
          style={styles.input}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          name="password"
          style={styles.input}
          placeholder="Enter password"
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={methods.handleSubmit(onSubmit)}
        />
      </FormProvider>
      <TouchableOpacity
        onPress={methods.handleSubmit(onSubmit)}
        style={styles.btn}>
        <Text style={styles.btnText}>SignUp</Text>
      </TouchableOpacity>
      <View style={styles.rowSignUp}>
        <Text style={styles.notAccountYetText}>
          {'Already have an account?'}
        </Text>
        <TouchableOpacity
          onPress={navigation.goBack}
          style={[styles.btn, styles.btnSignUp]}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
    gap: 20,
    paddingHorizontal: 20,
  },
  label: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'whitesmoke',
    alignSelf: 'stretch',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  btn: {
    backgroundColor: 'royalblue',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  btnSignUp: {
    backgroundColor: 'salmon',
  },
  rowSignUp: {
    alignSelf: 'stretch',
    gap: 10,
  },
  notAccountYetText: {
    marginHorizontal: 20,
    fontSize: 16,
  },
});
