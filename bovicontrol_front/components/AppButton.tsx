import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';

type Variant = 'primary' | 'secondary' | 'danger';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  style?: ViewStyle;
  disabled?: boolean;
};

export function AppButton({ label, onPress, variant = 'primary', style, disabled }: Props) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  const base: ViewStyle = {
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  };

  const variants: Record<Variant, ViewStyle> = {
    primary: { backgroundColor: c.primary },
    secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: c.primary },
    danger: { backgroundColor: c.danger },
  };

  const textColor = variant === 'secondary' ? c.primary : c.onPrimary;

  return (
    <TouchableOpacity disabled={disabled} style={[base, variants[variant], style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={{ color: textColor, fontSize: 16, fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );
}

export default AppButton;

