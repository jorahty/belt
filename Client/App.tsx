import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Canvas from './src/components/canvas';
import Debug from './src/components/debug';
import Controls from './src/components/controls';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas />
      <Debug />
      <Controls />
      <StatusBar hidden />
    </View>
  );
}
