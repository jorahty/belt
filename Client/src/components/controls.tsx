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
    <SafeAreaView style={{ backgroundColor: '#ca9' }}>
      <View style={{ padding: 20, flexDirection: 'row', gap: 20, height: 300 }}>
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={({ nativeEvent: { pageY } }) => onDialDown(pageY)}
          onResponderMove={({ nativeEvent: { pageY } }) => onDialMove(pageY)}
          style={{
            width: 100,
            backgroundColor: '#67f',
            padding: 30,
            borderRadius: 20,
          }}
        />
        <Pressable
          onPressIn={startBoost}
          onTouchStart={startBoost}
          onPressOut={stopBoost}
          onTouchEnd={stopBoost}
          style={{
            flex: 1,
            backgroundColor: isPressed ? '#a7a' : '#67f',
            padding: 30,
            borderRadius: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
