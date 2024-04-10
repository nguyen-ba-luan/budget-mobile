import {Alert, Button, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {supabase} from '../../../App';
import {useRootStore} from '../../store';
import {resetAllSlices} from '../../store/util';

const Profile = () => {
  const {setToken, setGlobalLoading} = useRootStore();

  const onSignOut = useCallback(async () => {
    try {
      setGlobalLoading(true);
      const res = await supabase.auth.signOut();

      if (res.error) {
        Alert.alert(res.error?.name || 'Error', res.error?.message);

        return;
      }
      resetAllSlices();
      setToken('');
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    } finally {
      setGlobalLoading(false);
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
