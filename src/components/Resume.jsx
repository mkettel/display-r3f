import React, { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export const Resume = () => {

  const resumePlane = useRef()

  // File paths
  const [ darkResume ] = useLoader(TextureLoader, [
    './environmentMaps/dark-resume.png'
   ])

  const [texture, setTexture] = useState(darkResume);

  return <>
    {/* Resume Plane */}
    <mesh
      scale={1.3}
      ref={resumePlane}
      castShadow >
          <planeGeometry args={[2.5, 3.5, 2]}/>
          <boxGeometry args={[2.3, 3, .05]}/>
          <meshStandardMaterial map={ texture } side={THREE.DoubleSide} metalness={1} roughness={3} color={'white'} />
      </mesh>

  </>

}
