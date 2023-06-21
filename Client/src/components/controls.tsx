import { Text, SafeAreaView } from 'react-native';

export default function Controls() {
  return (
    <SafeAreaView style={{ backgroundColor: '#423' }}>
      <Text
        style={{
          padding: 30,
          fontWeight: '700',
          fontSize: 24,
          color: '#fff',
        }}>
        Hello, Controls!
      </Text>
    </SafeAreaView>
  );
}
