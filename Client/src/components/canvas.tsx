import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { useEffect, useState } from 'react';
import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PerspectiveCamera,
  Scene,
} from 'three';
import { View, Text } from 'react-native';
import { socket, socketEndpoint } from '../socket';

export default function Canvas() {
  const [error, setError] = useState('default');

  useEffect(() => {
    socket.on('connect', () => {
      setError('');
    });

    socket.on('connect_error', (err: any) => {
      setError(err.message);
    });
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x334466);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
    camera.position.set(0, 0, 20);

    const scene = new Scene();

    const square = new Mesh(
      new PlaneGeometry(1, 1),
      new MeshBasicMaterial({ color: 0x5588ff })
    );
    scene.add(square);

    socket.on('move', (position) => {
      square.position.y = position;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
      <Text>socketEndpoint: {socketEndpoint}</Text>
      {error && <Text>error: {error}</Text>}
    </View>
  );
}
