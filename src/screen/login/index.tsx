import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {supabase} from '../../../App';
import {useRootStore} from '../../store';
import {Alert} from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('rotationba@gmail.com');
  const [password, setPassword] = useState('abcd1234');

  const {setToken} = useRootStore();

  const onLogin = useCallback(async () => {
    try {
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
    }
  }, [setToken, email, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Budget</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={onLogin} />
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
