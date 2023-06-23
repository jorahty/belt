import { useRef, useState } from 'react';
import { View } from 'react-native';

import { socket } from '../../../socket';

export default function Dial() {
  const [isPressed, setIsPressed] = useState(false);
  const init = useRef(0);
  const [displacement, setDisplacement] = useState(0);

  const onDialDown = (y: number) => {
    setIsPressed(true);
    init.current = y;
  };

  const onDialMove = (y: number) => {
    const delta = y - init.current;
    if (delta !== 0) {
      socket.volatile.emit('r', delta * 0.01);
      setDisplacement(displacement + delta);
      init.current = y;
    }
  };

  const onDialUp = () => {
    setIsPressed(false);
  };

  function wrapAround(x: number, min: number, max: number): number {
    if (x < 0) return min + max - (Math.abs(0 - x) % max);
    return min + (x % max);
  }

  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={({ nativeEvent: { pageY } }) => onDialDown(pageY)}
      onResponderMove={({ nativeEvent: { pageY } }) => onDialMove(pageY)}
      onResponderRelease={onDialUp}
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
            top: wrapAround(displacement + 24 * index, 20, 190),
          }}
        />
      ))}
    </View>
  );
}
