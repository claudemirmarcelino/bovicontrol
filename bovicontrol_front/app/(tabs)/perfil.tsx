import { Header } from '@/components/Header';
import { AppText } from '@/components/AppText';
import { View } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function PerfilScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Header title="Perfil" />
      <View style={{ flex: 1, padding: 16 }}>
        <AppText variant="title">Perfil do Usuário</AppText>
        <AppText variant="body" style={{ marginTop: 16 }}>Aqui ficará o perfil do produtor</AppText>
      </View>
    </View>
  );
}

