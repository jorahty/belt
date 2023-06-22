import { useState } from 'react';
import { SafeAreaView, View, Pressable, Text } from 'react-native';

import { socket } from '../socket';

export default function Controls() {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
    socket.emit('b');
  };

  const handlePressOut = () => {
    setIsPressed(false);
    socket.emit('B');
  };

  return (
    <SafeAreaView style={{ backgroundColor: '#423' }}>
      <View style={{ padding: 20 }}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={{
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
