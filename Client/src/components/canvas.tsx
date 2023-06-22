import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { useEffect, useState } from 'react';
import {
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  CircleGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { View, Text } from 'react-native';
import { socket, socketEndpoint } from '../socket';

export default function Canvas() {
  const [error, setError] = useState('unset');
  const [side, setSide] = useState('unset');

  useEffect(() => {
    socket.on('connect', () => {
      setError('');
    });

    socket.on('connect_error', (err: any) => {
      setError(err.message);
    });

    socket.on('side', (s) => {
      setSide(s);
    });
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x334466);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 2000);
    camera.position.set(0, 0, -1200);
    camera.rotation.z = Math.PI;
    camera.rotation.y = Math.PI;

    const scene = new Scene();

    const ground = new Mesh(
      new PlaneGeometry(1200, 60),
      new MeshBasicMaterial({ color: 0x5588ff })
    );
    ground.position.y = 200;
    const playerLeft = new Mesh(
      new PlaneGeometry(40, 80),
      new MeshBasicMaterial({ color: 0x5588ff })
    );
    const playerRight = new Mesh(
      new PlaneGeometry(40, 80),
      new MeshBasicMaterial({ color: 0x5588ff })
    );
    const ball = new Mesh(
      new CircleGeometry(40, 16),
      new MeshBasicMaterial({ color: 0xff8800 })
    );

    [ground, playerLeft, playerRight, ball].forEach(
      (body) => (body.rotation.y = Math.PI)
    );

    scene.add(playerLeft, playerRight, ball, ground);

    socket.on('move', (poses) => {
      playerLeft.position.x = poses[0];
      playerLeft.position.y = poses[1];
      playerLeft.rotation.z = poses[2];
      playerRight.position.x = poses[3];
      playerRight.position.y = poses[4];
      playerRight.rotation.z = poses[5];
      ball.position.x = poses[6];
      ball.position.y = poses[7];
      ball.rotation.z = poses[8];
      renderer.render(scene, camera);
      gl.endFrameEXP();
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />
      <Text>socketEndpoint: {socketEndpoint}</Text>
      {error && <Text>error: {error}</Text>}
      <Text>side: {side}</Text>
    </View>
  );
}
