import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { useEffect } from 'react';
import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  PerspectiveCamera,
  Scene,
} from 'three';

export default function Canvas() {
  let timeout: number;

  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
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

    function update() {
      square.rotation.z += 0.025;
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };

  return <GLView style={{ flex: 1 }} onContextCreate={onContextCreate} />;
}
