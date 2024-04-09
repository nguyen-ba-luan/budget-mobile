import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {supabase} from '../../../App';
import {AuthParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRootStore} from '../../store';

const SignUp = ({
  navigation,
}: NativeStackScreenProps<AuthParamList, 'SignUp'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {setToken, setGlobalLoading} = useRootStore();

  const onSignUp = useCallback(async () => {
    try {
      setGlobalLoading(true);
      const res = await supabase.auth.signUp({
        email,
        password,
      });
      console.log({res});

      if (res.error) {
        return Alert.alert(res.error?.name || 'Error', res.error?.message);
      }

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    } finally {
      setGlobalLoading(false);
    }
  }, [setToken, email, password]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Create Account</Text>
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
      <Button title="SignUp" onPress={onSignUp} />
    </View>
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
