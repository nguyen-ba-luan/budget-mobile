import {Alert, Button, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {supabase} from '../../../App';
import {useRootStore} from '../../store';

const Profile = () => {
  const {setToken} = useRootStore();

  const onSignOut = useCallback(async () => {
    try {
      const res = await supabase.auth.signOut();

      if (res.error) {
        Alert.alert(res.error?.name || 'Error', res.error?.message);

        return;
      }

      setToken('');
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    }
  }, [setToken]);

  return (
    <View style={styles.container}>
      <Button title="SignOut" onPress={onSignOut} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
