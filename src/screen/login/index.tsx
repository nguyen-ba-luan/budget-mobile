import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {supabase} from '../../../App';
import {useRootStore} from '../../store';
import {Alert} from 'react-native';
import {AuthParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

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
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableAutomaticScroll>
      <Text style={styles.label}>Budget</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        returnKeyType="go"
        onSubmitEditing={onLogin}
      />
      <TouchableOpacity onPress={onLogin} style={styles.btn}>
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
  btn: {
    backgroundColor: 'royalblue',
    height: 50,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 20,
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
