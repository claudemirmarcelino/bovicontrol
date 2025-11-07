import { View } from 'react-native';
import Screen from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { TileCard } from '@/components/TileCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function HomeScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <Screen>
      <AppText variant="title">BoviControl</AppText>
      <View style={{ height: 16 }} />
      <View style={{ gap: 14 }}>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <TileCard title="Lotes" color="primary" onPress={() => router.push('/lotes')} />
          <TileCard title="Animais" color="tan" onPress={() => router.push('/animais')} />
        </View>
        <View style={{ flexDirection: 'row', gap: 14 }}>
          <TileCard title="Eventos" color="brown" onPress={() => router.push('/eventos')} />
          <TileCard title="Relatórios" color="tan" onPress={() => router.push('/relatorios')} />
        </View>
      </View>
    </Screen>
  );
}
