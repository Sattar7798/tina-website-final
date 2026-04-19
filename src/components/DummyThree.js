import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, OrbitControls } from '@react-three/drei';

const DummyThree = () => {
  return (
    <div style={{ width: '100%', height: '300px' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Box>
          <meshStandardMaterial color="orange" />
        </Box>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default DummyThree; 