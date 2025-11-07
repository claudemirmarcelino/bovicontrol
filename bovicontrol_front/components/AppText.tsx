import { Text, TextProps } from 'react-native';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';

type Variant = 'titleXL' | 'title' | 'body' | 'label';

type Props = TextProps & {
  variant?: Variant;
};

const variantStyle: Record<Variant, any> = {
  titleXL: { fontSize: 28, fontWeight: '700' },
  title: { fontSize: 22, fontWeight: '700' },
  body: { fontSize: 16, fontWeight: '400' },
  label: { fontSize: 14, fontWeight: '500' },
};

export function AppText({ variant = 'body', style, ...rest }: Props) {
  const scheme = useColorScheme() ?? 'light';
  return (
    <Text
      {...rest}
      style={[{ color: Colors[scheme].text }, variantStyle[variant], style]}
    />
  );
}

export default AppText;

