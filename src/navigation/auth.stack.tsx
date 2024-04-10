import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthParamList} from './type';
import Login from '../screen/login';
import SignUp from '../screen/signup';

export * from './type';

const Stack = createNativeStackNavigator<AuthParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
