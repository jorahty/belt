import { useRef, useState } from 'react';
import { View, Text } from 'react-native';

import { socket } from '../../../socket';

export default function Dial() {
  const [isPressed, setIsPressed] = useState(false);
  const init = useRef(0);
  const [displacement, setDisplacement] = useState(0);

  const onDialDown = (y: number) => {
    setIsPressed(true);
    init.current = y;
    socket.volatile.emit('i');
  };

  const onDialMove = (y: number) => {
    const delta = Math.round(y - init.current);
    socket.volatile.emit('d', delta);
    setDisplacement(delta);
  };

  function wrapAround(displacement: number): number {
    if (displacement < 0) return 190 - (Math.abs(0 - displacement) % 190);
    return displacement % 190;
  }

  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={({ nativeEvent: { pageY } }) => onDialDown(pageY)}
      onResponderMove={({ nativeEvent: { pageY } }) => onDialMove(pageY)}
      onResponderRelease={() => setIsPressed(false)}
      style={{
        width: 100,
        backgroundColor: isPressed ? '#49a581' : '#6f8ae4',
        borderRadius: 20,
        alignItems: 'center',
      }}>
      {Array.from({ length: 8 }, (_, index) => (
        <View
          key={index}
          style={{
            width: 50,
            height: 10,
            borderRadius: 100,
            backgroundColor: '#fff',
            position: 'absolute',
            top: 20 + wrapAround(displacement + 24 * index),
          }}
        />
      ))}
    </View>
  );
}
