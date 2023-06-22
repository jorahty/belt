import { useRef, useState } from 'react';
import { SafeAreaView, View, Pressable, Text } from 'react-native';

import { socket } from '../socket';

export default function Controls() {
  const [isPressed, setIsPressed] = useState(false);
  const init = useRef(0);

  const startBoost = () => {
    setIsPressed(true);
    socket.volatile.emit('b');
  };

  const stopBoost = () => {
    setIsPressed(false);
    socket.volatile.emit('B');
  };

  const onDialDown = (y: number) => {
    init.current = y;
    socket.volatile.emit('i');
  };

  const onDialMove = (y: number) => {
    const delta = Math.round(y - init.current);
    socket.volatile.emit('r', delta);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#5a4e81' }}>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          gap: 10,
          height: 280,
          borderTopWidth: 1.5,
        }}>
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={({ nativeEvent: { pageY } }) => onDialDown(pageY)}
          onResponderMove={({ nativeEvent: { pageY } }) => onDialMove(pageY)}
          style={{
            width: 100,
            backgroundColor: '#5589aa',
            padding: 30,
            borderRadius: 20,
            borderWidth: 1.5,
          }}
        />
        <Pressable
          onPressIn={startBoost}
          onTouchStart={startBoost}
          onPressOut={stopBoost}
          onTouchEnd={stopBoost}
          style={{
            flex: 1,
            backgroundColor: isPressed ? '#b875f7' : '#5589aa',
            padding: 30,
            borderRadius: 20,
            borderWidth: 1.5,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
