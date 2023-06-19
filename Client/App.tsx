import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { socket } from './socket';

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
      <Text>{error}</Text>
      <Text>{rand}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
