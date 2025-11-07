import { View, ScrollView } from 'react-native';
import Screen from '@/components/Screen';
import { Header } from '@/components/Header';
import { InfoCard } from '@/components/InfoCard';
import { Fab } from '@/components/Fab';
import { AppText } from '@/components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type EventoInfo = {
  id: string;
  tipo: string;
  descricao: string;
  periodo?: string;
};

const eventos: EventoInfo[] = [
  {
    id: '1',
    tipo: 'Amamentação',
    periodo: '8 meses',
  },
  {
    id: '2',
    tipo: 'Comunicação Semestral',
    descricao: 'Ver relatório',
  },
  {
    id: '3',
    tipo: 'Troca de Pasto',
    descricao: 'Agendar',
  },
];

export default function EventosScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Header title="Eventos" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 90 }}>
        {eventos.map((evento) => (
          <InfoCard key={evento.id} title={evento.tipo}>
            <AppText variant="body">{evento.periodo || evento.descricao}</AppText>
          </InfoCard>
        ))}
      </ScrollView>
      <Fab onPress={() => {}} />
    </View>
  );
}

