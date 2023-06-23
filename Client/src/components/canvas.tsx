import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  PlaneGeometry,
  CircleGeometry,
  MeshBasicMaterial,
  Mesh,
  ShapeGeometry,
  Shape,
  Vector2,
} from 'three';
import { socket } from '../socket';

export default function Canvas() {
  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Create a WebGLRenderer without a DOM element
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x3a4260);

    const camera = new PerspectiveCamera(30, width / height, 2150, 2250);
    camera.position.set(0, 0, -2200);
    camera.rotation.z = Math.PI;
    camera.rotation.y = Math.PI;

    const scene = new Scene();

    const vertexString =
      '1740 997 1595 1142 442 1142 297 997 297 841 118 841 118 605 297 605 297 165 1008 165 1008 1 1 1 1 1377 2008 1377 2008 1 1028 1 1028 165 1740 165 1740 605 1918 605 1918 841 1740 841';
    const coordinates = vertexString.split(' ').map((str) => parseInt(str));
    const points = [];
    for (let i = 0; i < coordinates.length; i += 2) {
      let x = coordinates[i];
      let y = coordinates[i + 1];
      x -= 2008 / 2; // 2008 = max(x-values)
      y -= 1377 / 2; // 1377 = max(y-values)
      points.push(new Vector2(x, y));
    }

    const arena = new Mesh(
      new ShapeGeometry(new Shape(points)),
      new MeshBasicMaterial({ color: 0x5a6984 })
    );
    const ground = new Mesh(
      new PlaneGeometry(1200, 60),
      new MeshBasicMaterial({ color: 0x5a6984 })
    );
    ground.position.y = 200;
    const playerLeft = new Mesh(
      new PlaneGeometry(40, 80),
      new MeshBasicMaterial({ color: 0x49a581 })
    );
    const playerRight = new Mesh(
      new PlaneGeometry(40, 80),
      new MeshBasicMaterial({ color: 0x6f8ae4 })
    );
    const ball = new Mesh(
      new CircleGeometry(40, 32),
      new MeshBasicMaterial({ color: 0xc4b3d9 })
    );

    [ground, arena, playerLeft, playerRight, ball].forEach(
      (body) => (body.rotation.y = Math.PI)
    );

    scene.add(arena, ground, playerLeft, playerRight, ball);

    let side: string;
    socket.on('side', (s) => (side = s));

    socket.on('move', (poses) => {
      playerLeft.position.x = poses[0];
      playerLeft.position.y = poses[1];
      playerLeft.rotation.z = -poses[2];
      playerRight.position.x = poses[3];
      playerRight.position.y = poses[4];
      playerRight.rotation.z = -poses[5];
      ball.position.x = poses[6];
      ball.position.y = poses[7];
      ball.rotation.z = -poses[8];
      camera.position.x =
        side === 'left' ? playerLeft.position.x : playerRight.position.x;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    });
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}
