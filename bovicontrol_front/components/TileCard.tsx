import { View, Text, TouchableOpacity } from 'react-native';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';
import { ReactNode } from 'react';

type Props = {
  title: string;
  color?: 'primary' | 'tan' | 'brown';
  icon?: ReactNode;
  onPress?: () => void;
};

export function TileCard({ title, color = 'tan', icon, onPress }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  const palette: Record<'primary' | 'tan' | 'brown', string> = {
    primary: c.primary,
    tan: c.tan,
    brown: c.brown,
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }} activeOpacity={0.9}>
      <View style={{ backgroundColor: palette[color], borderRadius: 16, height: 108, padding: 14, justifyContent: 'space-between' }}>
        {icon}
        <Text style={{ color: '#fff', fontWeight: '700' }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default TileCard;

