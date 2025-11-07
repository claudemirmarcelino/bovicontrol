import { useState } from 'react';
import { View, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Header } from '@/components/Header';
import { AppText } from '@/components/AppText';
import { AppInput } from '@/components/AppInput';
import { AppButton } from '@/components/AppButton';
import { CameraView } from '@/components/CameraView';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';

export default function CadastroAnimal() {
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  
  // Campos do formulário
  const [brinco, setBrinco] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [especie, setEspecie] = useState('');
  const [raca, setRaca] = useState('');
  const [peso, setPeso] = useState('');
  const [loteId, setLoteId] = useState('');

  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  const handlePhotoTaken = (uri: string) => {
    setPhotoUri(uri);
    setShowCamera(false);
  };

  const convertImageToBase64 = async (uri: string): Promise<string> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.includes(',') ? result.split(',')[1] : result;
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      throw new Error('Erro ao processar a imagem');
    }
  };

  const handleSubmit = async () => {
    if (!brinco || !dataNascimento || !especie || !raca) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('authToken');
      const apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

      // Validação da URL da API
      if (!apiUrl || apiUrl.includes('localhost')) {
        Alert.alert(
          'Erro de Configuração',
          'A URL da API não está configurada corretamente.\n\n' +
          'Para dispositivos móveis, você precisa usar o IP da sua máquina na rede local.\n\n' +
          'Exemplo: http://192.168.1.100:8080\n\n' +
          'Configure a variável EXPO_PUBLIC_API_URL no arquivo .env',
          [{ text: 'OK' }]
        );
        setLoading(false);
        return;
      }

      let fotoBase64 = null;
      if (photoUri) {
        fotoBase64 = await convertImageToBase64(photoUri);
      }

      const payload: any = {
        brinco,
        dataNascimento,
        especie,
        raca,
        peso: peso ? parseFloat(peso) : null,
        loteId: loteId ? parseInt(loteId) : null,
      };

      if (fotoBase64) {
        payload.fotoBase64 = fotoBase64;
      }

      const response = await fetch(`${apiUrl}/animais`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'Erro ao cadastrar animal';
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        } catch (e) {
          // Se não conseguir ler o erro, usa a mensagem padrão
        }
        throw new Error(errorMessage);
      }

      Alert.alert('Sucesso', 'Animal cadastrado com sucesso!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      let errorMessage = 'Erro ao cadastrar animal';
      
      if (error.message) {
        if (error.message.includes('Network request failed') || error.message.includes('fetch')) {
          errorMessage = 
            'Erro de conexão com o servidor.\n\n' +
            'Verifique:\n' +
            '• Se o backend está rodando\n' +
            '• Se a URL da API está correta\n' +
            '• Se o dispositivo está na mesma rede\n\n' +
            `URL tentada: ${process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080'}`;
        } else {
          errorMessage = error.message;
        }
      }
      
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (showCamera) {
    return (
      <CameraView
        onPhotoTaken={handlePhotoTaken}
        onCancel={() => setShowCamera(false)}
      />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Header title="Cadastrar Animal" showBack onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={{ padding: 16, gap: 16 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={true}
      >
        {/* Foto do Animal */}
        <View>
          <AppText variant="label" style={{ marginBottom: 8 }}>
            Foto do Animal
          </AppText>
          {photoUri ? (
            <View style={{ position: 'relative' }}>
              <Image
                source={{ uri: photoUri }}
                style={{
                  width: '100%',
                  height: 200,
                  borderRadius: 10,
                  backgroundColor: c.surface,
                }}
                contentFit="cover"
              />
              <AppButton
                label="Trocar foto"
                variant="secondary"
                onPress={() => setPhotoUri(null)}
                style={{ marginTop: 8 }}
              />
            </View>
          ) : (
            <AppButton
              label="Tirar foto"
              onPress={() => setShowCamera(true)}
              style={{ height: 200, justifyContent: 'center' }}
            />
          )}
        </View>

        {/* Campos do formulário */}
        <AppInput
          label="Brinco *"
          value={brinco}
          onChangeText={setBrinco}
          placeholder="Ex: 12345"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AppInput
          label="Data de Nascimento *"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          placeholder="DD/MM/AAAA"
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AppInput
          label="Espécie *"
          value={especie}
          onChangeText={setEspecie}
          placeholder="Ex: Bovino"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <AppInput
          label="Raça *"
          value={raca}
          onChangeText={setRaca}
          placeholder="Ex: Nelore"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <AppInput
          label="Peso (kg)"
          value={peso}
          onChangeText={setPeso}
          placeholder="Ex: 350.5"
          keyboardType="decimal-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AppInput
          label="ID do Lote"
          value={loteId}
          onChangeText={setLoteId}
          placeholder="Ex: 1"
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{ height: 20 }} />

        {loading ? (
          <ActivityIndicator size="large" color={c.primary} />
        ) : (
          <AppButton label="Cadastrar Animal" onPress={handleSubmit} />
        )}
      </ScrollView>
    </View>
  );
}

