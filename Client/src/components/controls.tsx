import { useState } from 'react';
import { SafeAreaView, View, Pressable, Text } from 'react-native';

import { socket } from '../socket';

export default function Controls() {
  const [isPressed, setIsPressed] = useState(false);
  const [init, setInit] = useState({ x: 12, y: 35 });
  const [move, setMove] = useState({ x: 8, y: 24 });

  const startBoost = () => {
    setIsPressed(true);
    socket.emit('b');
  };

  const stopBoost = () => {
    setIsPressed(false);
    socket.emit('B');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#ca9' }}>
      <View style={{ padding: 20, flexDirection: 'row', gap: 20, height: 300 }}>
        <View
          onStartShouldSetResponder={() => true}
          onResponderGrant={({ nativeEvent }) => {
            setInit({
              x: nativeEvent.pageX,
              y: nativeEvent.pageY,
            });
          }}
          onResponderMove={({ nativeEvent }) => {
            setMove({
              x: nativeEvent.pageX,
              y: nativeEvent.pageY,
            });
          }}
          style={{
            width: 100,
            backgroundColor: '#67f',
            padding: 30,
            borderRadius: 20,
          }}>
          <Text selectable={false}>
            init: ({Math.round(init.x)}, {Math.round(init.y)})
          </Text>
          <Text selectable={false}>
            move: ({Math.round(move.x)}, {Math.round(move.y)})
          </Text>
        </View>
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
          }}>
          <Text>Boost</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
