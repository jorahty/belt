import { Platform, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import applyCSS from './src/applyCSS';
import Canvas from './src/components/canvas';
import Controls from './src/components/controls/controls';

export default function App() {
  if (Platform.OS === 'web') applyCSS();

  return (
    <View style={{ flex: 1 }}>
      <Canvas />
      <Controls />
      <StatusBar hidden />
    </View>
  );
}
