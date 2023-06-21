import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { socket } from './src/socket';

export default function App() {
  const [error, setError] = useState('');
  const [rand, setRand] = useState(0);

  useEffect(() => {
    socket.on('connect', () => {
      setError('');
    });

    socket.on('connect_error', (err: any) => {
      setError(err.message);
    });

    socket.on('update', (n) => {
      setRand(n);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>{error}</Text>
      <Text style={{ color: '#fff' }}>{rand}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
