import { View, ScrollView } from 'react-native';
import { Header } from '@/components/Header';
import { Fab } from '@/components/Fab';
import { InfoCard } from '@/components/InfoCard';
import { AppText } from '@/components/AppText';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import { Image } from 'expo-image';

// Mock de animais - será substituído pela chamada ao backend
const animaisMock = [
  {
    id: '1',
    brinco: '12345',
    especie: 'Bovino',
    raca: 'Nelore',
    dataNascimento: '15/03/2022',
    peso: 350,
  },
  {
    id: '2',
    brinco: '67890',
    especie: 'Bovino',
    raca: 'Angus',
    dataNascimento: '20/05/2021',
    peso: 420,
  },
];

export default function AnimaisScreen() {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Header title="Animais" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 14, paddingBottom: 90 }}>
        {animaisMock.map((animal) => (
          <InfoCard key={animal.id} title={`Brinco: ${animal.brinco}`}>
            <AppText variant="body">Espécie: {animal.especie}</AppText>
            <AppText variant="body">Raça: {animal.raca}</AppText>
            <AppText variant="body">Data de Nascimento: {animal.dataNascimento}</AppText>
            {animal.peso && <AppText variant="body">Peso: {animal.peso} kg</AppText>}
          </InfoCard>
        ))}
        {animaisMock.length === 0 && (
          <AppText variant="body" style={{ textAlign: 'center', marginTop: 40 }}>
            Nenhum animal cadastrado ainda
          </AppText>
        )}
      </ScrollView>
      <Fab onPress={() => router.push('/animais/cadastro')} />
    </View>
  );
}



