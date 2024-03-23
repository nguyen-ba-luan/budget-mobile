import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleProp,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import AppNavigation from './src/navigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: '#ffffff',
    flex: 1,
  };

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
