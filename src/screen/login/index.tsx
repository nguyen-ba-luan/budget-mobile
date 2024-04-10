import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {supabase} from '../../../App';
import {useRootStore} from '../../store';
import {Alert} from 'react-native';
import {AuthParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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

const Login = ({
  navigation,
}: NativeStackScreenProps<AuthParamList, 'Login'>) => {
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: __DEV__ ? 'rotationba@gmail.com' : '',
      password: __DEV__ ? 'abcd1234' : '',
    },
  });

  const {setToken, setGlobalLoading} = useRootStore();

  const onSubmit = useCallback(
    async ({email, password}: FormValues) => {
      try {
        setGlobalLoading(true);
        const res = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (res.data?.session?.access_token) {
          setToken(res.data?.session?.access_token);
          return;
        }

        Alert.alert(res.error?.name || 'Error', res.error?.message);
      } catch (error) {
        Alert.alert('Error', JSON.stringify(error));
      } finally {
        setGlobalLoading(false);
      }
    },
    [setToken],
  );

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={'handled'}
      contentContainerStyle={styles.container}
      enableAutomaticScroll>
      <Text style={styles.label}>Budget</Text>
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
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.rowSignUp}>
        <Text style={styles.notAccountYetText}>{"Don't have an account?"}</Text>
        <TouchableOpacity
          onPress={onSignUp}
          style={[styles.btn, styles.btnSignUp]}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 20,
    paddingTop: 100,
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
    fontSize: 16,
  },
});
