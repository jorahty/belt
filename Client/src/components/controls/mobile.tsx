import { useRef, useState } from 'react';
import { SafeAreaView, View, Pressable } from 'react-native';

import { socket } from '../../socket';

export default function MobileControls() {
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
    socket.volatile.emit('d', delta);
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#45406b' }}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          gap: 20,
          height: 280,
        }}>
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={({ nativeEvent: { pageY } }) => onDialDown(pageY)}
          onResponderMove={({ nativeEvent: { pageY } }) => onDialMove(pageY)}
          style={{
            width: 100,
            backgroundColor: '#6f8ae4',
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
            backgroundColor: isPressed ? '#49a581' : '#6f8ae4',
            padding: 30,
            borderRadius: 20,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
