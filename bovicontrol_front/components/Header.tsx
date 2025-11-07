import { View, Text } from 'react-native';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
};

export function Header({ title, showBack, onBack }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <View style={{ backgroundColor: c.primary, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      {showBack ? (
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={c.onPrimary} />
        </TouchableOpacity>
      ) : (
        <Ionicons name="paw" size={24} color={c.onPrimary} />
      )}
      <Text style={{ color: c.onPrimary, fontSize: 20, fontWeight: '700', flex: 1 }}>{title}</Text>
    </View>
  );
}

export default Header;

