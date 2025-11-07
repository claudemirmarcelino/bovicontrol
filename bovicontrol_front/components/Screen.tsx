import { ReactNode } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';

type ScreenProps = {
  children: ReactNode;
  padded?: boolean;
};

export function Screen({ children, padded = true }: ScreenProps) {
  const scheme = useColorScheme() ?? 'light';
  const bg = Colors[scheme].background;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <View style={{ flex: 1, paddingHorizontal: padded ? 16 : 0, paddingVertical: padded ? 12 : 0 }}>
        {children}
      </View>
    </SafeAreaView>
  );
}

export default Screen;

