import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {supabase} from '../../../App';
import {AuthParamList} from '../../navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRootStore} from '../../store';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';

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
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Create Account</Text>
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
        onSubmitEditing={onSignUp}
      />
      <TouchableOpacity onPress={onSignUp} style={styles.btn}>
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
