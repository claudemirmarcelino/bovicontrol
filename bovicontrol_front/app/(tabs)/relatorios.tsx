import { View } from 'react-native';
import { Header } from '@/components/Header';
import { AppText } from '@/components/AppText';
import { AppButton } from '@/components/AppButton';
import { InfoCard } from '@/components/InfoCard';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';

export default function RelatoriosScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Header title="Relatórios" showBack onBack={() => router.back()} />
      <View style={{ flex: 1, padding: 16, gap: 16 }}>
          <View>
            <AppText variant="label" style={{ marginBottom: 8 }}>Período</AppText>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <View style={{ flex: 1, backgroundColor: c.card, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 }}>
                <AppText variant="body" style={{ textAlign: 'center' }}>Últimos 30 dias</AppText>
              </View>
              <View style={{ flex: 1, backgroundColor: c.surface, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10 }}>
                <AppText variant="body" style={{ textAlign: 'center' }}>Anual</AppText>
              </View>
            </View>
          </View>
          <View>
            <AppText variant="label" style={{ marginBottom: 8 }}>Lote</AppText>
            <View style={{ backgroundColor: c.surface, paddingVertical: 12, paddingHorizontal: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <AppText variant="body">Selecione um lote</AppText>
              <AppText variant="body">▼</AppText>
            </View>
          </View>
          <InfoCard title="Gasto por Animal">
            <View style={{ height: 150, backgroundColor: c.surface, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
              <AppText variant="body">Gráfico de Pizza</AppText>
            </View>
          </InfoCard>
          <View style={{ gap: 12 }}>
            <AppButton label="Exportar CSV" onPress={() => {}} />
            <AppButton label="Exportar PDF" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
}

