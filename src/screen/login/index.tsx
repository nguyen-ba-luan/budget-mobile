import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {supabase} from '../../../App';
import {useRootStore} from '../../store';
import {Alert} from 'react-native';
import {AuthParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const Login = ({
  navigation,
}: NativeStackScreenProps<AuthParamList, 'Login'>) => {
  const [email, setEmail] = useState(__DEV__ ? 'rotationba@gmail.com' : '');
  const [password, setPassword] = useState(__DEV__ ? 'abcd1234' : '');

  const {setToken, setGlobalLoading} = useRootStore();

  const onLogin = useCallback(async () => {
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
  }, [setToken, email, password]);

  const onSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Budget</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onLogin} />
      <Button title="SignUp" onPress={onSignUp} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
    gap: 20,
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
    marginHorizontal: 20,
    paddingHorizontal: 20,
    fontSize: 16,
  },
});
