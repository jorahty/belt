import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  CircleGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'three';
import { socket } from '../socket';

export default function Canvas() {
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x656366);

    const camera = new PerspectiveCamera(70, width / height, 0.01, 2000);
    camera.position.set(0, -300, -900);
    camera.rotation.z = Math.PI;
    camera.rotation.y = Math.PI;

    const scene = new Scene();

    const ground = new Mesh(
      new PlaneGeometry(1200, 60),
      new MeshBasicMaterial({ color: 0x8e8c8e })
    );
    ground.position.y = 200;
    const playerLeft = new Mesh(
      new PlaneGeometry(40, 80),
      new MeshBasicMaterial({ color: 0xbf7779 })
    );
    const playerRight = new Mesh(
      new PlaneGeometry(40, 80),
      new MeshBasicMaterial({ color: 0x7b89f5 })
    );
    const ball = new Mesh(
      new CircleGeometry(40, 16),
      new MeshBasicMaterial({ color: 0xd1cfd2 })
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

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}
