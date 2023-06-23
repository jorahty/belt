import { useRef, useState } from 'react';
import { View } from 'react-native';

import { socket } from '../../../socket';

export default function Dial() {
  const [isPressed, setIsPressed] = useState(false);
  const init = useRef(0);

  const onDialDown = (y: number) => {
    setIsPressed(true);
    init.current = y;
    socket.volatile.emit('i');
  };

  const onDialMove = (y: number) => {
    const delta = Math.round(y - init.current);
    socket.volatile.emit('d', delta);
  };

  return (
    <View
      onStartShouldSetResponder={() => true}
      onResponderGrant={({ nativeEvent: { pageY } }) => onDialDown(pageY)}
      onResponderMove={({ nativeEvent: { pageY } }) => onDialMove(pageY)}
      onResponderRelease={() => setIsPressed(false)}
      style={{
        width: 100,
        backgroundColor: isPressed ? '#49a581' : '#6f8ae4',
        padding: 30,
        borderRadius: 20,
      }}
    />
  );
}
