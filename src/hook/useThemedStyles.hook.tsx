import {
  useMemo,
  useContext,
  createContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  StyleSheet,
  TextStyle,
  ViewStyle,
  ImageStyle,
  Appearance,
} from 'react-native';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

type ThemedNamedStyles = Partial<ViewStyle | TextStyle | ImageStyle> & {
  dark?: Partial<ViewStyle | TextStyle | ImageStyle>;
};

type Styles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export type ThemedStyleDefinitions<T> = {
  [P in keyof T]: ThemedNamedStyles;
};

type Theme = 'light' | 'dark';

const ThemeContext = createContext<Theme>('light');

export const useTheme = () => useContext(ThemeContext);

export function useThemedStyles<T extends NamedStyles<T>>(
  styleDefinitions: ThemedStyleDefinitions<T>,
): Styles<T> {
  const theme = useTheme();

  const styles = useMemo(() => {
    const processedStyles: Styles<T> = {} as Styles<T>;

    Object.keys(styleDefinitions).forEach(key => {
      const {dark, ...baseStyle} = styleDefinitions[
        key as keyof T
      ] as ThemedNamedStyles;
      processedStyles[key as keyof T] = StyleSheet.create({
        [key]: {
          ...baseStyle,
          ...(theme === 'dark' && dark ? dark : {}),
        },
      })[key];
    });

    return processedStyles;
  }, [theme, styleDefinitions]);

  return styles;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const listener = Appearance.addChangeListener(({colorScheme}) => {
      setTheme(colorScheme);
    });

    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={theme!}>{children}</ThemeContext.Provider>
  );
};
