import { View, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { InfoCard } from '@/components/InfoCard';
import { Fab } from '@/components/Fab';
import { AppText } from '@/components/AppText';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type LoteInfo = {
  id: string;
  nome: string;
  quantidade: string;
  idadeMedia: string;
  localizacao: string;
  suplementacao?: string;
  tempoPasto?: string;
};

const lotes: LoteInfo[] = [
  {
    id: '1',
    nome: 'Lote 101',
    quantidade: '34/36',
    idadeMedia: '32 meses',
    localizacao: 'Fazenda Macial',
    suplementacao: 'Sal Mineralizado',
  },
  {
    id: '2',
    nome: 'Lote 102',
    quantidade: '20/20',
    idadeMedia: '32 meses',
    localizacao: 'Sitio Esperança',
    suplementacao: '17 dias',
  },
  {
    id: '3',
    nome: 'Lote 103',
    quantidade: '50/42',
    idadeMedia: '32 meses',
    localizacao: 'Chácara Baratin',
    tempoPasto: '90 dias',
  },
  {
    id: '4',
    nome: 'Lote 201',
    quantidade: '28/30',
    idadeMedia: '24 meses',
    localizacao: 'Fazenda Macial',
    tempoPasto: '90 dias',
  },
];

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
      <Ionicons name={icon as any} size={18} color={c.brown} />
      <AppText variant="body" style={{ flex: 1 }}>{label}:</AppText>
      <AppText variant="body" style={{ fontWeight: '600' }}>{value}</AppText>
    </View>
  );
}

export default function LotesScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Header title="Lotes" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 90 }}>
          {lotes.map((lote) => (
            <InfoCard key={lote.id} title={lote.nome}>
              <InfoRow icon="paw" label="Quantidade de Animais" value={lote.quantidade} />
              <InfoRow icon="calendar" label="Idade Média" value={lote.idadeMedia} />
              <InfoRow icon="location" label="Localização do Lote" value={lote.localizacao} />
              {lote.suplementacao ? (
                <InfoRow icon="water" label="Suplementação com Sal" value={lote.suplementacao} />
              ) : null}
              {lote.tempoPasto ? (
                <InfoRow icon="time" label="Tempo no Pasto" value={lote.tempoPasto} />
              ) : null}
            </InfoCard>
          ))}
        </ScrollView>
      <Fab onPress={() => {}} />
    </View>
  );
}

