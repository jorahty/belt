import MobileControls from './mobile';
import { Dimensions, Platform } from 'react-native';
import WebControls from './web';

export default function Controls() {
  const isLandscape =
    Dimensions.get('window').width > Dimensions.get('window').height;

  return Platform.OS === 'web' && isLandscape ? (
    <WebControls />
  ) : (
    <MobileControls />
  );
}
