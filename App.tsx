import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import AppNavigation from './src/navigation';
import {createClient} from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://teplpgfdefrpawmktqxa.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlcGxwZ2ZkZWZycGF3bWt0cXhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMDMwMDQsImV4cCI6MjAyNzg3OTAwNH0.3zjAz5rXijhWxe0GXJ6watV4C6VeRpjTRVNTjoksSJg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#ffffff',
    flex: 1,
  };

  useEffect(() => {
    (async () => {
      const {data, error} = await supabase.from('currencies').insert({
        id: 2,
        symbol: '$',
        name: 'USD',
      });
      console.log({data, error});
    })();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppNavigation />
    </SafeAreaView>
  );
}

export default App;
