import { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraView as ExpoCameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppText } from './AppText';
import { AppButton } from './AppButton';

type Props = {
  onPhotoTaken: (uri: string) => void;
  onCancel: () => void;
};

export function CameraView({ onPhotoTaken, onCancel }: Props) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<ExpoCameraView>(null);
  const scheme = useColorScheme() ?? 'light';
  const c = Colors[scheme];

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <AppText variant="body" style={{ marginBottom: 16, textAlign: 'center' }}>
          Precisamos da sua permissão para usar a câmera
        </AppText>
        <AppButton label="Permitir câmera" onPress={requestPermission} />
        <AppButton label="Cancelar" variant="secondary" onPress={onCancel} style={{ marginTop: 12 }} />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        setPhoto(photo.uri);
      }
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <View style={styles.buttonRow}>
          <AppButton
            label="Usar foto"
            onPress={() => {
              onPhotoTaken(photo);
              setPhoto(null);
            }}
          />
          <AppButton
            label="Tirar outra"
            variant="secondary"
            onPress={() => setPhoto(null)}
            style={{ marginLeft: 12 }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ExpoCameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Ionicons name="close" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Ionicons name="camera-reverse" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </ExpoCameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: 40,
    backgroundColor: 'transparent',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});



