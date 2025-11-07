import Screen from '@/components/Screen';
import { AppText } from '@/components/AppText';
import { AppInput } from '@/components/AppInput';
import { AppButton } from '@/components/AppButton';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <Screen>
      <AppText variant="title">BoviControl</AppText>
      <AppText variant="label" style={{ marginTop: 4, marginBottom: 16 }}>Acesse sua conta</AppText>
      <AppInput label="Email ou usuário" value={email} onChangeText={setEmail} placeholder="seu@email" />
      <AppInput label="Senha" value={senha} onChangeText={setSenha} placeholder="********" secureTextEntry />
      <AppButton
        label="Entrar"
        onPress={async () => {
          try {
            const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080'}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username: email, password: senha }),
            });
            if (!res.ok) throw new Error('Credenciais inválidas');
            const data = await res.json();
            await AsyncStorage.setItem('authToken', data.token || 'dev-token');
            router.replace('/(tabs)');
          } catch (e) {
            alert((e as Error).message);
          }
        }}
      />
      <Link href="#" style={{ marginTop: 14 }}>Esqueci minha senha</Link>
      <Link href="#" style={{ marginTop: 8 }}>Criar conta</Link>
    </Screen>
  );
}

