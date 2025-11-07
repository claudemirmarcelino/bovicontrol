import { useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    })();
  }, []);
  return null;
}

