import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import AppNavigation from './src/navigation';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Database} from './src/supabase';
import {View} from 'react-native';
import {useRootStore} from './src/store';
import {CommonSelector} from './src/store/common.store';

const supabaseUrl = 'https://teplpgfdefrpawmktqxa.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcGxwZ2ZkZWZycGF3bWt0cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMDMwMDQsImV4cCI6MjAyNzg3OTAwNH0.3zjAz5rXijhWxe0GXJ6watV4C6VeRpjTRVNTjoksSJg';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {fetch: fetch.bind(globalThis)},
});

function App(): React.JSX.Element {
  const loading = useRootStore(CommonSelector.selectGlobalLoading);
  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#ffffff',
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppNavigation />
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} color={'white'} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#0003',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
