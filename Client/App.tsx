import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Canvas from './src/components/canvas';
import Controls from './src/components/controls';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas />
      <Controls />
      <StatusBar hidden />
    </View>
  );
}
