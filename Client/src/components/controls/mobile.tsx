import { SafeAreaView, View } from 'react-native';

import Dial from './touch/dial';
import BoostButton from './touch/boost';

export default function MobileControls() {
  return (
    <SafeAreaView style={{ backgroundColor: '#45406b' }}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          gap: 20,
          height: 280,
        }}>
        <Dial />
        <BoostButton />
      </View>
    </SafeAreaView>
  );
}
