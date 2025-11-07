import { View, Text } from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { ReactNode } from 'react';

export function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ backgroundColor: c.card, borderRadius: 16, padding: 16, gap: 8, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 6, elevation: 3 }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: c.text }}>{title}</Text>
      <View>{children}</View>
    </View>
  );
}

export default InfoCard;

