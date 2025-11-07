import { TouchableOpacity } from 'react-native';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export function Fab({ onPress }: { onPress: () => void }) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ position: 'absolute', right: 20, bottom: 20, backgroundColor: c.primary, width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 10, elevation: 6 }}
    >
      <Ionicons name="add" size={28} color={c.onPrimary} />
    </TouchableOpacity>
  );
}

export default Fab;

