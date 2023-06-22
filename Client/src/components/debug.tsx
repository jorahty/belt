import { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { socket, socketEndpoint } from '../socket';

export default function Debug() {
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState('unset');
  const [side, setSide] = useState('unset');

  useEffect(() => {
    socket.on('connect', () => {
      setError('');
    });

    socket.on('connect_error', (err: any) => {
      setError(err.message);
    });

    socket.on('side', (s) => {
      setSide(s);
    });
  }, []);

  return visible ? (
    <Pressable onPress={() => setVisible(false)}>
      <Text>socketEndpoint: {socketEndpoint}</Text>
      {error ? <Text>error: {error}</Text> : <></>}
      <Text>side: {side}</Text>
    </Pressable>
  ) : (
    <></>
  );
}
