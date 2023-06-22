import { useEffect } from 'react';
import { socket } from '../../socket';

export default function WebControls() {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'w') socket.volatile.emit('b');
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key == 'w') socket.volatile.emit('B');
  };

  const handleWheel = (e: WheelEvent) => {
    socket.volatile.emit('d', e.deltaY * 0.006);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return <></>;
}
