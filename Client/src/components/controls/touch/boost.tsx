import { useState } from 'react';
import { Pressable, Text } from 'react-native';

import { socket } from '../../../socket';

export default function BoostButton() {
  const [isPressed, setIsPressed] = useState(false);

  const startBoost = () => {
    setIsPressed(true);
    socket.volatile.emit('b');
  };

  const stopBoost = () => {
    setIsPressed(false);
    socket.volatile.emit('B');
  };

  return (
    <Pressable
      onPressIn={startBoost}
      onTouchStart={startBoost}
      onPressOut={stopBoost}
      onTouchEnd={stopBoost}
      style={{
        flex: 1,
        backgroundColor: isPressed ? '#49a581' : '#6f8ae4',
        padding: 30,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: 48,
          fontWeight: '800',
        }}>
        B
      </Text>
    </Pressable>
  );
}
