import { View, TextInput, Text, TextInputProps } from 'react-native';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';

type Props = {
  label?: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  editable?: boolean;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder' | 'secureTextEntry' | 'style'>;

export function AppInput({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  secureTextEntry,
  keyboardType,
  autoCapitalize = 'sentences',
  autoCorrect = true,
  editable = true,
  ...rest
}: Props) {
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];
  
  return (
    <View style={{ marginBottom: 12 }}>
      {label ? (
        <Text style={{ marginBottom: 6, color: c.text, fontSize: 14, fontWeight: '500' }}>{label}</Text>
      ) : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={'#9BA1A6'}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={autoCorrect}
        editable={editable}
        returnKeyType="done"
        blurOnSubmit={true}
        textContentType="none"
        autoComplete="off"
        importantForAutofill="no"
        selectTextOnFocus={false}
        clearButtonMode="never"
        style={{
          height: 48,
          borderRadius: 10,
          paddingHorizontal: 14,
          backgroundColor: c.surface,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          color: c.text,
          fontSize: 16,
        }}
        {...rest}
      />
    </View>
  );
}

export default AppInput;

